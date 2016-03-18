import React from 'react';
import classNames from 'classnames';
import { checkAndReplaceUrlIfNeeded } from '../../../../utils/chat_utils'
import Sanitize from '../../utils/Sanitize'

export class ChatNotification extends React.Component {

  handleClick() {
    //if (document.getElementsByClassName('chat-view').length < 2) {
      if(!window.isChatPage) {
        this.props.actions.openChatPanelFromNotification(this.props.peer.token)
      }
      else {
        this.props.actions.switchChatConvoFromNotification(this.props.peer.token)
      }
    //}
  }

  render() {
    const peer = this.props.peer
    const name = peer.name
    const time = moment(peer.lastMessage.time).format('MMM Do')
    const photoURL = checkAndReplaceUrlIfNeeded(peer.photoURL)
    const content = peer.locked ? "Conversation is locked." : peer.lastMessage.msg

    return (
        <div onClick={this.handleClick.bind(this)} key={name} >
          <a className="" type="button" >
            <div className="chat_notification">
              <img className="chat_peer_photo" src={photoURL} />
              <span className="message_time">{time}</span>
              <div className="chat_peer_name">
                {name}
                <div className={classNames({
                  "unread-indicator": true,
                  "hidden": peer.numUnread === 0
                })}></div>
              </div>
              <div
                className="message_content truncate"
                style={{
                  fontStyle: peer.locked ? 'italic' : 'normal'
                }}
                dangerouslySetInnerHTML={{__html: Sanitize(content) }}
              />
            </div>
          </a>
        </div>
   )
  }
}
