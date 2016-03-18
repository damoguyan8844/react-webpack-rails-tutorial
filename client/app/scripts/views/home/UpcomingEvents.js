
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import RBService from '../../services/RBService';

class UpcomingEvents extends React.Component {

    render() {
        const list = this.props.events.map(function(event){
            return (
                <Link to={"/events/"+ event.id} className="event-item" key={event.name}>
                    <div className="event-box">
                        <div className="overlay">
                            <span className="date">{event.date}</span>
                            <span className="name">{event.name}</span>
                        </div>
                        <img src={event.background_photo_url}></img>
                    </div>
                </Link>
            )
        })
        return (
            <div className="home-events">
                <div className="title">
                    <FormattedMessage id="upcoming_events"/>
                </div>
                <div className="event-list">
                    {list}
                </div>
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        events:state.home.events
    }
}

export default connect(mapStateToProps)(UpcomingEvents);
