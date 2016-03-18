require('../../styles/events.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import EventsDesktop from './EventsDesktop';
import EventsMobile from './EventsMobile';
import RBService from '../../services/RBService';
import {getEvents,getEventDetail,getPastEvent,showMobileDetail} from '../../actions/EventsActionCreators';

class Events extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isMobile:RB.isMobileLayout()
        }
    }
    componentWillMount() {
        if(this.props.events.eventList.length == 0){
            RBService.getEvents()
                .then(function(response){
                    const events = response.data.events;
                    this.props.getEvents(events);
                    if(events.length>0 && !this.props.params.eventId){
                        this.getEventDetail(events[0].id,false);
                    }
                }.bind(this))
            RBService.getPastEvent()
                .then(function(response){
                    this.props.getPastEvent(response.data.event);
                }.bind(this))
        }

        const eventId = this.props.params.eventId;
        if(eventId){
            this.getEventDetail(eventId,true);
        }
        this.layoutHandler = this.layoutChanged.bind(this);
        RB.addChangeLayoutListener(this.layoutHandler);
    }
    componentWillReceiveProps(nextProps){
        const existId =  this.props.params.eventId;
        if(nextProps.params.eventId){
            if(!existId || nextProps.params.eventId != existId){
                this.getEventDetail(nextProps.params.eventId, true);
            }
        }else if(this.props.events.showMobileDetail){
            this.props.showMobileDetail(false);
        }

    }
    componentWillUnmount() {
        RB.removeChangeLayoutListener(this.layoutHandler);
    }
    layoutChanged(isMobile){
       this.setState({isMobile:isMobile});
    }
    getEventDetail(id,showMobileDetail){
        RBService.getEventDetail(id)
        .then(function(response){
            this.props.getEventDetail(response.data,showMobileDetail);
        }.bind(this))
    }

    render() {
        return (
            <div className="rb-events">
                {this.state.isMobile ?
                    <EventsMobile eventList={this.props.events.eventList}
                                  currentEvent={this.props.events.detail}
                                  showMobileDetail={this.props.events.showMobileDetail}/>
                    :
                    <EventsDesktop eventList={this.props.events.eventList}
                                   currentEvent={this.props.events.detail} pastEvent={this.props.events.pastEvent}/>
                }
            </div>
        )

    }
}
function mapStateToProps(state){
    return {
        events:state.events
    }
}


export default connect(mapStateToProps,{getEvents,getEventDetail,getPastEvent,showMobileDetail})(Events);
