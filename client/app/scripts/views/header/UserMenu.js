import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import {showEventList} from '../../actions/HeaderActionsCreator';
import RBService from '../../services/RBService';
import ImageResources from '../../utils/ImageResources';
import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var UserMenu = React.createClass({
    getInitialState :function(){
        return {
            menuItems :[]
        }
    },
    componentDidMount: function() {
        this.setState({

        })
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var charmProgress = this.props.userStatus.charmProgress;
        var menuItems = [];
        if(this.props.userStatus)
            menuItems = [
            {
                name:"profile",
                url:"/myprofile",
                class:"",
                value:0
            },
            {
                name:"visitors",
                url:"/connections/visitors",
                class:"",
                value:0
            },
            {
                name:"visited",
                url:"/connections/visited",
                class:"",
                value:this.props.userStatus.unreadVisitedCount
            },
            {
                name:"favorite",
                url:"/connections/favorited",
                class:"",
                value:0
            },
            {
                name:"favorited",
                url:"/connections/favoritedMe",
                class:"nav_submenu_divider",
                value:this.props.userStatus.unreadFavoredCount
            },
            {
                name:"my_diamonds",
                url:"/settings/my_diamonds",
                class:"",
                value:this.props.userStatus.rewardPointsCount
            },
            {
                name:"charm",
                url:"/myprofile",
                class:"",
                value:this.props.userStatus.charmLevel
            }
        ];
        var menus = menuItems.map(function(p,index){
            console.log(p.name + p.value);
            console.log(this.props.source);
            console.log(url);
            console.log(url);
            var url =`http://${window.location.host}/${this.props.overview.locale}/app`;
            if(this.props.source == "app" && p.url.indexOf('/settings') > -1){
                url =`https://${window.location.host}/${this.props.overview.locale}/app`;
            }
            if(p.value>0)
            {
                console.log(p.url);
                return (
                    <li className={"nav_submenu_user_item " + p.class } key={p.name}>
                        {
                            ((this.props.source == "app" && p.url.indexOf('/settings') == -1) || (this.props.source == "settings" && p.url.indexOf('/settings') > -1)) ?
                                <Link to={p.url}> {formatMessage({id:p.name}) }
                                    <span className={ (index>4 ? "" : "nav_badge") + " pull-right nav_submenu_bold"}>{p.value}</span>
                                </Link>
                                :
                                <a href={url + p.url}> {formatMessage({id:p.name}) }
                                    <span className={ (index>4 ? "" : "nav_badge") + " pull-right nav_submenu_bold"}>{p.value}</span>
                                </a>
                        }
                    </li>
                )
            }
            else
            {
                return (
                    <li className={"nav_submenu_user_item " + p.class} key={p.name}>
                        {
                            ((this.props.source == "app" && p.url.indexOf('/settings') == -1) || (this.props.source == "settings" && p.url.indexOf('/settings') > -1)) ?
                                <Link to={p.url}>{formatMessage({id:p.name}) }</Link> :
                                <a href={url + p.url}>{formatMessage({id:p.name}) }</a>
                        }
                    </li>
                )
            }
        }.bind(this));
        var url =`http://${window.location.host}/${this.props.overview.locale}/app`;
        return (
            <ul className="nav_submenu_user dropdown_list">
                {menus}
                <li className="nav_submenu_user_item">
                    { this.props.source == "app" ?
                        <Link to="/myprofile" className="progress_bar_link charm">
                            <div className="nav_progress_bar charm">
                                <div className="nav_progress_content" style={{width: charmProgress + "%"}}></div>
                            </div>
                        </Link>
                        :
                        <a href={url + "/myprofile"} className="progress_bar_link charm">
                            <div className="nav_progress_bar charm">
                                <div className="nav_progress_content" style={{width: charmProgress + "%"}}></div>
                            </div>
                        </a>
                    }
                </li>
            </ul>
        )
    }
});

function mapStateToProps(state){
    return {
        overview:state.me.overview,
        userStatus:state.me.userStatus
    }
}

UserMenu = connect(mapStateToProps)(UserMenu);

export default injectIntl(UserMenu);
