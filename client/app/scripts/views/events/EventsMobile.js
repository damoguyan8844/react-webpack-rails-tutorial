

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { History } from 'react-router';
import EventDetail from './EventDetail';

var EventsMobile = React.createClass({
    mixins: [History],
    onClickEventItem:function(id){
        this.history.pushState(null,'/events/'+id);
    },

    render() {

        const list = this.props.eventList.map(function(e) {
            const duration = e.date + ' - ' + e.expire_at;
            return (
                <Link to={"/events/"+e.id} className="event-item" key={e.id}  >
                    <div className="event-box">
                        <div className="overlay">
                            <div className="name">{e.name}</div>
                        </div>
                        <img src={e.background_photo_url}/>
                    </div>
                    <div className="content">
                        <div className="region">{e.location}</div>
                        <div className="duration">{duration}</div>
                    </div>
                </Link>
            )
        }.bind(this));
        return (
            <div className="events-mobile mobile">
                {!this.props.showMobileDetail
                ?
                <div className="event-list">
                    {list}
                </div>
                :
                <EventDetail/>
                }


            </div>
        )

    }
})


export default EventsMobile;
