
require('./scripts/styles/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactIntl from 'react-intl';
import { Router, Route,IndexRoute } from 'react-router';
import {createHistory,useBasename} from 'history';
import useStandardScroll from 'scroll-behavior/lib/useStandardScroll';
import {Provider} from 'react-redux';
import {addLocaleData, IntlProvider} from 'react-intl';

import Header from './scripts/views/header/Header';
import Footer from './scripts/views/footer/Footer';
import LightBox from './scripts/views/lightbox/LightBox';
import configureStore from './scripts/store/configureStore';

import RBService from './scripts/services/RBService';
import RBSocketService from './scripts/services/RBSocketService';
import User from './scripts/models/User';
import RBBaseData from './scripts/models/RBBaseData';
import {BaseData} from './scripts/common/ConstData';
import {cons_opts,cons_opt_vals,timeZone_opts} from "./scripts/common/CommonItems.js";

import { Scrollbars } from 'react-custom-scrollbars';
import ChatLiteView from './scripts/views/chat/ChatLiteView'

function getBaseData(metaData){
    var items = metaData;
    for(var item in items)
    {
        if(cons_opts[item] != undefined)
        {
            var opt_vals = [];
            for(var i in items[item])
            {
                cons_opts[item].push({value: items[item][i].value, label: items[item][i].label});
                opt_vals.push(items[item][i].value);
            }
            cons_opt_vals[item].push(opt_vals);
        }
    };
}

export default props => ({
    componentWillMount:function(){

    },
    componentDidMount:function(){
        RBService.getMe()
            .then(function(response){
                RB.auth = true;
                var user = new User(response.data.user,response.data.current_user).data;
                var re = /(en|zh-CN|zh-TW)\/app/;

            })
            .catch(function(info){
            })
        var doc = document.documentElement;
        doc.setAttribute('data-useragent', navigator.userAgent);
    },
    render: function() {
        return(

            <div>
                <Header {...this.props} />
                <div id="rb-notifications"></div>
                <LightBox/>

                <div className="rb-body-wrap">
                    <ChatLiteView {...this.props} />
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
});

function renderApp(locale,messages,store){
    RB.getMe = function(){
        return store.getState().me;
    }
    RB.getStore = function(){
        return store.getState();
    }
    RB.lang = messages;
    var prefix = '/' + locale + '/app';
    //prefix ='';
    let history = useBasename(useStandardScroll(createHistory))({
        basename: prefix
    })

    var rootRoute = {
        component: 'div',
        childRoutes: [
            {
                path: '/',
                component:App,
                /*
                 getComponent(location, cb) {
                 require.ensure([], (require) => {
                 cb(null, require('scripts/views/app/App'))
                 })
                 },*/
                indexRoute:{
                    getComponent(location, cb) {
                        require.ensure([], (require) => {
                            cb(null, require('./scripts/views/search/Search'))
                        },'search')
                    }
                },
                childRoutes: [
                    {
                        path: '/profile(/:id)',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/profile/Profile'))
                            },'profile')
                        }
                    },
                    {
                        path: '/myprofile(/:tab)',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/myprofile/MyProfile'))
                            },'myprofile')
                        }
                    },
                    {
                        path: '/search',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/search/Search'))
                            },'search')
                        }
                    },
                    {
                        path: '/connections(/:tab)',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/connections/Connections'))
                            },'connections')
                        }
                    },
                    {
                        path: '/settings(/:id)',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/settings/Settings'))
                            },'settings')
                        }
                    },
                    {
                        path: '/chat(/:token)',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/chat/ChatView'))
                            },'chat')
                        }
                    },
                    {
                        path: '/home',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/home/Home'))
                            },'home')
                        }
                    },
                    {
                        path: '/events(/:eventId)',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/events/Events'))
                            },'events')
                        }
                    },
                    {
                        path: '/dating_safely',
                        getComponent(location, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('./scripts/views/home/DatingSafely'))
                            },'dating_safely')
                        }
                    }
                ]
            },
            {
                path: '/login',
                component: require('./scripts/views/login/Login'),
                childRoutes:[]

            },
            {
                path: '*',
                component: require('./scripts/views/notfound/NotFound'),
                childRoutes:[]

            }
        ]
    };
    var intlLocales = {'en':'en','zh-CN':'zh','zh-TW':'zh-Hant-TW'};
    return (
            <Provider store = {store}>
                <Router history={history} routes={rootRoute} >
                </Router>
            </Provider>

    )
}
