var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';

var MessageHeader = React.createClass({
    render:function(){
        console.log("ddddddddddd:::"+this.props.curPeer);
        return (
        this.props.curPeer &&
            <div className="clearfix chat-header row">
                <div className="sender_photo col-xs-2">
                    <img className="header-img" src={this.props.curPeer.photoURL} />
                    <div className="chat_online-indicator"></div>
                </div>
                <div className="msg_sender_info col-xs-9">
                    <p className="truncate list-group-item-heading sender_name">{this.props.curPeer.name + "," + this.props.curPeer.age}</p>
                    <p className="truncate list-group-item-text sender_location">{this.props.curPeer.location}</p>
                </div>
            </div>
        )
    }
});

var MessageList = React.createClass({
    checkPeer: function(){

    },
    sendMsg: function(e) {
        var msg = $('#mb-chat-input').val().trim();
        $('#mb-chat-input').val('');
        if (msg.length === 0)
            return false;
        $('#send-button').attr('disabled', true);
        sendMessage(this.props.curPeer, msg, function(message) {
            appendMessage(message);
        });
        return false;
    },
    render:function() {
        console.log("22222222222222:"+this.props.msgList);
        console.log("333333333333333:"+ this.props.curPeer);
        if(this.props.msgList == null)
            return(<ul className="mb-convo_list list-group"><p className='no-convo-left'> It's so quiet here... </p></ul>);
        var isEdit = this.props.showMsgPanel;
        console.log("111111:");
        console.log(RB.getMe().token);
        $('#chat-box').empty();
        var msgListHtml =  this.props.msgList.map(function (msg) {
            var cls = "msg_bubble msg_bubble--you";

            if (msg.senderToken === RB.getMe().token){
                var readAt = msg.readAt;
                var readAtText;
                if (readAt === undefined) {
                    readAtText = i18n("shown_to_vip_only");
                } else if (readAt === 0) {
                    readAtText = "";
                } else {
                    readAtText = construct_client_time(readAt);
                }
                return (
                    <div className="msg-container_outer">
                    <div className="msg_container_inner msg_me">
                        <div className="msg_photo"><img src={RB.getMe().main_photo.mobile_image_url} className="img-circle" /></div>
                            <div className="bubble_container">
                                <div className="msg_bubble msg_bubble--me">{/([^\s-]{5})([^\s-]{5})/.exec(msg.msg)}</div>
                            </div>
                            <div className="filler"></div>
                        </div>
                        <div className="bubble-footer">{readAtText}</div>
                        <div className="clear_both"></div>
                    </div>
                )
            }else{
                return (
                    <div className="msg-container_outer">
                        <div className="msg_container_inner msg_you">
                            <div className="msg_photo"><img src={this.props.curPeer.photoURL} className="img-circle" /></div>
                            <div className="bubble_container">
                                <div className="msg_bubble msg_bubble--you">{msg.msg}</div>
                            </div>
                            <div className="filler"></div>
                        </div>
                        <div className="bubble-footer"></div>
                        <div className="clear_both"></div>
                    </div>
                )
            }
        }.bind(this));
        console.log("777777:" + msgListHtml);
        return(
            <div className="clearfix chat_panel" style={{display: this.props.showMsgPanel? "": "none"}} >
                <MessageHeader curPeer={this.props.curPeer }/>
                <div id="chat-loading">
                    <div className="uil-ellipsis-css">
                        <div className="circle">
                            <div></div>
                        </div>
                        <div className="circle">
                            <div></div>
                        </div>
                        <div className="circle">
                            <div></div>
                        </div>
                        <div className="circle">
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="clearfix chat-box" >
                    {msgListHtml}
                </div>
                <div className="clearfix chat_input_panel">
                    <div className="chat-input-container">
                        <input autocomplete="off" placeholder="Say nothing" data-role="none" type="text" id="mb-chat-input" />
                    </div>
                    <div className="send-button-container" onClick={this.sendMsg} >
                        <svg width="21px" height="18px" viewBox="0 0 21 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="-Conversation" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="m.conversation----single-view" transform="translate(-288.000000, -771.000000)">
                                    <g id="send-bg-+-send-form" transform="translate(-3.000000, 755.000000)">
                                        <g id="send-form" transform="translate(18.000000, 13.000000)">
                                            <g id="ic_send_black_24px" transform="translate(271.000000, 0.000000)">
                                                <path d="M2.01,21 L23,12 L2.01,3 L2,10 L17,12 L2,14 L2.01,21 Z" id="Shape" fill="#EE3888"></path>
                                                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

        )
    }
});



export default MessageList;
