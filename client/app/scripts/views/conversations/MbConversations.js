var React = require('react');
var ReactDOM = require('react-dom');
import ConversationList from './ConversationList.js';
import MessageList from './MessageList.js';

var ConversationOperation = React.createClass({

    render:function(){
        return(
            <div className="convo-options-panel" style={{display: this.props.editMode?"":"none" }}>
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <button data-role="none" type="button" className="mb-convo_button_mark-read btn btn-default">
                            <span className="glyphicon glyphicon-ok"></span>
                            <p className="convo_mark-read_text">Mark as read</p>
                        </button>
                    </div>
                    <div className="btn-group" role="group">
                        <button data-role="none" type="button" className="mb-convo_button_delete btn btn-default">
                            <span className="glyphicon glyphicon-trash"></span>
                            <p className="convo_delete_text">Delete</p>
                        </button>
                    </div>
                    <div className="btn-group" role="group">
                        <button data-role="none" type="button" className="mb-cancel-button btn btn-default">
                            <span className="glyphicon glyphicon-remove"></span>
                            <p className="convo_cancel_text">Cancel</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});


var MbConversations = React.createClass({
    getInitialState: function() {
        return {
            editMode: false,
            selectedCovs: [],
            showMsgPanel: false
        }
    },
    switchEditMode: function() {
        this.setState({
            editMode: true
        })
    },
    componentDidMount: function() {


    },
    readPeerMsg:function(peer){
        console.log("readPeerMsg:" + peer)
        !this.state.editMode &&
        getMessages(function() {
            console.log("readPeerMsg11:" + peer)
            var msgs = messages[peer.token];
            this.props.onReadPeerMsg(msgs,peer);
            this.setState({
                showMsgPanel: true
            })

        }.bind(this));
    },
    updateSelectedConList:function(peer){
        var selList = this.state.selectedCovs;
        this.setState({
            selectedCovs:selList
        })

    },
    render: function(){
        return(
        <div className="rb-mb-conversations" style={{height: "724px"}}>
            <div className="btn-group mb-op" style={{display: this.state.showMsgPanel ? "none" : "" }}>
                <span aria-expanded="false" aria-haspopup="true" className="btn dropdown-toggle options-button ui-btn ui-shadow ui-corner-all" data-toggle="dropdown" type="button">
                    <svg width="6px" height="19px" viewBox="0 0 6 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="-Mobile" stroke="none" strokeWidth="1" fill="none" filRrule="evenodd">
                            <g id="m.messages----single-view" transform="translate(-300.000000, -12.000000)" fill="#FFFFFF">
                                <path d="M298.518131,21.2489903 C298.518131,22.4966699 297.506723,23.5080777 296.259087,23.5080777 C295.011408,23.5080777 294,22.4966699 294,21.2489903 C294,20.0013107 295.011408,18.9899029 296.259087,18.9899029 C297.506723,18.9899029 298.518131,20.0013107 298.518131,21.2489903 L298.518131,21.2489903 Z M303,18.9899029 C301.75232,18.9899029 300.740913,20.0013107 300.740913,21.2489903 C300.740913,22.4966699 301.75232,23.5080777 303,23.5080777 C304.24768,23.5080777 305.259087,22.4966699 305.259087,21.2489903 C305.259087,20.0013107 304.24768,18.9899029 303,18.9899029 L303,18.9899029 Z M309.740913,18.9899029 C308.493277,18.9899029 307.481869,20.0013107 307.481869,21.2489903 C307.481869,22.4966699 308.493277,23.5080777 309.740913,23.5080777 C310.988592,23.5080777 312,22.4966699 312,21.2489903 C312,20.0013107 310.988592,18.9899029 309.740913,18.9899029 L309.740913,18.9899029 Z" id="menu-7-icon" transform="translate(303.000000, 21.248990) rotate(-270.000000) translate(-303.000000, -21.248990) "></path>
                            </g>
                        </g>
                    </svg>
                </span>
                <ul className="dropdown-menu dropdown-menu-right arrow-box">
                    <li className="mark-all-read">
                        <a href="javascript:void(0)" className="ui-link">Mark all as read</a>
                    </li>
                    <li className="divider" role="separator"></li>
                    <li className="edit-mode">
                        <a href="javascript:void(0)" className="ui-link" onClick={this.switchEditMode}>Edit mode</a>
                    </li>
                </ul>
            </div>
            <div className="btn-group mb-op" style={{display: !this.state.showMsgPanel ? "none" : "" }}>
                <span aria-expanded="false" aria-haspopup="true" className="btn dropdown-toggle options-button ui-btn ui-shadow ui-corner-all" data-toggle="dropdown" type="button">
                    <svg width="6px" height="19px" viewBox="0 0 6 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="-Mobile" stroke="none" strokeWidth="1" fill="none" filRrule="evenodd">
                            <g id="m.messages----single-view" transform="translate(-300.000000, -12.000000)" fill="#FFFFFF">
                                <path d="M298.518131,21.2489903 C298.518131,22.4966699 297.506723,23.5080777 296.259087,23.5080777 C295.011408,23.5080777 294,22.4966699 294,21.2489903 C294,20.0013107 295.011408,18.9899029 296.259087,18.9899029 C297.506723,18.9899029 298.518131,20.0013107 298.518131,21.2489903 L298.518131,21.2489903 Z M303,18.9899029 C301.75232,18.9899029 300.740913,20.0013107 300.740913,21.2489903 C300.740913,22.4966699 301.75232,23.5080777 303,23.5080777 C304.24768,23.5080777 305.259087,22.4966699 305.259087,21.2489903 C305.259087,20.0013107 304.24768,18.9899029 303,18.9899029 L303,18.9899029 Z M309.740913,18.9899029 C308.493277,18.9899029 307.481869,20.0013107 307.481869,21.2489903 C307.481869,22.4966699 308.493277,23.5080777 309.740913,23.5080777 C310.988592,23.5080777 312,22.4966699 312,21.2489903 C312,20.0013107 310.988592,18.9899029 309.740913,18.9899029 L309.740913,18.9899029 Z" id="menu-7-icon" transform="translate(303.000000, 21.248990) rotate(-270.000000) translate(-303.000000, -21.248990) "></path>
                            </g>
                        </g>
                    </svg>
                </span>
                <ul className="dropdown-menu dropdown-menu-right arrow-box">
                    <li data-target="#block-user-modal" data-toggle="modal" id="block-user" type="button">
                        <a href="javascript:void(0)" class="ui-link">Block</a>
                    </li>
                    <li class="divider" role="separator"></li>
                    <li data-target="#mb-report-user-modal" data-toggle="modal" id="report-user" type="button">
                        <a href="javascript:void(0)" class="ui-link">Report abuse</a>
                    </li>
                    <li class="divider" role="separator"></li>
                    <li data-target="#delete-message-modal" data-toggle="modal" id="delete-curr-convo" type="button">
                        <a href="javascript:void(0)" class="ui-link">Delete conversation</a>
                    </li>
                </ul>
            </div>
            <div className="convo-header btn-group btn-group-justified" role="group" aria-label="..." style={{display: this.state.showMsgPanel ? "none" : "" }} >
                <div className="btn-group" role="group">
                    <button type="button" id="mb-show-inbox" className="active btn btn-default ui-btn ui-shadow ui-corner-all">
                        Inbox
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button id="mb-show-outbox" type="button" className="btn btn-default ui-btn ui-shadow ui-corner-all">
                        Never Replied
                    </button>
                </div>
            </div>
            <ConversationList convList={this.props.convList } editMode={this.state.editMode} showMsgPanel={this.state.showMsgPanel} onReadPeerMsg={this.readPeerMsg}/>
            <ConversationOperation editMode={this.state.editMode} showMsgPanel={this.state.showMsgPanel}/>
            <MessageList curPeer={this.props.curPeer} msgList={this.props.msgList} showMsgPanel={this.state.showMsgPanel} />
            <div className="modal" id="mb-report-user-modal" style={{textAlign:"center"}}>
                <div className="modal-dialog full-width-modal">
                    <div className="modal-content full-width-modal">
                        <div className="modal-header">
                            <h4 className="modal-title">Report user</h4>
                            <small>How has the user violated our TOS?</small>
                        </div>
                        <br/>
                        <div id="report-flash" style={{display:"none"}}></div>
                        <div className="modal-body">
                            <div className="checkbox">
                                <div className="ui-checkbox">
                                    <label className="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">
                                        <span className="checkbox-material"><span className="check"></span></span> Abusive messages
                                    </label>
                                    <input type="checkbox" name="report" data-comment="Abusive Message" data-spec-id="12" />
                                </div>
                            </div>
                            <div className="checkbox">
                                    <div className="ui-checkbox">
                                        <label className="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">
                                            <span className="checkbox-material"><span className="check"></span></span> Scammer
                                        </label>
                                        <input type="checkbox" name="report" data-comment="Scammer" data-spec-id="13" />
                                    </div>
                                </div>
                            <div className="checkbox">
                                 <div className="ui-checkbox">
                                      <label className="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">
                                           <span className="checkbox-material"><span className="check"></span></span> Fake user
                                      </label>
                                      <input type="checkbox" name="report" data-comment="Fake User" data-spec-id="12" />
                                 </div>
                            </div>
                        </div>
                        <button type="button" id="report-user-button" className="btn btn-primary ui-btn ui-shadow ui-corner-all"><large>Report</large></button>
                    </div>
                </div>
                <span id="user_path" url="/en/users" style={{display:"none"}}></span>
                <span id="user_ph_path" url="http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/223/thumb/2redbeans-f860f4a70503f6cf3a50ee2eca58640330272f10.jpg?1442816754" style={{display:"none"}}></span>
            </div>

            <div className="modal" id="block-user-modal" style={{textAlign:"center"}}>
                <div className="modal-dialog full-width-modal">
                    <div className="modal-content full-width-modal">
                        <div className="modal-header">
                            <h4 className="modal-title">delete</h4>
                        </div>
                    <br/>
                    <button type="button" id="cancel-block" data-dismiss="modal" className='btn'><large>Cancel</large></button>
                    <button type="button" id="confirm-block-user" className='btn'><large>block</large></button>
                </div>
                <span id="block-user-path" url=""></span>
            </div>
        </div>

  <div className="modal" id="delete-message-modal" style={{textAlign:"center"}}>
    <div className="modal-dialog full-width-modal">
        <div className="modal-content full-width-modal">
            <div className="modal-header">
              <h4 className="modal-title">delete</h4>
            </div>
            <br/>
            <button type="button" id="cancel-delete" className='btn' data-dismiss="modal"><large>Cancel</large></button>
            <button type="button" id="confirm-delete-msg" className='btn'><large>delete</large></button>
          </div>
      </div>
        </div>
            </div>
        )
    }
});

export default MbConversations = MbConversations;
