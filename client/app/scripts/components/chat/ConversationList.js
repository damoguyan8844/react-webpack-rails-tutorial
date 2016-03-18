import React                  from 'react';
import ReactDOM from 'react-dom'
import { Conversation } from './Conversation'
import perfectScrollbar from 'perfect-scrollbar'

export class ConversationList extends React.Component {

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

  setUpScrollEventListenerForWindow() {
    const reactContext = this;


  }

  setUpScrollEventListenerForConvListWrapper() {
    const reactContext = this;
    $('.convo_list_wrapper').scroll(function(){
      if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 2) {
        reactContext.props.actions.fetchMorePeersIfAny()
      }
    });
  }

  componentDidMount() {
    this.initializePerfectScrollbar();
    this.setUpScrollEventListenerForConvListWrapper();
    this.setUpScrollEventListenerForWindow();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.isMobileView && !nextProps.isMobileView) {
      this.initializePerfectScrollbar();
    }
    if (!this.props.isMobileView && nextProps.isMobileView) {
      this.destroyPerfectScrollbar();
    }
    if (!this.props.shouldDisplayConversationsPanel && nextProps.shouldDisplayConversationsPanel) {
      this.setUpScrollEventListenerForWindow();
    }
    if (this.props.shouldDisplayConversationsPanel && !nextProps.shouldDisplayConversationsPanel) {

    }
  }

  componentDidUpdate() {
    perfectScrollbar.update(ReactDOM.findDOMNode(this))
  }

  render () {
    let peerTokens = this.props.isInbox ? this.props.inbox.peerTokens : this.props.outbox.peerTokens
    let peers = this.props.peers
    peers = peerTokens.map((token) => {
      return (
        <Conversation
          key={token}
          peer={peers[token]}
          myToken={this.props.myToken}
          isActive={this.props.currentPeerToken === token}
          openConversation={this.props.actions.openConversation}
          isLiteView={this.props.isLiteView}
          isEditMode={this.props.isEditMode}
          selectPeer={this.props.actions.selectPeer}
          deselectPeer={this.props.actions.deselectPeer}
        />
      );
    })
    return (

        <div className="convo_list_wrapper">
          <ul className="convo_list list-group">
            {peers}
          </ul>
        </div>
    );
  }
}
