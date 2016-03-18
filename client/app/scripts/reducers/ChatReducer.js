import Constants from '../actions/Constants';
import fakeState from '../store/fakeState';
import initialChatState from '../store/initialChatState';

function removePeerToken(state, token) {
	let inboxTokens = state.inbox.peerTokens.slice(),
		outboxTokens = state.outbox.peerTokens.slice(),
		index
	if ((index = inboxTokens.indexOf(token)) > -1) {
		inboxTokens.splice(index, 1)
		return ['inbox', inboxTokens]
	} else if ((index = outboxTokens.indexOf(token)) > -1) {
		outboxTokens.splice(index, 1)
		return ['outbox', outboxTokens]
	} else {
		return ['inbox', inboxTokens]
	}
}

function shiftPeerToStartOfPeerList(peerTokens, token) {
	let updatedPeerTokens = peerTokens.slice();
	const index = updatedPeerTokens.indexOf(token);
	if (index > -1) {
		updatedPeerTokens.splice(index, 1);
	}
	updatedPeerTokens.unshift(token);
	return updatedPeerTokens;
}

function prependMessages(messages = [], message) {
	const newMessages = messages.slice(0);
	if (newMessages.length === 0 || newMessages[0].msgId !== message.msgId) {
		newMessages.unshift(message);
	}
	return newMessages;
}

export default function ChatReducer(state = initialChatState, action) {
	switch(action.type) {
		case Constants.CHAT.SHOW_INBOX:
			return Object.assign({}, state, {
				isInbox: true
			});
		case Constants.CHAT.SHOW_OUTBOX:
			return Object.assign({}, state, {
				isInbox: false
			});
		case Constants.CHAT.DISABLE_MOBILE_VIEW:
			return Object.assign({}, state, {
				isMobileView: false,
				shouldDisplayMessagesPanel: true,
				shouldDisplayConversationsPanel: true,
			});
		case Constants.CHAT.ENABLE_MOBILE_VIEW:
			return Object.assign({}, state, {
				isMobileView: true,
			});
		case Constants.CHAT.ENABLE_EDIT_MODE:
			return Object.assign({}, state, {
				isEditMode: true
			});
		case Constants.CHAT.DISABLE_EDIT_MODE:
			return Object.assign({}, state, {
				isEditMode: false
			});
		case Constants.CHAT.SET_CURRENT_PEER:
			return Object.assign({}, state, {
				currentPeerToken: action.currentPeerToken
			});
		case Constants.CHAT.SLIM_CONVERSATION_PANEL:
			return Object.assign({}, state, {
				shouldSlimConvPanel: true,
				mobileHeaderHeight: 55,
				shouldDisplayMessagesPanel: true
			});
		case Constants.CHAT.FATTEN_CONVERSATION_PANEL:
			return Object.assign({}, state, {
				shouldSlimConvPanel: false,
				shouldDisplayMessagesPanel: false,
				mobileHeaderHeight: 0
			});
		case Constants.CHAT.CLEAN_INPUT:
			return Object.assign({}, state, {
				isInputEmpty: true
			});
		case Constants.CHAT.DIRTY_INPUT:
			return Object.assign({}, state, {
				isInputEmpty: false
			});
		case Constants.CHAT.REQUEST_INBOX_PEERS:
			return Object.assign({}, state, {
				inbox: Object.assign({}, state.inbox, {
					isFetchingPeers: true
				})
			});
		case Constants.CHAT.REQUEST_OUTBOX_PEERS:
			return Object.assign({}, state, {
				outbox: Object.assign({}, state.outbox, {
					isFetchingPeers: true
				})
			});
		case Constants.CHAT.RECEIVE_INBOX_PEERS:
			return Object.assign({}, state, {
				inbox: Object.assign({}, state.inbox, {
					isFetchingPeers: false,
					peerTokens: state.inbox.peerTokens.concat(action.peerTokens),
					nextSeq: action.nextSeq,
					noMore: action.noMore
				}),
				peers: Object.assign({}, state.peers, action.peers)
			});
		case Constants.CHAT.RECEIVE_OUTBOX_PEERS:
			return Object.assign({}, state, {
				outbox: Object.assign({}, state.outbox, {
					isFetchingPeers: false,
					peerTokens: state.outbox.peerTokens.concat(action.peerTokens),
					nextSeq: action.nextSeq,
					noMore: action.noMore
				}),
				peers: Object.assign({}, state.peers, action.peers)
			});
		case Constants.CHAT.REQUEST_MESSAGES:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						isFetchingMessages: true
					})
				})
			});
		case Constants.CHAT.RECEIVE_MESSAGES:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						isFetchingMessages: false,
						messages: action.messages
					})
				})
			});
		case Constants.CHAT.RECEIVE_MESSAGE:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						messages: prependMessages(state.peers[action.peerToken].messages, action.message)
					})
				})
			});
		case Constants.CHAT.CLEAR_UNREAD_COUNT:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						numUnread: 0
					})
				})
			});
		case Constants.CHAT.SEND_MESSAGE_REQUEST:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						isSendingMessage: true,
					})
				})
			});
		case Constants.CHAT.SEND_MESSAGE_SUCCESS:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						isSendingMessage: false,
						messages: prependMessages(state.peers[action.peerToken].messages, action.message)
					})
				})
			});
		case Constants.CHAT.SELECT_PEER:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						isSelected: true
					})
				})
			});
		case Constants.CHAT.DESELECT_PEER:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerToken]: Object.assign({}, state.peers[action.peerToken], {
						isSelected: false
					})
				})
			});
		case Constants.CHAT.ADD_PEER_TO_STATE:
			return Object.assign({}, state, {
				peers: Object.assign({}, state.peers, {
					[action.peerData.token]: Object.assign({},
						state.peers[action.peerData.token],
						action.peerData)
				})
			});
		case Constants.CHAT.REMOVE_PEER:
			let msgbox, remainingPeerTokens;
			[msgbox, remainingPeerTokens] = removePeerToken(state, action.peerToken)
			return Object.assign({}, state, {
				[msgbox]: Object.assign({}, state[msgbox], {
					peerTokens: remainingPeerTokens
				})
			});
		case Constants.CHAT.SHIFT_PEER_TO_TOP:
			let peerTokens = state.isInbox ? state.inbox.peerTokens : state.outbox.peerTokens;
			msgbox = state.isInbox ? 'inbox' : 'outbox';
			let updatedPeerTokens = shiftPeerToStartOfPeerList(peerTokens, action.peerToken);
			return Object.assign({}, state, {
				[msgbox]: Object.assign({}, state[msgbox], {
					peerTokens: updatedPeerTokens
				})
			});
		case Constants.CHAT.SHIFT_PEER_TO_TOP_OF_INBOX:
			peerTokens = state.inbox.peerTokens;
			updatedPeerTokens = shiftPeerToStartOfPeerList(peerTokens, action.peerToken);
			return Object.assign({}, state, {
				inbox: Object.assign({}, state.inbox, {
					peerTokens: updatedPeerTokens
				})
			});
		case Constants.CHAT.ENABLE_LITE_VIEW:
			return Object.assign({}, state, {
				isLiteView: true,
			});
		case Constants.CHAT.DISABLE_LITE_VIEW:
			return Object.assign({}, state, {
				isLiteView: false,
				mobileHeaderHeight: 0
			});
		case Constants.CHAT.SET_WINDOW_HEIGHT:
			return Object.assign({}, state, {
				windowHeight: action.windowHeight
			});
		case Constants.CHAT.SET_TOTAL_UNREAD_COUNT:
			return Object.assign({}, state, {
				totalUnreadCount: action.totalUnreadCount
			});
		case Constants.CHAT.CLEAR_CURRENT_PEER:
			return Object.assign({}, state, {
				currentPeerToken: undefined
			});
		case Constants.CHAT.DISPLAY_CONVERSATIONS_PANEL:
			return Object.assign({}, state, {
				shouldDisplayConversationsPanel: true
			});
		case Constants.CHAT.HIDE_CONVERSATIONS_PANEL:
			return Object.assign({}, state, {
				shouldDisplayConversationsPanel: false
			});
		case Constants.CHAT.DISPLAY_MESSAGES_PANEL:
			return Object.assign({}, state, {
				shouldDisplayMessagesPanel: true
			});
		case Constants.CHAT.HIDE_MESSAGES_PANEL:
			return Object.assign({}, state, {
				shouldDisplayMessagesPanel: false
			});
		default:
			return state;
	}
}
