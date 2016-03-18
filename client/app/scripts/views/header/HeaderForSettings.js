
require('scripts/styles/views/Header.scss');

import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'
var ReactIntl = require('react-intl');
import {connect} from 'react-redux';
import RBService from 'scripts/services/RBService';
import RBNotify from 'scripts/common/notification/RBNotify.js';
var UnreadMsgCountMixin = require('./UnreadMsgCountMixin.js').UnreadMsgCountMixin;
import { History } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import ImageResources from 'scripts/utils/ImageResources';
import ChatNotificationList from 'scripts/components/header/ChatNotificationList';
import {highlightTab} from 'scripts/actions/HeaderActionsCreator';
import { closeChatPanel } from 'scripts/actions/ChatActionCreators';
import { NOTIFICATION } from 'scripts/utils/ConstantValues'
import EventList from './EventList.js';
import UserMenu from './UserMenu.js';
import MBMenu from './MBMenu.js';
import MBUserMenu from './MBUserMenu.js';

var HeaderForSettings = React.createClass({
    mixins: [UnreadMsgCountMixin,History],
    closeMenu:function(){
        $('#expand-mv').toggleClass('display-none');
        $('#no-expand-mv').toggleClass('display-none');
        $('.mw_dropdown_container').toggle();
        $('body').toggleClass('no_scroll');
    },
    componentDidMount: function() {
        $('body').on('click', function(e){
            var $e_target = $(e.target);
            if ($e_target.hasClass('closebox')) return;
            if(!$e_target.hasClass('dropdown_menu') && $e_target.parents('.dropdown_menu').length <= 0){
                $('.clicked').removeClass('clicked');
                $('.dropdown_list').hide();
            }
        });
        $('#mw_menu').on('click', function(){
            $('#expand-mv').toggleClass('display-none');
            $('#no-expand-mv').toggleClass('display-none');
            $('.mw_dropdown_container').toggle();

            // click menu icon => change the height of navbar, resize user-info and align back
            $('body').toggleClass('no_scroll');
        });

        $( window).resize(function() {

        });
        $('.dropdown_menu').on('click', function(){
            var sub_menu = $(this).next('ul');
            var event_sub_menu = $(this).next('div').find('ul');
            if (sub_menu.css('display') == 'none'){
                $(".navi_bar ul li").find('ul').hide();
                $('.dropdown_menu').removeClass('clicked');
                event_sub_menu.hide();
            }else{
                if (event_sub_menu.css('display') == 'none'){
                    $(".navi_bar ul li").find('ul').hide();
                    $('.dropdown_menu').removeClass('clicked');
                }
                event_sub_menu.toggle();
            }
            sub_menu.toggle();
            $(this).toggleClass('clicked');
        });

        $('.nav_left').on('click','li',function (){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

        $('.nav_submenu_user li a').on('click', function(){
            $('.nav_submenu_user').hide();
            $('.dropdown_menu').removeClass('clicked');
        });
    },
    onLogout:function(){
        var me = this;
        RBService.logOut()
            .then(function(response){
                console.log('onlogout success')
                RBNotify.notify('simple',{title:"Logout Succeed!",description:"logout"});
                var url = `/${this.props.overview.locale}/app/signup`;
                window.location.href = url;
                console.log(url);
            }.bind(this)).catch(function(response){
                RBNotify.notify('simple',{title:"Logout Failed!",description:"logout"});
                console.log('onlogout failed')
            })
    },
    onChangeLang(code){
        RBService.setClientLocale(code)
            .then(function(response){
                var prefix = `/${code}/app/`;
                var match = `/${this.props.overview.locale}/app/`;
                var url = window.location.href.replace(match,prefix);
                window.location.href = url;
            }.bind(this))
            .catch(function(response){
                RBNotify.notify('simple',{title:"Languages",description:"Change Language Failed!"});
            })

    },
    handleChatIconClick: function() {
        if(this.props.inboxCount == 0){
            location.href = '/chat';
            return;
        };
        if (this.props.isChatLiteDisplayed) {
            this.props.closeChatPanel();
        }
    },
    componentWillUnmount:function(){
        this.props.highlightTab(null);
    },
    render: function() {
        const messages = defineMessages({
            search: {
                id: 'search',
                defaultMessage: '搜索'
            },
            connections:{
                id:"connections",
                defaultMessage: 'Connections'
            }

        });
        var name =  this.props.overview.name;
        var mainPhoto = this.props.overview && this.props.overview.mainPhoto.small_image_url;
        //var url = http://" + window.location.host + "/" +  ;//+ ":" + window.location.port;
        var url =`http://${window.location.host}/${this.props.overview.locale}/app`;
        console.log(window.location.host);
        console.log(url);

        const {formatMessage} = this.props.intl;
        return(
            <div className="rb-nav-header-wrap header">
                <div className="rb-nav-header d-header clearfix navi_bar">
                    <li>
                        <a href={url + "/search"} className="pull-left logo">
                            <svg width="80px" height="60px" viewBox="0 0 80 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <rect id="Rectangle-362" fill="#EE3888" x="1" y="0" width="79" height="60"></rect>
                                <path d="M17.078125,26.5195313 C26.8990306,22.7900734 44.3624012,41.2108034 57.5781241,42.9981939 C70.9394335,44.8052746 80,30 80,30 L80,60 L1,60 C1,60 -2.671875,34.0195313 17.078125,26.5195313 Z" id="Rectangle-401" fill="#D9327B"></path>
                                <path d="M60.3820772,35.0946985 C56.8863818,43.6428656 50.0407773,49.168845 44.1493388,48.6746808 C49.1791678,48.1396011 54.6487395,43.2233821 57.599027,36.0083462 C61.3139978,26.9223188 59.6269275,17.6420419 53.8308262,15.2784751 C48.7815325,13.2195899 42.2807307,17.0902781 38.2332715,24.1293376 C42.4459817,15.3686481 50.2115897,10.3324633 56.1669835,12.7611771 C62.4850558,15.3376636 64.3719369,25.336147 60.3820772,35.0946985 L60.3820772,35.0946985 Z M26.7797049,11.1658688 C20.4683857,13.8845665 18.5123852,23.404378 22.4112773,32.429628 C26.3093749,41.454878 34.5862284,46.5669354 40.8975476,43.8478405 C47.209264,41.1283483 49.1648673,31.6081396 45.2663724,22.5828896 C45.052261,22.0875336 44.8230546,21.606081 44.5839173,21.1349566 C45.0602058,22.009675 45.5074959,22.9177613 45.9154595,23.8619963 C50.7863932,35.138792 48.620651,46.9141215 41.0782909,50.1635293 C33.5359308,53.4133343 23.473492,46.9061767 18.6025582,35.6297783 C13.7312272,24.3529826 15.8969694,12.5776531 23.4389323,9.32864256 C28.9716648,6.94441938 35.8577876,9.81486201 41.0588262,15.9617246 C36.8496911,11.2957657 31.3090139,9.21423798 26.7797049,11.1658688 L26.7797049,11.1658688 Z" id="logo" fill="#FFFFFF"></path>
                            </svg>
                        </a>
                    </li>
                    <ul className="nav_left">
                        <li className={this.props.header.highlightTab=='search'?'nav_left_link active':'nav_left_link'}> <a href={url + "/search"} className="nav_link"><FormattedMessage {...messages.search} /></a></li>
                        <li className={this.props.header.highlightTab=='connections'?'nav_left_link active':'nav_left_link'}> <a href={url + "/connections"} className="nav_link"><FormattedMessage {...messages.connections} /></a></li>
                    </ul>
                    <ul className="nav_right">
                        <li className="nav_item_icon">
                            <a  className="dropdown_menu">
                                <div className="valign">
                                    <svg enable-background="new 0 0 512 512" height="24px" version="1.1" viewBox="0 0 512 512" width="24px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                                        <g><path className="icon_more_svg" d="M462,283.742v-55.485l-29.981-10.662c-11.431-4.065-20.628-12.794-25.274-24.001 c-0.002-0.004-0.004-0.009-0.006-0.013c-4.659-11.235-4.333-23.918,0.889-34.903l13.653-28.724l-39.234-39.234l-28.72,13.652 c-10.979,5.219-23.68,5.546-34.908,0.889c-0.005-0.002-0.01-0.003-0.014-0.005c-11.215-4.65-19.933-13.834-24-25.273L283.741,50 h-55.484l-10.662,29.981c-4.065,11.431-12.794,20.627-24.001,25.274c-0.005,0.002-0.009,0.004-0.014,0.005 c-11.235,4.66-23.919,4.333-34.905-0.889l-28.723-13.653l-39.234,39.234l13.653,28.721c5.219,10.979,5.545,23.681,0.889,34.91 c-0.002,0.004-0.004,0.009-0.006,0.013c-4.649,11.214-13.834,19.931-25.271,23.998L50,228.257v55.485l29.98,10.661 c11.431,4.065,20.627,12.794,25.274,24c0.002,0.005,0.003,0.01,0.005,0.014c4.66,11.236,4.334,23.921-0.888,34.906l-13.654,28.723 l39.234,39.234l28.721-13.652c10.979-5.219,23.681-5.546,34.909-0.889c0.005,0.002,0.01,0.004,0.014,0.006 c11.214,4.649,19.93,13.833,23.998,25.271L228.257,462h55.484l10.595-29.79c4.103-11.538,12.908-20.824,24.216-25.525 c0.005-0.002,0.009-0.004,0.014-0.006c11.127-4.628,23.694-4.311,34.578,0.863l28.902,13.738l39.234-39.234l-13.66-28.737 c-5.214-10.969-5.539-23.659-0.886-34.877c0.002-0.005,0.004-0.009,0.006-0.014c4.654-11.225,13.848-19.949,25.297-24.021 L462,283.742z M256,331.546c-41.724,0-75.548-33.823-75.548-75.546s33.824-75.547,75.548-75.547 c41.723,0,75.546,33.824,75.546,75.547S297.723,331.546,256,331.546z"></path></g>
                                    </svg>
                                </div>
                            </a>
                            <ul className="nav_submenu_more dropdown_list display_none setting-dropdown">
                                <li className="setting-dropdown_first-item"><Link to="/en/app/settings/account" className="nav_padding">{formatMessage({id:"manage_account"})}</Link></li>
                                <li><Link to="#" className="nav_padding">{formatMessage({id:"increase_charm"})}</Link></li>
                                <li><Link to="/settings/vip_status" className="nav_padding">{formatMessage({id:"my_vip_plan"})}</Link></li>
                                <li><Link to="/settings/contact" className="nav_padding">{formatMessage({id:"contact_support"})}</Link></li>
                                <li className="nav_padding nav_submenu_divider"><a href={url + "/dating_safely"}>{formatMessage({id:"dating_safely"})}</a></li>
                                <li className="nav_padding nav_submenu_divider">
                                    <div id="locale_switch" className={this.props.overview.locale}>
                                        <div className="language_item">
                                            <a id="zh_cn" onClick={this.onChangeLang.bind(null,'zh-CN')}>简体</a>
                                        </div>
                                        <div className="language_item">
                                            <a id="zh_tw" onClick={this.onChangeLang.bind(null,'zh-TW')}>繁體</a>
                                        </div>
                                        <div className="language_item">
                                            <a id="en_us" onClick={this.onChangeLang.bind(null,'en')}>English</a>
                                        </div>
                                    </div>
                                </li>
                                <li><a onClick={this.onLogout} className="nav_padding">{formatMessage({id:"logout"})}</a></li>
                            </ul>
                        </li>
                        <li className="nav_item_icon">
                            <a href="javascript:void(0);" className="dropdown_menu"><div className="valign">
                                <svg enable-background="new 0 0 512 512" height="24px" version="1.1" viewBox="0 0 512 512" width="24px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                                    <g><path className="nav_icon_alert_svg" d="M310.489,117.73c-11.175-6.415-18.095-18.365-18.072-31.25c0-0.021,0-0.042,0-0.063 C292.417,66.304,276.111,50,256,50c-20.113,0-36.417,16.304-36.417,36.417c0,0.021,0,0.042,0,0.064 c0.022,12.901-6.883,24.828-18.072,31.25C120.429,164.271,167.02,318.832,82.3,346.149v36.101h347.4v-36.101 C344.979,318.831,391.571,164.27,310.489,117.73z M256,71.642c8.147,0,14.775,6.627,14.775,14.775 c0,8.147-6.628,14.775-14.775,14.775c-8.147,0-14.775-6.628-14.775-14.775C241.225,78.27,247.853,71.642,256,71.642z M306.167,412.333c0,27.431-22.236,49.667-49.667,49.667c-27.43,0-49.667-22.236-49.667-49.667H306.167z"></path></g>
                                </svg>
                            </div>
                                { (this.props.header.eventList && this.props.header.eventList.length>0) &&
                                <div className="nav_badge right_menu nav_unread_event pull-left" id="event-unread">
                                    {this.props.header.eventList.length}
                                </div>
                                }
                            </a>
                            <ul className="nav_submenu_events dropdown_list display_none">
                                <EventList source={"settings"} />
                            </ul>

                        </li>
                        <li className="nav_item_icon chat-notifications-icon">
                            <a href="javascript:void(0);" className="dropdown_menu" onClick={this.handleChatIconClick}>
                                <div className="valign">
                                    <svg width="27px" height="20px" viewBox="0 0 27 20" version="1.1" x="0px" xmlns="http://www.w3.org/2000/svg">
                                        <path className="nav_icon_alert_svg" d="M7.89970706,8.88933306 L0,2.82103373 L0,16.7890401 L7.89970706,8.88933306 L7.89970706,8.88933306 Z M26.9296757,-8.8817842e-16 L0.0927958687,-8.8817842e-16 L13.5005538,10.299424 L26.9296757,-8.8817842e-16 L26.9296757,-8.8817842e-16 Z M17.2586554,10.3077468 L13.4993742,13.190841 L9.73419488,10.2985065 L0.0327669028,20 L26.9508431,20 L17.2586554,10.3077468 L17.2586554,10.3077468 Z M19.0943883,8.89981847 L26.9999279,16.805358 L26.9999279,2.83669631 L19.0943883,8.89981847 L19.0943883,8.89981847 Z" id="email-icon"></path>
                                    </svg>
                                </div>
                                {
                                    this.props.totalUnreadCount > 0 &&
                                    <div className="nav_badge right_menu nav_unread_msgs pull-left" id="unread_count">{this.props.totalUnreadCount > 99 ? NOTIFICATION.INFINITY : this.props.totalUnreadCount}</div>
                                }
                            </a>
                            <ChatNotificationList />
                        </li>
                        <li className="nav_item_user">

                            <a href="javascript:void(0);" className="nav_item_user_permalink dropdown_menu">

                                <div className="valign nav_user_info">
                                    <div className="nav_user circle valign">
                                        <img className="nav_user_photo" src={mainPhoto} />
                                    </div>
                                    <div className="valign nav_username">{name}</div>
                                    <div className="valign nav_icon_dropdown">
                                        <svg width="11px" height="6px" viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg" >
                                            <g id="-Navigation" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                                                <g   transform="translate(-783.000000, -28.000000)" fill="#FFFFFF">
                                                    <g id="navigation" >
                                                        <g id="nav_user_menu" transform="translate(630.000000, 0.000000)" >
                                                            <path d="M155,25 L161.985281,25 L158.492641,28.4926407 L155,31.9852814 L155,25 Z" id="Rectangle-3" transform="translate(158.492641, 28.492641) rotate(-135.000000) translate(-158.492641, -28.492641) "></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <UserMenu source={"settings"} />
                        </li>
                    </ul>
                </div>
                <div className="navi_bar_mv">
                    <ul className="navi_bar_header pull-left">
                        <li className="nav_item_icon pull-left">
                            <a href="javascript:void(0);" id="mw_menu"><div className="valign">
                                <div id="no-expand-mv">
                                    <svg width="21px" height="12px" viewBox="0 0 17 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g id="-Navigation" stroke="none" fill="none" fill-rule="evenodd">
                                            <g id="m.navigation----closed" transform="translate(-10.000000, -15.000000)" stroke-linecap="square" stroke="#FFFFFF">
                                                <g id="navigation-mobile">
                                                    <g id="hamburger" transform="translate(11.000000, 15.500000)">
                                                        <path d="M0.216346154,0.5 L14.6394231,0.5" id="Line"></path>
                                                        <path d="M0.216346154,4.5 L14.6394231,4.5" id="Line-3"></path>
                                                        <path d="M0.216346154,8.5 L14.6394231,8.5" id="Line-4"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div id="expand-mv" className="display-none">
                                    <svg width="16px" height="16px" viewBox="0 0 14 13" version="1.1">
                                        <g id="-Navigation" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="m.navigation----expanded" transform="translate(-11.000000, -19.000000)" stroke-linecap="square" stroke="#FFFFFF">
                                                <g id="navigation-mobile" transform="translate(0.000000, -7.000000)">
                                                    <g id="close" transform="translate(12.000000, 26.590909)">
                                                        <path d="M0.359216359,0.631943632 L11.9300546,12.2027819" id="Line"></path>
                                                        <path d="M0.359216359,11.9135109 L11.9300546,0.342672676" id="Line-3"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>

                                    </svg>

                                </div>
                            </div>
                            </a>
                        </li>
                        <li className="nav_item_user pull-left">
                            <a href="javascript:void(0);" className="dropdown_menu"><div className="nav_user_info valign">
                                <div className="user circle pull-left valign">
                                    <img id="navbar-user-photo" className="nav_user_photo" src={mainPhoto} />
                                </div>
                                <div className="valign pull-left nav_username">
                                    {name}
                                </div>
                            </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <MBMenu closeMenu={this.closeMenu} source={"settings"} onLogout={this.onLogout}/>

            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        overview:state.me.overview,
        header:state.header,
        isChatLiteDisplayed: state.chatLite.isDisplayed,
        totalUnreadCount: state.chat.totalUnreadCount
    }
}

HeaderForSettings = connect(mapStateToProps, {highlightTab, closeChatPanel})(HeaderForSettings)
export default injectIntl(HeaderForSettings);
