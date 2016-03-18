import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import classNames from 'classnames';

export class ConversationsFooter extends React.Component {
  render () {
    return (
      <div
        className={classNames({
          'convo_footer': true,
          'animated': true,
          'hidden': this.props.isMobileView && !this.props.isEditMode,
          'slideInUp': this.props.isMobileView && this.props.isEditMode
        })}
      >
        <div className="convo_features" style={{display: !this.props.isEditMode ? 'block' : 'none'}}>
          <ButtonGroup className="btn-group-justified">
            <ButtonGroup>
              <Button onClick={this.props.actions.enableEditMode} className="convo_button_edit">Edit</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button className={classNames({
                      "convo_button_mark-all-read": true,
                      "disabled": this.props.totalUnreadCount === 0
                      })}
                      onClick={this.props.actions.markAllRead}>Mark all as read</Button>

            </ButtonGroup>
          </ButtonGroup>
        </div>
        <div className="convo_options" style={{display: this.props.isEditMode ? 'block' : 'none'}}>
          <ButtonGroup className="btn-group-justified">
            <ButtonGroup>
              <Button onClick={this.props.actions.markRead} className="convo_button_mark-read">
                <span className="icon-check-mark"></span>
                Mark read
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button className="convo_button_delete" onClick={this.props.actions.deleteConversations}>
                <span className="icon-trash-can icon-trash-can--modifier"></span>
                Delete
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button className="cancel-button" onClick={this.props.actions.disableEditMode}>
                <span className="icon-close"></span>
                Cancel
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
