
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {injectIntl,FormattedMessage} from 'react-intl';

import UserStats from './UserStats.js';

var Overview = React.createClass({

    render: function() {
        var progress = this.props.overview.profileProgress;
        var progressData = [];
        for (var p in this.props.overview.profileProgressDetails){
            var d = this.props.overview.profileProgressDetails[p];
            progressData.push({
                desc:d.text,
                done:d.value>0
            })
        }
        var fillList = progressData.map(function(item){
            return(
                <div key={item.desc} className="myoverview_progress-status_list_item">
                    <div>{item.desc}</div>
                    {item.done ?
                    <div>
                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"  >
                            <defs>
                                <path id="path-1" d="M0,0 L9.5616,0 L9.5616,7.2 L0,7.2 L0,0 Z"></path>
                            </defs>
                            <g id="-My-Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                                <g id="myprofile----details"  transform="translate(-332.000000, -549.000000)">
                                    <g id="sidebar"  transform="translate(13.000000, 74.000000)">
                                        <g id="goals" transform="translate(15.000000, 393.000000)">
                                            <g id="goal:-match" transform="translate(0.000000, 81.000000)">
                                                <g id="button/select/checked" transform="translate(304.000000, 1.000000)">
                                                    <circle id="Oval-22" fill="#EE3888"  cx="8" cy="8" r="8"></circle>
                                                    <g id="check" transform="translate(3.200000, 4.800000)">
                                                        <mask id="mask-2"  fill="white">

                                                        </mask>
                                                        <g id="Clip-2"></g>
                                                        <path d="M2.8672,5.55054545 L0.71744,3.35192727 L0,4.08305455 L2.8672,7.01607273 L9.00992,0.733745455 L8.29504,0 L2.8672,5.55054545 Z" id="Fill-1" fill="#FFFFFF"  mask="url(#mask-2)"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    :
                    <div>
                        <svg width="18px" height="18px" >
                            <circle cx="9" stroke="#d7d7d7" cy="9" r="8" fill="none"></circle>
                        </svg>
                    </div>
                    }
                </div>
            )
        }.bind(this));
        var diamondsData=[];
        for (var p in this.props.overview.goalProgressDetails){
            var d = this.props.overview.goalProgressDetails[p];
            if(d.value){
                diamondsData.push({
                    desc:d.text,
                    diamonds:d.value
                })
            }
        }
        var diamondsList = diamondsData.map(function(d){
            return (
                <div className="myoverview_earn-diamonds_item">
                    <span>{d.desc}</span>
                    <div>
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
                        <span className="myoverview_earn-diamonds_data">{d.diamonds}</span>
                    </div>

                </div>
            );
        }.bind(this));
        return(
            <div className="rb-myprofile-overview myoverview">
                <UserStats/>
                <div className="myoverview_progress-status">
                    <div className="myoverview_progress-status_title">
                        <span className="title">
                            <FormattedMessage id="myprofile.fill_out_your_profile" />
                        </span>
                        <span className="myoverview_progress-status_val">{progress + '%'}</span>
                    </div>
                    <div className="myoverview_progress-status_bar">
                        <div className="myoverview_progress-status_bar_left" style={{width:progress+'%'}}></div>
                        <div className="myoverview_progress-status_bar_right" style={{width:(100 - progress)+'%'}}></div>
                    </div>
                    <div className="myoverview_progress-status_list">
                        {fillList}
                    </div>
                </div>
                <div className="myoverview_earn-diamonds">
                    <div className="myoverview_earn-diamonds_title"><FormattedMessage id="myprofile.earned_diamonds" /></div>
                    <hr className="myoverview_earn-diamonds_line"/>
                    {diamondsList}
                </div>
            </div>

        )
    }
});


function mapStateToProps(state){
    return {
        overview:state.me.overview
    }
}

Overview = connect(mapStateToProps)(Overview)
export default Overview;
