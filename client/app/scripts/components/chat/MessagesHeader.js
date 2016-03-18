import React from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import { checkAndReplaceUrlIfNeeded } from '../../../../utils/chat_utils';
// import { ReportUserModal } from '../../common/ReportUserModal';
import ReportUser from '../../views/report_user/ReportUser';
import BlockUser from '../../common/dialogs/BlockUser';
import { History } from 'react-router';
import { MessagesOptions } from './MessagesOptions'

export class MessagesHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = { blocked : false }
    this.toggleBlock = this.toggleBlock.bind(this)
  }

  viewProfile() {
    this.props.viewProfile(this.props.currentPeerToken, this.props.history)
  }

  toggleBlock () {
    this.setState({ blocked: !this.state.blocked })
  }

  render () {
    const currentPeer = this.props.peers[this.props.currentPeerToken] || {}
    return (
      <div className="chat_header">
      {
        this.props.isMobileView &&
        <div className="chat_back-arrow_wrapper">
            <i
              onClick={this.props.segueToConversationsPanel}
              className='chat_button_back icon-photo-arrow-left'
            />
        </div>
      }
        <div className="sender_photo">
          <img className="img-circle" src={checkAndReplaceUrlIfNeeded(currentPeer.photoURL)} />
          <div className="chat_online-indicator" />
        </div>
        <div className="msg_sender_info" onClick={this.viewProfile.bind(this)}>
          <p className="truncate list-group-item-heading sender_name">
            {currentPeer.name}
            <span className="vip-badge label"></span>
          </p>
          <p className="truncate small list-group-item-text sender_location">
            {currentPeer.location}
          </p>
        </div>
        <MessagesOptions {...this.props} blocked={this.state.blocked} />
        <ReportUser targetUserToken={this.props.currentPeerToken} />
        <BlockUser user={currentPeer} blocked={this.state.blocked} toggleBlock={this.toggleBlock} />
      </div>
    )
  }
}
