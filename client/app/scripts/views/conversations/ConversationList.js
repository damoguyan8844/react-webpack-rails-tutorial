var React = require('react');
var ReactDOM = require('react-dom');

var ConversationList = React.createClass({
    checkPeer: function(){

    },
    readPeerMsg: function(peer){
        this.props.onReadPeerMsg(peer);
        console.log(peer);
    },
    render:function() {
        if(this.props.convList == null)
            return(<ul className="mb-convo_list list-group"><p className='no-convo-left'> It's so quiet here... </p></ul>) ;
        var isEdit = this.props.showMsgPanel;
        var convListHtml =  this.props.convList.map(function (peer) {
            var absMsg = peer.lastMessage.msg;
            var cls = "fontWeight:'normal'";
            absMsg = $('<p>' + absMsg + '</p>').text().substr(0,MAX_ABS_MSG_LENGTH);
            if (peer.lastMessage.senderToken === RB.getMe().token)
                absMsg = i18n("me") + absMsg;
            if (peer.numUnread > 0)
                cls = "fontWeight:'bold'";
            if (!(peer.lastMessage.senderToken === RB.getMe().token) && peer.locked)
                cls += "font-style:'italic'";


            return (
                <li className="list-group-item convo" id={peer.token} onClick={this.readPeerMsg.bind(null,peer)}>
                    <div className="convInfo">
                        {
                            this.props.editMode &&
                            <div className="convo_select">
                                <input type="checkbox" name="convo" onCheck = {this.checkPeer } />
                            </div>
                        }
                        <div className="convo-img">
                            <img src={peer.photoURL} className="img-circle" />
                        </div>
                        <div className="sender_info col-md-14 col-sm-10">
                            <p className="truncate list-group-item-heading sender_name">{peer.name}</p>
                            <p className="truncate small list-group-item-text unread-sender-abstract" style={{ cls }}>{absMsg}</p>
                        </div>
                        <div className="convo-suffix">
                            <p className="pull-right truncate convo_last-timestamp">{moment(peer.lastMessage.time).format('MMM Do')}</p>
                            <span className="pull-right unread-count badge"></span>
                            <span className="pull-right lock-icon glyphicon glyphicon-lock text-muted"></span>
                        </div>
                    </div>
                </li>
            )
        }.bind(this));
        return(
            <ul className="mb-convo_list list-group" style={{display: this.props.showMsgPanel?"none":"" }}>{convListHtml}</ul>

        )
    }
});



export default ConversationList = ConversationList;
