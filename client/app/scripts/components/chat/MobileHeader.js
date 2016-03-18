import React from 'react';
import classNames from 'classnames';
import { MessagesOptions } from './MessagesOptions';

export class MobileHeader extends React.Component {

  viewProfile() {
    this.props.actions.viewProfile(this.props.currentPeerToken, this.props.history)
  }

  render () {
    const currentPeer = this.props.peers[this.props.currentPeerToken] || {}
    return (
      <div className={classNames({
        'hidden': !this.props.shouldSlimConvPanel || !this.props.isLiteView,
        'mobile-header': true
      })}>
        <div className="chat_header_wrapper">
          <div className="chat_back-arrow_wrapper">
              <img src ="/app/images/chat_back_button.png" onClick = {this.props.actions.segueToConversationList}
                className='chat_button_back' />
          </div>
          <div
            className="msg_sender_info"
            onClick = { this.viewProfile.bind(this) }
          >
            <p className="truncate list-group-item-heading sender_name">
              {currentPeer.name}
              <span className="vip-badge label" />
            </p>
            <p className="truncate small list-group-item-text sender_location">
              {currentPeer.location}
            </p>
          </div>
        </div>
        <MessagesOptions {...this.props} />
      </div>
    )
  }
}
