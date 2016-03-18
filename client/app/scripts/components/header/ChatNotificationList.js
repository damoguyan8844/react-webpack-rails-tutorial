import React from 'react';
import { Link } from 'react-router'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import chatActionCreators     from '../../actions/ChatActionCreators';
import { ChatNotification } from './ChatNotification'
import perfectScrollbar from 'perfect-scrollbar'

const mapStateToProps = (state) => ({
  inbox : state.chat.inbox,
  peers : state.chat.peers,
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(chatActionCreators, dispatch)
})

class ChatNotificationList extends React.Component {

  componentWillMount() {
    this.props.actions.initializeChatNotificationList();
  }

  componentDidMount () {
    perfectScrollbar.initialize(document.getElementsByClassName('chat_notification_list_wrapper')[0],
      { suppressScrollX: true }
    )
    $(document).on('ps-scroll-y', function () {
      $( ".ps-container.ps-active-y > .ps-scrollbar-y-rail" ).css( "display", "block" ).delay(1000).fadeOut( "slow" );
    })
  }

  render () {

    const peers = this.props.peers
    const chatNotifications = this.props.inbox.peerTokens.map(function(token){
       return(
          <ChatNotification {...this.props} peer={peers[token]} />
       )
    }.bind(this));
    return (
      <ul className="nav_submenu_messages dropdown_list display_none">
        <div className="chat_notification_list_wrapper">
          {
            chatNotifications.length > 0 ?
            <div className="chat_notification_list">
                {chatNotifications}
            </div>
            :
            <div className="chat_notification_empty">
              No messages yet.
            </div>
          }

        </div>
        <li className="nav_submenu_divider"></li>
        <li>
          <Link to="/chat"
            onClick={this.props.actions.disableChatPanel}
            className="more_event see-all-messages">
            See all messages
          </Link>
        </li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatNotificationList);
