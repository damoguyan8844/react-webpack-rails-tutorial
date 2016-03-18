import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const mapStateToProps = (state) => ({
  chatView: state.chatLite.chatView,
  isDisplayed: state.chatLite.isDisplayed,
  isMobileView: state.chat.isMobileView
})

class ChatLiteView extends React.Component {
  render () {
    const isDisplayed = this.props.isDisplayed;
    const isMobileView = this.props.isMobileView;
    const ChatView = this.props.chatView;
    return (
      <div 
        className={classNames({
          "chat-lite-view-container": true,
          "animated" : true, 
          "slideInRight": true,
          "hidden": !isDisplayed || isMobileView
        })}>
          { ChatView && <ChatView {...this.props} /> }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChatLiteView)