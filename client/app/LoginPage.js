import React from 'react';
import axios from 'axios';
import {addLocaleData, IntlProvider} from 'react-intl';
import queryString from 'query-string';

import {createHistory,useQueries} from 'history';
import RBService from './scripts/services/RBService';
import User from './scripts/models/User';
import Login from './scripts/views/login/Login';

var LoginPage = React.createClass({

    componentWillMount:function(){

    },
    renderApp:function(locale,messages){
        return (
            <IntlProvider locale={locale} messages={messages}>
                <Login />
            </IntlProvider>
        )
    },
    _onClick(){

    },
    componentDidMount:function(){
        RBService.getMe()
            .then(function(response){
                //RB.auth = true;
                var parsed = queryString.parse(location.search);
                if(parsed.backUrl && parsed.backUrl.length>0){
                    location.href=parsed.backUrl;
                }else{
                    location.href='/myprofile';
                }
            })
            .catch(function(info){
                //RB.auth = false;
                this.renderApp('en',messages);
            }.bind(this))
        var doc = document.documentElement;
        doc.setAttribute('data-useragent', navigator.userAgent);
    },
    render: function() {
        return(
            <div onClick={this._onClick}>

            </div>
        )
    }
});

export default LoginPage;