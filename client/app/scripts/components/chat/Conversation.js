import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { checkAndReplaceUrlIfNeeded } from '../../../../utils/chat_utils'
import RBCheckBox from "../../common/RBCheckBox.js";

export class Conversation extends React.Component {
  handleConversationClick(isCheckboxClicked) {
    if(!this.props.isEditMode) {
      this.props.openConversation(this.props.peer.token);
    } else {
      if(!isCheckboxClicked)
        this.refs.convoSelect.checked = !this.refs.convoSelect.checked
      if(this.refs.convoSelect.checked) {
        this.props.selectPeer(this.props.peer.token)
      } else {
        this.props.deselectPeer(this.props.peer.token)
      }
    }
  }

  render () {
    const peer = this.props.peer
    const myToken = this.props.myToken
    const isSenderMe = peer.lastMessage.senderToken === myToken
    const MAX_ABS_MSG_LENGTH = 60
    const lastMsgTime = moment(peer.lastMessage.time).format('MMM Do')
    let abstractMsg = peer.lastMessage.msg.substr(0, MAX_ABS_MSG_LENGTH)
    if (isSenderMe)
      abstractMsg = "Me: " + abstractMsg;
    if (!isSenderMe && peer.locked)
      abstractMsg = 'Conversation is locked.'

    return (
      <li onClick={this.handleConversationClick.bind(this, false)}
        id={peer.token}
        className={classNames({
          'convo': true,
          'list-group-item': true,
          'active': this.props.isActive
        })}>
        <div style={{display: this.props.isEditMode ? 'inline-block' : 'none'}} className='convo_select'>
          <input type="checkbox" className="rb-checkbox convo_checkbox_edit" id={"edit-checkbox-" + peer.token} ref="convoSelect" checked={peer.isSelected} />
          <label className="rb-checkbox-label"></label>
        </div>
        <div className='sender_img-container'>
          <img src={checkAndReplaceUrlIfNeeded(peer.photoURL)} className='img-circle' />
        </div>
        <div className='sender_info truncate'>
          <p className="truncate list-group-item-heading sender_name">
            {peer.name}
            <span
              style={{display: peer.VIP ? 'inline-block' : 'none'}}
              className="vip-badge label label-default">
                VIP
            </span>
          </p>
          <p
            style={{
              fontWeight : peer.numUnread > 0 ? 'bold' : 'normal',
              fontStyle : !isSenderMe && peer.locked ? 'italic' : 'normal'
            }}
            className="truncate small list-group-item-text unread-sender-abstract">
              {abstractMsg}
          </p>
        </div>
        <div className="convo_info">
          <p className="pull-right truncate convo_last-timestamp">{lastMsgTime}</p>
          <span
            style={{
              display: peer.numUnread > 0 ? 'inline-block' : 'none',
              backgroundColor: peer.locked ? '#777777' : '#ee3888'
            }}
            className="pull-right unread-count unread-count_badge">
            {peer.numUnread}
          </span>
          <i
            className="pull-right lock-icon icon-locked text-muted"
            style={{
              display: peer.locked && !this.props.isLiteView ? 'inline-block' : 'none',
              clear: peer.numUnread > 0 ? 'none' : 'right'
            }}>
          </i>
        </div>
      </li>
    )
  }
}
