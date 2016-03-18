
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import RBService from '../../services/RBService';

class Challenges extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {

    }

    render() {
        var list = [];
        const goals = this.props.overview.goalProgressDetails;
        for(var p in goals){
            const item = goals[p];
            const challengeItem =
                <div className="challenge-item">
                    <div className="avatar">
                        <img src="/app/images/no_photo_thumb.png"></img>
                    </div>
                    <div>
                        <div className="challenge-title">{item.text}</div>
                        <div className="challenge-desc">{item.text}</div>
                    </div>
                    <div className="diamonds">
                        <svg width="14px" height="12px" viewBox="0 0 14 12" version="1.1" xmlns="http://www.w3.org/2000/svg"  >
                            <defs>
                                <path id="path-1" d="M0.0182608696,0.227956522 L14,0.227956522 L14,11.4888261 L0.0182608696,11.4888261 L0.0182608696,0.227956522 Z"></path>
                            </defs>
                            <g id="-My-Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                                <g id="myprofile----details"  transform="translate(-318.000000, -657.000000)">
                                    <g id="sidebar"  transform="translate(13.000000, 74.000000)">
                                        <g id="diamonds" transform="translate(15.000000, 579.000000)">
                                            <g id="diamonds:-profile-photo">
                                                <g id="diamond-earnings" transform="translate(290.000000, 1.000000)">
                                                    <g id="diamond36" transform="translate(0.000000, 3.000000)">
                                                        <mask id="mask-2"  fill="white">
                                                            <use ></use>
                                                        </mask>
                                                        <g id="Clip-2"></g>
                                                        <path d="M5.943,0.560913043 L6.22847826,0.227956522 L3.10404348,0.227956522 L0,3.80769565 L3.1506087,3.80769565 L5.943,0.560913043 Z M3.8983913,3.80769565 L9.79969565,3.80769565 L8.19608696,1.94113043 L6.84904348,0.376478261 L4.816,2.74126087 L3.8983913,3.80769565 Z M0.0380434783,4.37469565 L5.90495652,10.5483913 L3.09947826,4.37469565 L0.0380434783,4.37469565 Z M9.97682609,4.37469565 L3.72126087,4.37469565 L6.83108696,11.2176522 L6.85026087,11.2605652 L9.814,4.73473913 L9.97682609,4.37469565 Z M7.80134783,10.5389565 L13.6588261,4.37469565 L10.5998261,4.37469565 L7.80134783,10.5389565 Z M13.6968696,3.80769565 L10.5916087,0.227956522 L7.4683913,0.227956522 L10.5474783,3.80769565 L13.6968696,3.80769565 Z" id="Fill-1" fill="#EE3888"  mask="url(#mask-2)"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span className="diamonds-number">{item.value}</span>
                    </div>
                </div>
            list.push(challengeItem);
        }
        return (
            <div className="home-challenges">
                <div className="title">
                    <FormattedMessage id="challenges" />
                </div>
                <div className="challenge-list">
                    {list}
                </div>
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        overview:state.me.overview
    }
}

export default connect(mapStateToProps)(Challenges);
