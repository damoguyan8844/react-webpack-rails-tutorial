require('../../styles/views/Chat.scss');

import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import chatActionCreators     from '../../actions/ChatActionCreators';
import chatLiteActionCreators from '../../actions/ChatLiteActionCreators';
import { ConversationsPanel } from '../../components/chat/ConversationsPanel';
import { MessagesPanel }      from '../../components/chat/MessagesPanel';
import classNames             from 'classnames';
import { MobileHeader }       from '../../components/chat/MobileHeader'
import { viewProfile }        from '../../actions/UserActionCreators.js';
import { openReportModal }    from '../../actions/ReportUserActionCreators';
import { openBlockUserModal }    from '../../actions/BlockUserActionCreators';
import { injectIntl }         from 'react-intl';

const mapStateToProps = (state) => ({
  inbox : state.chat.inbox,
  outbox : state.chat.outbox,
  isInbox : state.chat.isInbox,
  currentPeerToken : state.chat.currentPeerToken,
  isMobileView : state.chat.isMobileView,
  isEditMode : state.chat.isEditMode,
  peers : state.chat.peers,
  shouldSlimConvPanel : state.chat.shouldSlimConvPanel,
  isInputEmpty : state.chat.isInputEmpty,
  mobileHeaderHeight : state.chat.mobileHeaderHeight,
  windowHeight : state.chat.windowHeight,
  myToken : state.me.overview.token,
  myVIPStatus: state.me.overview.isVIP,
  myPhotoURL : state.me.overview.mainPhoto.small_image_url,
  isLiteView : state.chat.isLiteView,
  totalUnreadCount: state.chat.totalUnreadCount,
  shouldDisplayMessagesPanel: state.chat.shouldDisplayMessagesPanel,
  shouldDisplayConversationsPanel: state.chat.shouldDisplayConversationsPanel
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(Object.assign({},
    chatActionCreators,
    chatLiteActionCreators,
    {viewProfile},
    {openReportModal},
    {openBlockUserModal}),
  dispatch)
})

const MOBILE_NAV_BAR_HEIGHT = 40;
const DESKTOP_NAV_BAR_HEIGHT = 60;
const MOBILE_BREAKPOINT = 768;
const MIN_HEIGHT = 500;

class ChatView extends React.Component {
  componentWillMount () {
    window.onresize = () => {
      if (window.innerHeight > MIN_HEIGHT) {
        this.props.actions.setWindowHeight(window.innerHeight)
      } else {
        this.props.actions.setWindowHeight(MIN_HEIGHT)
      }

      if (window.innerWidth <= MOBILE_BREAKPOINT && !this.props.isMobileView) {
        this.props.actions.enableMobileView()
      }
      if (window.innerWidth > MOBILE_BREAKPOINT && this.props.isMobileView) {
        this.props.actions.disableMobileView()
      }
    }

    window.addEventListener('resize', window.onresize);
    window.onresize.apply(window);

  }

  componentWillUnmount() {
    window.removeEventListener('resize', window.onresize)
    this.props.actions.cleanUpChat();
    if (!this.props.isMobileView)
      $('.rb-footer').show();
    window.isChatPage = undefined;
  }

  componentDidMount() {
    if (this.props.location.pathname.indexOf("/chat") > -1) {
      this.props.actions.initializeChatPageView(this.props.params.token);
      $('.rb-footer').hide();
      window.isChatPage = true;
    }
    //$('.rb-body-wrap').css('min-height', 0)
  }

  render () {
    const isMobileView = this.props.isMobileView
    const isLiteView = this.props.isLiteView
    const navBarHeight = isMobileView && !isLiteView ? MOBILE_NAV_BAR_HEIGHT : DESKTOP_NAV_BAR_HEIGHT;
    const windowHeight = this.props.windowHeight - navBarHeight

    return (
      <div
        className={classNames({
          'chat-view-container': true,
          'chat-mobile-view-container': isMobileView,
        })}
        style={{
          height: windowHeight
        }}
      >
        <MobileHeader {...this.props} />
        <div className='chat-view' style={{height: windowHeight - this.props.mobileHeaderHeight}}>
          <ConversationsPanel {...this.props}/>
          <MessagesPanel {...this.props} />
        </div>
      </div>
    );
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChatView));
