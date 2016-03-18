

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Select from 'react-select';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

class EventDetail extends React.Component {


    render() {
        const helpIcon =
            <svg width="16px" height="15px" viewBox="0 0 16 15" version="1.1" xmlns="http://www.w3.org/2000/svg" >

                <g id="-Events" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                    <g id="events----main"  transform="translate(-709.000000, -910.000000)" fill="#797979">
                        <g id="pricing"  transform="translate(441.000000, 812.000000)">
                            <g id="tip" transform="translate(268.000000, 83.000000)" >
                                <path d="M8,16.4563107 C11.3400485,16.4563107 14.0436893,19.1593689 14.0436893,22.5 C14.0436893,25.840085 11.3405947,28.5436893 8,28.5436893 C4.65991505,28.5436893 1.95631068,25.8405947 1.95631068,22.5 C1.95631068,19.159915 4.65936893,16.4563107 8,16.4563107 L8,16.4563107 Z M8,15 C3.85785194,15 0.5,18.3578519 0.5,22.5 C0.5,26.6421481 3.85785194,30 8,30 C12.1421481,30 15.5,26.6421481 15.5,22.5 C15.5,18.3578519 12.1421481,15 8,15 L8,15 L8,15 Z M8.07372573,26.9967597 C7.54413835,26.9967597 7.11463592,26.5672573 7.11463592,26.0374515 C7.11463592,25.5079733 7.54413835,25.0786165 8.07372573,25.0786165 C8.60342233,25.0786165 9.03277913,25.5079733 9.03277913,26.0374515 C9.03277913,26.5672573 8.60342233,26.9967597 8.07372573,26.9967597 L8.07372573,26.9967597 Z M8.82773058,24.1618689 L8.82773058,24.3344053 L7.24679612,24.3344053 L7.24679612,24.1618689 C7.24679612,23.6737136 7.31800971,23.0474272 7.88476942,22.502949 C8.45160194,21.9583617 9.15991505,21.5085801 9.15991505,20.8283374 C9.15991505,20.076335 8.63800971,19.6785437 7.97997573,19.6785437 C6.88351942,19.6785437 6.81183252,20.8157039 6.78481796,21.0661165 L5.24720874,21.0661165 C5.28816748,19.8803155 5.7893568,18.2216869 7.98925971,18.2216869 C9.89567961,18.2216869 10.7527913,19.4985073 10.7527913,20.6958495 C10.7527913,22.6016869 8.82773058,22.9327427 8.82773058,24.1618689 L8.82773058,24.1618689 Z" id="help-3-icon"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        const helpTooltip = <Tooltip id="help-tool-tip">In case there are last minute changes</Tooltip>
        const detail = this.props.detail;
        if(detail){
            const event = this.props.detail.event;
            const avatars = detail.users.map(function(u){
                return (
                <Link to={'/profile/'+u.user.token} className="avatar">
                    <div> <img src={u.user.main_photo.small_image_url}></img></div>
                    <span className="single-line name"> {u.user.name}</span>
                </Link>
                )
            })
            return (
                <div className="event-detail">

                    <div className="event-participants">
                        <div className="stats-see-all">
                            <div className="stats">56 people are interested</div>
                            <div className="see-all">see all</div>
                        </div>
                        <div className="avatar-list">
                            {avatars}
                        </div>
                    </div>
                    <div className="event-content">
                        <div className="event-header">
                            <div className="event-box">
                                <div className="overlay">
                                    <div className="name">{event.name}</div>
                                </div>
                                <img src={event.background_photo_url}/>
                            </div>
                        </div>
                        <div className="event-actions">
                            <div className="where-when">
                                <div className="where">
                                    <div className="title">Where</div>
                                    <div>{event.address}</div>
                                    <div>{event.location}</div>
                                    <span className="link">map</span>
                                </div>
                                <div className="when">
                                    <div className="title">When</div>
                                    <div>{event.date}</div>
                                    <span className="link">add to calendar</span>
                                </div>
                            </div>
                            <div className="purchase-interest">
                                <a href="#buy-ticket-anchor" className="purchase">Purchase</a>
                                <div className="link">I'm interested</div>
                            </div>
                        </div>
                        <div className="event-description">
                            <div className="title">About the event</div>
                            <div dangerouslySetInnerHTML={{__html:this.props.detail && this.props.detail.event && this.props.detail.event.description}}>
                            </div>
                        </div>

                        <div className="event-ticket">
                            <div id="buy-ticket-anchor"></div>
                            <div className="selectors">
                                <div className="pricing">
                                    <div className="title">Pricing</div>
                                    <Select name="gender"/>
                                </div>
                                <div className="gender">
                                    <div className="title">Gender</div>
                                    <Select name="gender"/>
                                </div>
                                <div className="age">
                                    <div className="title">Age</div>
                                    <Select name="age"/>
                                </div>
                            </div>
                            <div className="info">
                                <div className="id">
                                    <div className="title">2RedBeans ID</div>
                                    <div><input type="text" /></div>
                                </div>
                                <div className="phone">
                                    <div className="title">
                                        <span>Phone Number</span>
                                        <OverlayTrigger placement="right" overlay={helpTooltip}>
                                            <span className="help-icon">{helpIcon}</span>
                                        </OverlayTrigger>
                                    </div>
                                    <div><input type="text" /></div>
                                </div>
                                <span className="buy-tickets">
                                    Buy Tickets
                                </span>
                            </div>
                        </div>


                    </div>

                </div>
            )
        }else{
            return (
                <div className="event-detail">
                    <div className="loading"><object data="/app/images/tail-spin.svg" type="image/svg+xml"></object></div>
                </div>
            )
        }


    }
}

function mapStateToProps(state){
    return {
        detail:state.events.detail
    }
}

export default connect(mapStateToProps)(EventDetail);
