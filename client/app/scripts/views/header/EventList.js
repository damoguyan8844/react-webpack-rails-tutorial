import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import {showEventList} from '../../actions/HeaderActionsCreator';
import RBService from '../../services/RBService';
import ImageResources from '../../utils/ImageResources';

import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';


var EventList = React.createClass({
    Clear: function(i){
        var eList = this.props.eventList.concat();
        eList.splice(i,1);
        this.props.showEventList(eList);
    },
    componentDidMount:function(){
        var lat = RB.getMe().overview.lat;
        var lng = RB.getMe().overview.lng;
        RBService.getEventList(lat,lng).then(function(response){
            var events = response.data.events;  //JSON.stringify
            this.props.showEventList(events);
        }.bind(this))
            .catch(function(response){
                console.log("updateMe error:",response);
            });
    },
    render: function() {

        const {formatMessage} = this.props.intl;
        var menus = this.props.eventList && this.props.eventList.map(function(p,index){
            var expireTime = new Date(p.expire_at*1000);
            var iDays = Math.round((expireTime - new Date())/(60*60*24*1000));
            return (
                <div className="nav_event_list" key={"events_" + index}>
                    <div className="nav_event_wrap">
                        <a className="nav_event_link" href={p.url}>
                            <div className="nav_event_pic_wrapper"><img className="nav_event_pic" src={p.background_photo_url} /></div>
                            <div className="nav_event_title">{p.name}</div>
                        </a>
                        <p className="nav_event_text">
                            <span className="nav_event_time">{formatMessage({id:"days_left"},{days: iDays})}</span>
                            <span className="closebox" onClick={this.Clear.bind(null,index)}>{formatMessage({id:"clear"})} </span>
                        </p>
                    </div>
                </div>
            )
        }.bind(this));
        return (
            <div>
                {   (menus && menus.length > 0) ?
                        <div style={{color:"#fff",background:"#272727",paddingTop:"0px",fontWeight:"200",paddingBottom :"15px"}}>
                            {menus}
                            <li className="nav_submenu_divider"></li>

                            <li><Link to="/events" className="more_event">{formatMessage({id:"see_more_events"})}</Link> </li>

                        </div>
                    :
                        this.props.eventList &&
                        <div>
                            <li className="all-done">{formatMessage({id:"nice_all_done"})}</li>

                            <li>
                                <i className="fa fa-smile-o fa-5x"></i>
                            </li>
                        </div>
                }
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        eventList: state.header.eventList
    }
}

EventList = connect(mapStateToProps, {showEventList})(EventList)

export default injectIntl(EventList);
