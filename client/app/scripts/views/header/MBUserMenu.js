import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import {showEventList} from '../../actions/HeaderActionsCreator';
import RBService from '../../services/RBService';
import ImageResources from '../../utils/ImageResources';
import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var MBUserMenu = React.createClass({
    getInitialState :function(){
        return {
            menuItems :[]
        }
    },
    render: function(){
        return (
            <div className="mw_dropdown_container" style={{display: "none"}}>
                <Link to="/search" className="item" onClick={this.closeMenu} >
                    <div className="title pull-left">Search</div>
                </Link>
                <Link to="/chat" className="item" onClick={this.closeMenu}>
                    <div className="title pull-left">Messages</div>
                    <div className="nav_badge pull-right" id="unread_count" style={{display: "none"}}></div>
                </Link>
                <Link to="/connections" className="item" onClick={this.closeMenu}>
                    <div className="title pull-left">Connections</div>
                </Link>
                <a href="#" className="item" onClick={this.closeMenu}>
                    <div className="title pull-left">Events</div>
                    <div id="mw_event_badge">
                        <div className="nav_badge pull-right">2</div>
                    </div>
                </a>
                <Link to="/settings" className="item" onClick={this.closeMenu}>
                    <div className="title pull-left">Manage Account</div>
                </Link>
                <div className="mw_dropdown_sub_container">
                    <Link to="/settings" className="item" onClick={this.closeMenu}>
                        <div className="title pull-left">My Diamonds</div>
                        <div className="number pull-right">11</div>
                    </Link>
                    <a className="item" onClick={this.closeMenu}>
                        <div className="title pull-left">Charm </div>
                        <div className="number pull-right">
                            Level 5
                        </div>
                    </a>
                    <a href="#" className="item progress_bar_link charm" onClick={this.closeMenu}>
                        <div className="nav_progress_bar_container">
                            <div className="nav_progress_content" style={{width: "80%"}}></div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        userStatus:state.me.userStatus
    }
}

MBUserMenu = connect(mapStateToProps)(MBUserMenu);


export default injectIntl(MBUserMenu);
