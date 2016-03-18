import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames';

export class ConversationsHeader extends React.Component {
  handleInboxClick() {
    this.props.actions.showInbox()
    this.props.actions.fetchPeersIfNeeded()
  }

  handleOutboxClick() {
    this.props.actions.showOutbox()
    this.props.actions.fetchPeersIfNeeded()
  }
  render () {
    return (
      <div className='convo_panel_heading'>
        <span className='convo_panel_title'>
          Messages
        </span>
        <Button
          className={this.props.isInbox ? 'active' : ''}
          id='show-inbox'
          onClick={this.handleInboxClick.bind(this)}>
            Inbox
        </Button>
        <Button
          className={!this.props.isInbox ? 'active' : ''}
          id='show-outbox'
          onClick={this.handleOutboxClick.bind(this)}>
            Sent
        </Button>
        <div className="chat-lite_close">
          <a className={classNames({
            'icon-button-close': true,
            'chat-lite_button_close': true,
            'hidden': !this.props.isLiteView
          })} onClick={this.props.actions.closeChatPanel} />
        </div>
      </div>
    )
  }
}
