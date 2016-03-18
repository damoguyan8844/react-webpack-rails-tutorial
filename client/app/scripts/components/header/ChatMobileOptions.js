import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import chatActionCreators from '../../actions/ChatActionCreators';
import ReportUser from '../../views/report_user/ReportUser';
import BlockUser from '../../common/dialogs/BlockUser';
import { openReportModal } from '../../actions/ReportUserActionCreators';
import { openBlockUserModal }    from '../../actions/BlockUserActionCreators';
import { injectIntl } from 'react-intl';

const mapStateToProps = (state) => ({
  totalUnreadCount: state.chat.totalUnreadCount,
  isMobileView : state.chat.isMobileView,
  shouldDisplayConversationsPanel : state.chat.shouldDisplayConversationsPanel,
  shouldDisplayMessagesPanel : state.chat.shouldDisplayMessagesPanel
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(Object.assign({},
    chatActionCreators,
    {openReportModal},
    {openBlockUserModal}),
  dispatch)
})

class ChatMobileOptions extends React.Component {
	componentDidMount() {
		const $popover = $('.chat-mobile_options_popover')
    const tap_or_click = 'click';
    //navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) ? 'tap' :

    $('.chat-mobile_options').on(tap_or_click, (e) => {
      e.stopPropagation();
			$popover.slideToggle();
    });
    $('#rb-app').on(tap_or_click, (e) => {
      if ($popover.css('display') === 'block') {
				$popover.slideToggle();
			}
    });

	}

	render () {
		return (
			<div>
				<div
				    className={classNames({
				    	"chat-mobile_options": true,
				    	"hidden": this.props.location.pathname !== '/chat'
				    })}
				>
				    <span className="icon-nav-more-vertical" />
				</div>
				<div
					className="chat-mobile_options_popover popover fade bottom in"
				>
					<div className="arrow" />
					<div className="list-group chat-mobile_option_list">
						{ this.props.shouldDisplayConversationsPanel ?
							<ConversationsViewOptions { ...this.props } /> :
							<MessagesViewOptions { ...this.props } />
						}
					</div>
				</div>
			</div>
		)
	}
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChatMobileOptions));

class ConversationsViewOptions extends React.Component {
	render () {
		return (
			<div>
				<button
					type="button"
					className={classNames({
						"list-group-item":true,
						"chat-mobile_option_item":true,
						"disabled":this.props.totalUnreadCount===0
					})}
					style={{borderBottom: '2px solid #ddd'}}
					onClick={this.props.actions.markAllRead}
				>
		  	  		Mark all as read
	  	  		</button>
			  	<button
			  		type="button"
			  		className="list-group-item chat-mobile_option_item"
			  		onClick={this.props.actions.enableEditMode}
			  	>
			  		Edit mode
		  		</button>
		  	</div>
		)
	}
}

class MessagesViewOptions extends React.Component {

  constructor(props) {
    super(props)
    this.state = { blocked : false }
    this.toggleBlock = this.toggleBlock.bind(this)
  }

  toggleBlock () {
    this.setState({ blocked: !this.state.blocked })
  }

	render () {

		return (
			<div>
				<button
					type="button"
					className="list-group-item chat-mobile_option_item red-text"
					style={{borderBottom: '2px solid #ddd'}}
					onClick={this.props.actions.openBlockUserModal}>
		  	  		Block user
	  	  		</button>
			  	<button
			  		type="button"
			  		className="list-group-item chat-mobile_option_item"
			  		style={{borderBottom: '2px solid #ddd'}}
			  		onClick={this.props.actions.openReportModal}
			  	>
			  		Report user
		  		</button>
			  	<button
			  		type="button"
			  		className="list-group-item chat-mobile_option_item"
			  		onClick={this.props.actions.deleteCurrentConversation}
			  	>
			  		Delete conversation
		  		</button>
		  		<ReportUser targetUserToken={this.props.currentPeerToken} />

		  	</div>
		)
	}
}
