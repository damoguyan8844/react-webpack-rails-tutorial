var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import MbConversations from "./MbConversations.js";
//import RaisedButton from 'material-ui/lib/raised-button';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import RBNotify from '../../common/notification/RBNotify';
var ReportForm = require('./Report.js').Report;

var UnreadMsgCountMixin = require('../header/UnreadMsgCountMixin.js').UnreadMsgCountMixin;

var MsgForm = React.createClass({
    sendMsg: function(e) {
        var msg = $('#chat-input').val().trim();
        $('#chat-input').val('');
        if (msg.length === 0)
            return false;
        $('#send-button').attr('disabled', true);
        sendMessage(currentPeerToken, msg, function(message) {
            $('#send-button').attr('disabled', false);
            appendMessage(message);
        });
        return false;
    },
    render: function() {
        return (

            <div className="clearfix chat_input_panel">
                    <div className="chat_input_form form-group" onClick={this.sendMsg}>
                        <textarea className="form-control" rows="4" id="chat-input" placeholder="Type your message here..." ref="text"></textarea>
                        <button type="submit" className="chat_input_button btn btn-default" >send</button>
                        <div id="clear" ></div>
                    </div>
            </div>
        )
    }
});

var Conversations = React.createClass({
    mixins: [UnreadMsgCountMixin],
    getInitialState: function() {
        return {
            convList: [],
            msgList: [],
            curPeer: null
        }
    },
    block: function() {
        var url = "http://testing.2redbeans.com/en/blockings?blocked_id=" + [currentPeerToken];
        $.ajax({
            type: 'POST', url: url,
            success: function(data) {
                RBNotify.notify('simple',{title:data.message});
                var peers;
                if (showInbox)
                    peers = inboxPeers;
                else
                    peers = outboxPeers;
                var token = currentPeerToken;
                var index = findPeerIndex(peers, token);
                if (index === -1)
                    throw new Error('current peer is gone');
                peers.splice(index, 1);
                if (peers.length > 0) {
                    currentPeerToken = peers.length >= index ? peers[index].token : peers[0].token;
                }else{
                    currentPeerToken = null;
                }
                messages[token] = undefined;
                reloadConvosView();
                reloadMessagesView();
            },
            error: function() {
                i18n("no_conv");
                RBNotify.notify('simple',{title: i18n("block_failed")});
                reloadMessagesView();
            }
        });
    },
    report: function() {
        $('#report-user-modal').modal("show");
    },
    deleteconv:  function() {
        var tokens = getSelectedTokens();
        if (tokens.length === 0) {
            RBNotify.notify('simple',{title: i18n("con_del_check")});
            return;
        }
        deletePeers(tokens);
    },
    showInBox: function() {
        console.log('showInbox:',showInbox);
        if (showInbox)
            return;
        showInbox = true;
        reloadConvosView();
        this.setState({
            convList: inboxPeers
        });
    },
    showOutBox:function(){
        console.log('showInbox:',showInbox);
        if (!showInbox)
            return;
        showInbox = false;
        reloadConvosView();
        this.setState({
            convList: outboxPeers
        });
    },
    loadConvList: function(){
        this.setState({
            convList: inboxPeers
        });
    },
    updateConList: function(list){
        this.setState({
            convList: list
        });
    },
    componentDidMount: function() {
        var current_user = {
            token: RB.getMe().token,
            mainPhoto: RB.getMe().main_photo.mobile_image_url
        };

        socket = io({transports: ['polling'], 'force new connection': true});
        socket.on('connect', function() {
            var q = {};
            var queries = location.search.replace(/^\?/, '').split('&');
            for(var i = 0; i < queries.length; i++) {
                var split = queries[i].split('=');
                q[split[0]] = split[1];
            }
            console.log("11111::"+current_user.token);
            console.log("11111::"+current_user.mainPhoto);
            if(q['p']) {
                startChat(current_user.token, q['p'],function(){
                    this.setState({
                        convList: inboxPeers
                    });
                }.bind(this));
            } else {
                startChat(current_user.token,this.updateConList,function(){
                    this.setState({
                        convList: inboxPeers
                    });
                }.bind(this));
            }
        }.bind(this));
        socket.on('message', function(message) {
            appendMessage(message);
            updateUnreadCountInNavBar();
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

        $('.chat-box').scroll(function(){
            if ($(this).scrollTop() == 0) {
                getMoreMessages();
            }
        });

        $('.convo_list').scroll(function(){
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 2) {
                getMorePeers();
            }
        });


    },
    readPeerMsg:function(msg,peer){
        this.setState({
            msgList:msg,
            curPeer: peer
        })
    },
    render: function() {
        return (
            <div className="rb-conversations">
                <div className="rb-ds-conversations">
                <div className="clearfix inbox-panel row">
                    <div className="convo_panel col-md-10 col-sm-10 col-xs-10">
                        <div className="clearfix panel panel-default">
                            <div className="panel-heading">
                                <button type="button" className="btn btn-default active" id="show-inbox" onClick={this.showInBox}>Inbox</button>
                                <button type="button" className="btn btn-default" id="show-outbox" onClick={this.showOutBox}>Never Replied</button>
                            </div>
                            <ul className="convo_list list-group">
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
                    </div>
                    <div className="clearfix no-convo-right col-md-14 col-sm-14" style={{display:'none'}}>
                        Oops! You have no conversations at the moment. :(
                    </div>
                    <div className="clearfix chat_panel col-md-14 col-sm-14"  style={{display:'none'}}>
                        <div className="chat_header">
                            <div className="sender_photo">
                            <img className="img-circle" src="/images/no_photo_thumb.png" />
                                <div className="chat_online-indicator"></div>
                            </div>
                            <div className="msg_sender_info">
                                <p className="truncate list-group-item-heading sender_name">
                                    <span className="vip-badge label"></span>
                                </p>
                                <p className="truncate small list-group-item-text sender_location"></p>
                            </div>

                            <div className="btn-group chat_options">
                               <ButtonGroup>
                                    <DropdownButton title="operation" className="pull-right">
                                        <MenuItem eventKey="1" onSelect={this.block}>block</MenuItem>
                                        <MenuItem role="separator" className="divider"></MenuItem>
                                        <MenuItem id="report-user" onSelect={this.report} data-target="#report-user-modal" data-toggle="modal" type="button">Report</MenuItem>
                                        <MenuItem role="separator" className="divider"></MenuItem>
                                        <MenuItem eventKey="2" onSelect={this.deleteconv}>delete conversation</MenuItem>
                                    </DropdownButton>
                                </ButtonGroup>
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
                      <div className="clearfix chat-box">

                      </div>
                        <MsgForm />
                    </div>
                </div>
                <ReportForm/>
                </div>
                <MbConversations convList={this.state.convList } msgList={this.state.msgList} curPeer={this.state.curPeer} onReadPeerMsg={this.readPeerMsg}/>
        </div>
    )
    }
});
export default Conversations;
