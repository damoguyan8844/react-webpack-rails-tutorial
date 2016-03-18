

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import EventDetail from './EventDetail';
import RBService from '../../services/RBService';

class EventsDesktop extends React.Component {


    render() {
        var currentEventIndex=-1;
        const list = this.props.eventList.map(function(e,index) {
            var isActive =false;
            if(this.props.currentEvent && e.id == this.props.currentEvent.event.id){
                currentEventIndex = index;
                isActive = true;
            }
            return (
                <Link to={'/events/'+e.id} className={isActive?"event-item active":"event-item"} key={e.id + index}>
                    <div className="avatar">
                        <img src={e.background_photo_url}/>
                    </div>
                    <div className="content">
                        <div className="name">{e.name}</div>
                        <div className="date">{e.date}</div>
                        <div className="desc">desc</div>
                    </div>
                </Link>
            )
        }.bind(this));
        const isNone = this.props.eventList.length<=0;
        const isNextOnly =!isNone && currentEventIndex <=0;
        const isPrevOnly = !isNone && currentEventIndex == this.props.eventList.length -1;
        return (
            <div className="events-desktop desktop">
                <div className="events-left">
                    <div className="events-header">
                        <div className="region">USA - West</div>
                        <a className="change-region"><FormattedMessage id="change_region"/></a>
                    </div>
                    <div className="event-list">
                        {list}
                    </div>
                    {this.props.pastEvent &&
                    <div className="past-events">
                        <div className="title"><FormattedMessage id="past_events"/></div>
                        <div>
                            <img className="photo" src={this.props.pastEvent.background_photo_url } />
                        </div>
                        <div className="name">{this.props.pastEvent.name}</div>
                    </div>
                    }
                </div>
                <div className="events-right">
                    <div className={isNextOnly?"event-pagination next-only":"event-pagination"}>
                        {!isNone && !isNextOnly && <Link to={"/events/"+this.props.eventList[currentEventIndex-1].id} className="nav">
                            <FormattedMessage id="prev_event"/>
                        </Link>}
                        {!isNone && !isPrevOnly && <Link to={"/events/"+this.props.eventList[currentEventIndex+1].id} className="nav">
                            <FormattedMessage id="next_event"/>
                        </Link>}
                    </div>
                    <EventDetail />
                </div>

            </div>
        )

    }
}



export default connect()(EventsDesktop);
