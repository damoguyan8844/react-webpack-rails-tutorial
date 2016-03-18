
require('../../styles/views/Login.scss');
import React from 'react';
var ReactDOM = require('react-dom');
import queryString from 'query-string';

import RBService from '../../services/RBService';
import { History } from 'react-router';
/*import {ClientOAuth2} from 'client-oauth2';

var githubAuth = new ClientOAuth2({
    clientId: '1610656247',
    clientSecret: 'c6f18f64245f2884305fee8ec510384e',
    accessTokenUri: "",
    authorizationUri: "",
    authorizationGrants: ['login'],
    redirectUri: 'http://dev.2redbeans.com:3086/en/auth/weibo_access_token/callback',
    scopes: ['notifications']
})*/

var Login = React.createClass({
    mixins: [History],
    getInitialState:function(){
        return {
            isLogout:false,
            hasError:false,
            errorMessage:''
        }
    },
    onLogin:function(){
        console.log('onLogin')
        this.setState({hasError:false, errorMessage:''});
        var me = this;
        RBService.logOut().then(function(response){
            me.login();
        }).catch(function(response){
            me.login();
        })
    },
    login:function(){
        console.log('login')
        var me = this;
        var email = this.refs.email.value;
        var pass = this.refs.pass.value;

        RBService.login(email, pass)
        .then(function(response){
                me.redirect();
        })
        .catch(function(response){
            console.log(response);
            var msg = response.data.errors?response.data.errors[0].message :response.data.message;
            me.setState({errorMessage:msg, hasError:true});
        })
    },
    autoLogin:function(){
        console.log('autologin')
        var me = this;
        var email = 'mengchun@2redbeans.com';
        var pass = 'houlai';
        RBService.login(email, pass)
        .then(function(response){
            me.redirect();
        }).catch(function(response){
            console.log(response)
        })
    },
    redirect:function(){
        var parsed = queryString.parse(location.search);
        if(parsed.backUrl && parsed.backUrl.length>0){
            location.href=parsed.backUrl;
        }else{
            location.href='myprofile';
        }
    },
    componentWillMount:function(){

    },
    componentDidMount:function(){

       if(RB.auth){
           this.history.pushState(null,'/myprofile');
       }
        /*
        if(WB2){
            WB2.anyWhere(function(W){
                W.widget.connectButton({
                    id: "wb_connect_btn",
                    type:"3,2",
                    callback : {
                        login:function(o){	//登录后的回调函数
                            alert("login: "+o.screen_name);
                        },
                        logout:function(){	//退出后的回调函数
                            alert("logout");
                        }
                    }
                });
            });
        }*/

    },
    useWeiboLogin:function(){
        githubAuth.request = function (req) {
            if (req.method === 'POST' && req.url === accessTokenUri) {
                expect(req.headers.Authorization).to.equal('Basic ' + btoa('abc:123'))
                expect(req.body.grant_type).to.equal('refresh_token')
                expect(req.body.refresh_token).to.equal(refreshToken)

                return Promise.resolve({
                    status: 200,
                    body: {
                        access_token: refreshAccessToken,
                        refresh_token: refreshRefreshToken,
                        expires_in: 3000
                    },
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }

            if (req.method === 'GET' && req.url === 'http://api.github.com/user') {
                expect(req.headers.Authorization).to.equal('Bearer ' + accessToken)

                return Promise.resolve({
                    status: 200,
                    body: {
                        username: 'blakeembrey'
                    },
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }
        }

        var params = ("weibo_access_token/callback");
        //params.push("callback=/en/app");
        RBService.callWeibo(params)
            .then(function(response){
                var r = response;
            })
    },
    onFacebook:function(){
        //checkLoginState();
    },
    render: function() {
        return(
            <div className="rb-login">
                    <div>
                        <span >Email:</span><input className="email" ref="email" />
                    </div>
                    <div>
                        <span >Password:</span><input className="pass" ref="pass" />
                    </div>
                <div style={{color:'red'}}>{this.state.errorMessage}</div>
                <span className="login-btn" onClick={this.onLogin}>Login</span>
                <span className="login-btn" onClick={this.autoLogin}>AutoLogin</span>

                <span className="login-btn" id="wb_connect_btn" >Weibo login</span>
                <span className="login-btn"  onclick={this.onFacebook} scope="public_profile,email">fackbook login</span>
            </div>
        )
    }
});

export default Login;
