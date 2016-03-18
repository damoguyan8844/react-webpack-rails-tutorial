import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import {showEventList} from '../../actions/HeaderActionsCreator';
import RBService from '../../services/RBService';
import ImageResources from '../../utils/ImageResources';
import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var MBMenu = React.createClass({
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
    componentDidMount: function() {
    },
    closeMenu:function(){
        this.props.closeMenu();
    },
    onLogout:function(){
      this.props.onLogout();
    },
    render: function(){
        const {formatMessage} = this.props.intl;
        var charmProgress = this.props.userStatus.charmProgress;
        var url =`http://${window.location.host}/${this.props.overview.locale}/app`;
        return (
            <div>
            {
                this.props.source === "app" &&
                <div className="mw_dropdown_container" style={{display: "none"}}>
                    <Link to="/search" className="mw_dropdown_item mw_dropdown_item--first" onClick={this.closeMenu} >
                        <div className="mw_dropdown_title pull-left">{formatMessage({id:"search" })}</div>
                    </Link>
                    <Link to="/chat" className="mw_dropdown_item" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id:"messages" })}</div>
                        <div className="nav_badge pull-right" id="unread_count" style={{display: "none"}}></div>
                    </Link>
                    <Link to="/connections" className="mw_dropdown_item" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id:"connections" })}</div>
                    </Link>
                    <Link to="/events" className="mw_dropdown_item" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id:"events" })}</div>
                        { (this.props.header.eventList && this.props.header.eventList.length>0) &&
                            <div className="nav_badge pull-right">
                                {this.props.header.eventList.length}
                            </div>
                        }
                    </Link>
                    <div>
                        <a href={"/"+ this.props.overview.locale + "/app" +"/settings"} className="mw_dropdown_item mw_dropdown_item--last" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id:"manage_account" })}</div>
                        </a>
                    </div>
                    <div className="mw_dropdown_sub_container">
                        <a href={"/"+ this.props.overview.locale + "/app" +"/settings/my_diamonds"} className="mw_dropdown_item mw_dropdown_item--first" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id:"my_diamonds" })}</div>
                            <div className="number pull-right">{this.props.userStatus.rewardPointsCount}</div>
                        </a>
                        <Link to="/myprofile" className="mw_dropdown_item" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id:"charm" })} </div>
                            <div className="number pull-right">
                                Level {this.props.userStatus.charmLevel}
                            </div>
                        </Link>
                        <a href="#" className="mw_dropdown_item progress_bar_link charm mw_dropdown_item--last" onClick={this.closeMenu}>
                            <div className="nav_progress_bar_container">
                                <div className="nav_progress_content" style={{width: charmProgress + "%"}}></div>
                            </div>
                        </a>
                    </div>
                    <div className="mb-language">
                        <div id="locale_switch" className={this.props.overview.locale}>
                            <div className="language_item">
                                <a id="zh_cn" onClick={this.onChangeLang.bind(null,'zh-CN')}>简体</a>
                            </div>
                            <div className="language_item align-center">
                                <a id="zh_tw" onClick={this.onChangeLang.bind(null,'zh-TW')}>繁體</a>
                            </div>
                            <div className="language_item align-right">
                                <a id="en_us" onClick={this.onChangeLang.bind(null,'en')}>English</a>
                            </div>
                        </div>
                    </div>
                    <div className="mw_dropdown_sub_container">
                        <a href="javascript:void(0)" className="mw_dropdown_item mw_dropdown_item--last mw_dropdown_item--first" onClick={this.onLogout}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id:"logout"}) }</div>
                        </a>
                    </div>
                    <div>
                        <a href={"/"+ this.props.overview.locale + "/app" + "/settings"} className="mw_dropdown_item mw_dropdown_item--first" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id:"need_help"}) }</div>
                        </a>
                    </div>
                </div>
            }
            {
                this.props.source == "settings" &&
                <div className="mw_dropdown_container" style={{display: "none"}}>
                    <a href={url + "/search"} className="mw_dropdown_item mw_dropdown_item--first" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id: "search"})}</div>
                    </a>
                    <a href={url +"/chat"} className="mw_dropdown_item" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id: "messages"})}</div>
                        <div className="nav_badge pull-right" id="unread_count" style={{display: "none"}}></div>
                    </a>
                    <a href={url +"/connections"} className="mw_dropdown_item" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id: "connections"})}</div>
                    </a>
                    <a href="#" className="mw_dropdown_item" onClick={this.closeMenu}>
                        <div className="mw_dropdown_title pull-left">{formatMessage({id: "events"})}</div>
                        { (this.props.header.eventList && this.props.header.eventList.length > 0) &&
                        <div className="nav_badge pull-right">
                            {this.props.header.eventList.length}
                        </div>
                        }
                    </a>
                    <div>
                        <Link to="/settings" className="mw_dropdown_item mw_dropdown_item--last" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id: "manage_account"})}</div>
                        </Link>
                    </div>
                    <div className="mw_dropdown_sub_container">
                        <Link to="/settings/my_diamonds" className="mw_dropdown_item mw_dropdown_item--first" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id: "my_diamonds"})}</div>
                            <div className="number pull-right">{this.props.userStatus.rewardPointsCount}</div>
                        </Link>
                        <a href={url +"/myprofile"} className="mw_dropdown_item" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id: "charm"})} </div>
                            <div className="number pull-right">
                                Level {this.props.userStatus.charmLevel}
                            </div>
                        </a>
                        <a href="#" className="mw_dropdown_item progress_bar_link charm mw_dropdown_item--last" onClick={this.closeMenu}>
                            <div className="nav_progress_bar_container">
                                <div className="nav_progress_content" style={{width: charmProgress + "%"}}></div>
                            </div>
                        </a>
                    </div>
                    <div className="mb-language">
                        <div id="locale_switch" className={this.props.overview.locale}>
                            <div className="language_item">
                                <a id="zh_cn" onClick={this.onChangeLang.bind(null,'zh-CN')}>简体</a>
                            </div>
                            <div className="language_item align-center">
                                <a id="zh_tw" onClick={this.onChangeLang.bind(null,'zh-TW')}>繁體</a>
                            </div>
                            <div className="language_item align-right">
                                <a id="en_us" onClick={this.onChangeLang.bind(null,'en')}>English</a>
                            </div>
                        </div>
                    </div>
                    <div className="mw_dropdown_sub_container">
                        <a href="javascript:void(0)" className="mw_dropdown_item mw_dropdown_item--first" onClick={this.onLogout}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id: "logout"}) }</div>
                        </a>
                    </div>
                    <div>
                        <Link to="/settings/contact" className="mw_dropdown_item mw_dropdown_item--first" onClick={this.closeMenu}>
                            <div className="mw_dropdown_title pull-left">{formatMessage({id: "need_help"}) }</div>
                        </Link>
                    </div>
                </div>
            }
          </div>
        )

    }
});

function mapStateToProps(state){
    return {
        userStatus:state.me.userStatus,
        overview:state.me.overview,
        header:state.header
    }
}

MBMenu = connect(mapStateToProps)(MBMenu);

export default injectIntl(MBMenu);
