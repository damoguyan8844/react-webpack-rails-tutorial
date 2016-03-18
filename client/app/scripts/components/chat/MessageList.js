import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from './Message'
import perfectScrollbar from 'perfect-scrollbar'
import IE from '../../utils/ieChecker.js'
import { HEADER, CHAT } from '../../utils/ConstantValues'

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export class MessageList extends React.Component {
  initializePerfectScrollbar() {
    perfectScrollbar.initialize(ReactDOM.findDOMNode(this),
      { suppressScrollX: true }
    );
    $(document).on('ps-scroll-y', function () {
      $( ".ps-container.ps-active-y > .ps-scrollbar-y-rail" ).css( "display", "block" ).delay(1000).fadeOut( "slow" );
    });
  }

  destroyPerfectScrollbar() {
    perfectScrollbar.destroy(ReactDOM.findDOMNode(this));
  }

  scrollToBottom() {
    const newMessageList = this.refs.messageList;
    const messageListWrapper = ReactDOM.findDOMNode(this)
    if (this.oldMessageListHeight !== newMessageList.clientHeight) {
      // scroll to bottom
      messageListWrapper.scrollTop = messageListWrapper.scrollHeight
      this.oldMessageListHeight = newMessageList.clientHeight;

      perfectScrollbar.update(messageListWrapper)
    }
  }

  adjustMessageListHeight ( isListenerInitialized ) {
    const windowsHeight = RB.viewport().height
    const chatHeader = window.isChatPage ? CHAT.FULL_VIEW.HEADER : CHAT.LITE_VIEW.HEADER;
    const messageListHeight = windowsHeight - ( HEADER.HEIGHT + chatHeader + CHAT.LITE_VIEW.INPUT);
    $('.message_list_wrapper').css("height", messageListHeight);
    if(!isListenerInitialized) {
      RB.addResizeListener(this.adjustMessageListHeight.bind(this, true))
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount () {
    RB.removeResizeListener(this.adjustMessageListHeight);
  }

  componentDidMount () {
    this.initializePerfectScrollbar();
    if (IE.isTheBrowser && IE.actualVersion === "10") {
      this.adjustMessageListHeight(false);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.isMobileView && !nextProps.isMobileView) {
      this.initializePerfectScrollbar()
    }
    if (!this.props.isMobileView && nextProps.isMobileView) {
      this.destroyPerfectScrollbar()
    }
  }

  render () {
    const currentPeer = this.props.peers[this.props.currentPeerToken]

    let messages = currentPeer && currentPeer.messages ? currentPeer.messages : []
    // Array.reverse doesn't seem to work so I have to use this hack
    let reversedMessages = []
    let isDividerAdded = false
    let dividerIndex = -1
    let lastMessageDay
    let isSameDay
    let msg

    for(let i = messages.length-1; i >=0; i--) {
      msg = messages[i]

      isSameDay = ( moment(msg.time).format('MMM DD, YYYY') == lastMessageDay )
      if(!isSameDay) lastMessageDay = moment(msg.time).format('MMM DD, YYYY')
      //To track the VIP divider placement
      var reversedIndex = (messages.length-1) - i

      if (currentPeer.locked && !messages[reversedIndex].locked && !isDividerAdded) {
        dividerIndex = messages.length-1 - reversedIndex
        isDividerAdded = true
      }

      reversedMessages.push(<Message
                              key={msg.time}
                              msg={msg}
                              currentPeer={currentPeer}
                              myToken={this.props.myToken}
                              myPhotoURL={this.props.myPhotoURL}
                              addVIPDivider={i == dividerIndex}
                              addDateDivider={!isSameDay}
                              myVIPStatus = {this.props.myVIPStatus}
                              isPeeriOS = {currentPeer.hasPushNotificationDevice}
                            />)
    }

    return (
      <div className='message_list_wrapper' >
        <div ref='messageList' className='message_list'>
          {reversedMessages}
        </div>
      </div>
    )
  }
}
