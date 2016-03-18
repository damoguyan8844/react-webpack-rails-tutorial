import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import { MessagesHeader } from './MessagesHeader'
import { MessageList } from './MessageList'
import { MessagesFooter } from './MessagesFooter'
import { NOTIFICATION } from '../../utils/ConstantValues'
import ChatIcon from './ChatIcon'
import classNames from 'classnames';

export class MessagesPanel extends React.Component {
  // static propTypes = {
  //   actions  : React.PropTypes.object,
  //   counter  : React.PropTypes.number
  // }

  render () {
    if (!this.props.currentPeerToken) {
      return (
        <MessagesPanelWrapper {...this.props} >
          <div className="messages_panel-default_wrapper">
            <ChatIcon />

            <div className="messages_panel-default_text">
              You have {this.props.totalUnreadCount > 99 ? NOTIFICATION.INFINITY : this.props.totalUnreadCount} unread message(s).
            </div>
          </div>
        </MessagesPanelWrapper>
      )
    }
    return (
      <MessagesPanelWrapper {...this.props} >
        <MessagesHeader
          history={this.props.history}
          viewProfile={this.props.actions.viewProfile}
          segueToConversationsPanel={this.props.actions.segueToConversationsPanel}
          peers={this.props.peers}
          isMobileView={this.props.isMobileView}
          currentPeerToken={this.props.currentPeerToken}
          shouldSlimConvPanel={this.props.shouldSlimConvPanel}
          blockCurrentUser={this.props.actions.blockCurrentUser}
          openReportModal={this.props.actions.openReportModal}
          closeReportModal={this.props.actions.closeReportModal}
          openBlockUserModal={this.props.actions.openBlockUserModal}
          deleteCurrentConversation={this.props.actions.deleteCurrentConversation}
          intl={this.props.intl}
        />
        <MessageList
          ref='messageList'
          peers={this.props.peers}
          currentPeerToken={this.props.currentPeerToken}
          myToken={this.props.myToken}
          myPhotoURL={this.props.myPhotoURL}
          myVIPStatus={this.props.myVIPStatus}
          isMobileView={this.props.isMobileView}
        />
        <MessagesFooter
          isInputEmpty={this.props.isInputEmpty}
          cleanInput={this.props.actions.cleanInput}
          dirtyInput={this.props.actions.dirtyInput}
          currentPeerToken={this.props.currentPeerToken}
          sendMessage={this.props.actions.sendMessage}
          isMobileView={this.props.isMobileView}
          refs={this.refs}
        />
      </MessagesPanelWrapper>
    );
  }
}

class MessagesPanelWrapper extends React.Component {
  render() {
    return (
      <Col
        md={this.props.isLiteView ? 24 : 14}
        sm={this.props.isLiteView ? 24: 14}
        xs={24}
        className={classNames({
          "messages_panel": true,
          'hidden': !this.props.shouldDisplayMessagesPanel
        })}
        style={{
          height: 'inherit'
        }}
      >
        {this.props.children}
      </Col>
    )
  }
}
