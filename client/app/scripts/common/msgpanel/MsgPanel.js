import React from 'react'
import ReactDom from 'react-dom';
import ImageResources from '../../utils/ImageResources';

var MsgPanel = React.createClass({
    getInitialState:function(){
        return {
            peerinfo:{
                name: "Nicole Mendoza",
                age: "30",
                lastMsg : "",
                country: "China",
                state: "HF"
            }
        }
    },
    toggleNav: function(){
    },
    back: function(){
        $(".msg-panel").hide();
        $(".con-panel").show();
        var q = {};
        var queries = location.search.replace(/^\?/, '').split('&');
        if(q['p']) {
            startChat('RTMiE3vU6L', q['p']);
        } else {
            startChat('RTMiE3vU6L');
        }
        $('#show-inbox').click(function() {
            if (showInbox)
                return;
            showInbox = true;
            reloadConvosView();
        });

        $('#show-outbox').click(function() {
            if (!showInbox)
                return;
            showInbox = false;
            reloadConvosView();
        });

        $('.convo_button_mark-all-read').click(function() {
            var tokens = [];
            inboxPeers.forEach(function(peer) {
                if (peer.numUnread > 0)
                    tokens.push(peer.token);
            });
            if (tokens.length === 0)
                return;
            markRead(tokens);
        });

        $('.convo_button_mark-read').click(function() {
            var tokens = getSelectedTokens();
            if (tokens.length === 0)
                return;
            markRead(tokens);
        });

        $('.cancel-button').click(function(){
            editConvos = false;
            reloadConvosView();
        });

        $('.convo_button_edit').click(function(){
            editConvos = true;
            reloadConvosView();
        });

        $('#delete-current').click(function() {
            deletePeers([currentPeerToken]);
        });
    },
    onClose:function(){
        this.props.sendMessage && this.props.sendMessage();
    },
    componentDidMount: function() {
        $('.con-msg').on('click','li',function (){
            $(this).siblings().find("a").removeClass('active');
            $(this).find("a").toggleClass('active');
        });
    },
    render: function() {
        return (

            <div className="panel-wrap">
               <div className="con-panel" style={{display:"none"}}>
                    <div className="msg-heading row">
                        <div className="con-title col-lg-10 col-md-10 col-xs-10">Messages</div>
                        <div className="con-msg col-lg-12 col-md-12 col-xs-12">
                                <li className="inbox-left"><a className="active" href="javascript:void(0)">Inbox</a></li>
                                <li><a href="javascript:void(0)">Never Replied</a></li>
                        </div>
                        <div className="con-close col-lg-2 col-md-2 col-xs-2">
                            <a href="javascript:void(0)" className="icon-button-close" onClick={this.onClose}></a></div>
                    </div>
                    <ul className="convo_list list-group pop-convo_list">
                        <div id="loading">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" viewBox="0 0 38 38" stroke="grey" height="60">
                                <g fill="none" fill-rule="evenodd">
                                    <g transform="translate(1 1)" stroke-width="2">
                                        <circle stroke-opacity=".5" r="18" cy="18" cx="18"/>
                                        <path d="M36 18c0-9.94-8.06-18-18-18">
                                            <animateTransform type="rotate" to="360 18 18" repeatCount="indefinite" from="0 18 18" dur="1s" attributeName="transform"/>
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="push"></div>
                    </ul>
                    <div className="convo_footer">
                        <div className="convo_features">
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="convo_button_edit btn btn-default">edit</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="convo_button_mark-all-read btn btn-default">mark all as read</button>
                                </div>
                            </div>
                        </div>
                        <div className="convo_options">
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">

                                    <button type="button" className="convo_button_mark-read btn btn-default">
                                        <span className="glyphicon glyphicon-ok"></span>
                                        Mark as read
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="convo_button_delete btn btn-default">
                                        <span className="glyphicon glyphicon-trash"></span>
                                        Delete
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="cancel-button btn btn-default">
                                        <span className="glyphicon glyphicon-remove"></span>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="msg-panel">
                        <div className="clearfix pop-chat-header row">
                            <div className="sender_photo col-lg-2 col-md-2 col-xs-3">
                                <a href="javacript:void(0)" onClick={this.back}>
                                <img src={ImageResources.dark} width="17px" height="15px"/></a>
                            </div>
                            <div className="msg_sender_info col-lg-17 col-md-15 col-xs-14">
                                <p className="user-info truncate small sender_location">{this.state.peerinfo.name} ,&nbsp;{this.state.peerinfo.age}</p>
                                <p className="country-info">{this.state.peerinfo.state} &nbsp; {this.state.peerinfo.country}</p>
                            </div>
                        </div>
                        <div id='chat-loading' >

                        </div>
                        <div className="become-vip-box">
                            <a className="close close-vip-box">&times;</a>
                            <p className="become-vip-text">
                                Messages can’t be seen because only VIPs get unlimited messaging. But you can chat by unlocking this conversation forever with 15 diamonds.
                            </p>
                            <button className="unlock-button btn btn-default" type="button">unlock_now</button>
                            <button className="become-vip-button btn btn-default" type="button">become_vip</button>
                        </div>
                        <div className="clearfix pop-chat-box">

                        </div>
                        <div className="clearfix pop-chat-input-panel">
                                <form className="pop-chat-input-form" onSubmit={this.handleSubmit}>
                                   <textarea rows="1" id="chat-input" placeholder="Type something" ref="msg-text"></textarea>
                                    <div><a>
                                        <img src={ImageResources.ic_send} />
                                    </a></div>
                                </form>
                        </div>

                </div>
            </div>
        )

    }
});

export default MsgPanel;
