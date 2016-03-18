import { loadLiteView,showLiteView, hideLiteView } from './ChatLiteActionCreators';
import Constants from './Constants.js'
import axios from 'axios'
import RBNotify from '../common/notification/RBNotify.js';
import RBService from '../services/RBService';
import User from '../models/User';

const CONV_FILTER_RECEIVED = 1
const CONV_FILTER_NOT_RECEIVED = 2

const CHAT_API_PREFIX = '/api/v2/chat'

function requestInboxPeers() {
	return { type: Constants.CHAT.REQUEST_INBOX_PEERS }
}

function requestOutboxPeers() {
	return { type: Constants.CHAT.REQUEST_OUTBOX_PEERS }
}

function requestMessages(peerToken) {
	return { type: Constants.CHAT.REQUEST_MESSAGES, peerToken: peerToken }
}

function receiveInboxPeers(peers, peerTokens, nextSeq, noMore) {
	return {
  		type: Constants.CHAT.RECEIVE_INBOX_PEERS,
  		peers: peers,
  		peerTokens: peerTokens,
  		nextSeq: nextSeq,
  		noMore: noMore
  	}
}

function receiveOutboxPeers(peers, peerTokens, nextSeq, noMore) {
	return {
  		type: Constants.CHAT.RECEIVE_OUTBOX_PEERS,
  		peers: peers,
  		peerTokens: peerTokens,
  		nextSeq: nextSeq,
  		noMore: noMore
  	}
}

function receiveMessages(messages, peerToken) {
	return {
		type: Constants.CHAT.RECEIVE_MESSAGES,
		peerToken: peerToken,
		messages: messages
	}
}

function receiveMessage(message) {
	return (dispatch, getState) => {
		const state = getState();
		const currentPeerToken = state.chat.currentPeerToken;
		const myToken = state.me.overview.token;
		const isSenderMe = message.senderToken === myToken
		const peerToken =  !isSenderMe ? message.senderToken : message.receiverToken

		dispatch({
			type: Constants.CHAT.RECEIVE_MESSAGE,
			peerToken: peerToken,
			message: message
		});
		dispatch(fetchTotalUnreadCount());
		return dispatch(fetchPeer(peerToken)).then(() => {
			dispatch(shiftPeerToTopOfInbox(peerToken));
			// scrollConvListToTop();
			const peer = getState().chat.peers[peerToken];
			const content = message.msg;

			if (!isSenderMe && !window.isChatPage) {
				RBNotify.notify('message', {
					title: "New message!",
					userName: peer.name,
					message: content,
					locked: peer.locked,
					avatarUrl: peer.photoURL,
					onClickAction: () => {
						dispatch(openChatPanelFromNotification(peerToken))
					}
				});
			}
			const currentPeerToken = getState().chat.currentPeerToken
			if (currentPeerToken && currentPeerToken === peerToken) {
				sendReadRequest(myToken, {tokens: [peerToken]}).then((status)=>{
					if (status !== 200) {
						return;
					}
					dispatch(clearUnreadCount(peerToken));
					dispatch(fetchTotalUnreadCount());
				});
			}
		})
	}
}

function clearUnreadCount(peerToken) {
	return {
		type: Constants.CHAT.CLEAR_UNREAD_COUNT,
		peerToken: peerToken
	}
}

function sendMessageRequest(peerToken) {
	return {
		type: Constants.CHAT.SEND_MESSAGE_REQUEST,
		peerToken: peerToken
	}
}

function sendMessageSuccess(message, peerToken) {
	return {
		type: Constants.CHAT.SEND_MESSAGE_SUCCESS,
		peerToken: peerToken,
		message: message
	}
}

function fetchPeersIfNeeded() {
	return (dispatch, getState) => {
	  	if (shouldFetchPeers(getState)) {
	  		return dispatch(fetchPeers(getState()))
	  	} else {
	  		return Promise.resolve()
	  	}
	}
}

function fetchMorePeersIfAny() {
	return (dispatch, getState) => {
		if (shouldFetchMorePeers(getState)) {
			return dispatch(fetchPeers(getState()))
		} else {
			return Promise.resolve()
		}
	}
}

function shouldFetchMorePeers(getState) {
	const state = getState()
	const msgbox = state.chat.isInbox ? state.chat.inbox : state.chat.outbox
	if (msgbox.noMore || msgbox.isFetchingPeers) {
		return false
	} else {
		return true
	}
}

function shouldFetchPeers(getState) {
	const state = getState()
	const msgbox = state.chat.isInbox ? state.chat.inbox : state.chat.outbox
	if (msgbox.isFetchingPeers) {
		return false
	} else if (msgbox.peerTokens.length === 0) {
		return true
	} else {
		return false
	}
}

function fetchPeers(state) {
	const isInbox = state.chat.isInbox
	const peerType = isInbox ? 'inbox' : 'outbox'
	const filter = isInbox ? CONV_FILTER_RECEIVED : CONV_FILTER_NOT_RECEIVED
	const requestPeers = isInbox ? requestInboxPeers : requestOutboxPeers
	const receivePeers = isInbox ? receiveInboxPeers : receiveOutboxPeers
	return (dispatch, getState) => {
		dispatch(requestPeers())
		const myToken = state.me.overview.token
		const lang = state.me.overview.locale
		const currentPeerToken = state.chat.currentPeerToken
		const nextSeq = state.chat[peerType].nextSeq
		let queryString = `${CHAT_API_PREFIX}/getPeers/${myToken}?filter=${filter}&lang=${lang}`
		if (nextSeq) {
			queryString += `&maxSeq=${nextSeq}`
		}
		return axios(queryString)
			.then(response => response.data)
			.then(data => {
				if (!data.result) {
					throw { message: "No peers" }
				}
				return data.result;
			})
			.then(result => {
				const peers = result.peers
				const nextSeq = result.nextSeq
				const noMore = result.noMore
				const peerTokens = peers.map((peer) => peer.token)
				let peersState = state.chat.peers

				for (var i=0; i<peers.length; i++) {
					peersState[peers[i].token] = Object.assign({}, peersState[peers[i].token], peers[i])
				}
				dispatch(receivePeers(peersState, peerTokens, nextSeq, noMore))
				// if (!currentPeerToken) {
				// 	dispatch(setCurrentPeer(peers[0].token))
				// 	dispatch(fetchMessages(getState()))
				// }
			})
			.catch((error) => {
				console.log("Problem with fetching peers: " + error.message)
				// dispatch failedAction if needed in the future
			})
	}
}

function determinePeerType(peerToken) {
	return (dispatch, getState) => {
		const state = getState()
		const myToken = state.me.overview.token
		return axios(`${CHAT_API_PREFIX}/getPeer/${myToken}?token=${peerToken}`)
			.then(response => response.data.result)
			.then(result => {
				if (result && result.peer && result.peer.numReceived > 0) {
					dispatch(showInbox())
				} else {
					dispatch(showOutbox())
				}
			})
			// .catch((error) => {
			// 	console.log("Problem with determinePeerType action: " + error.message)
			// })
	}
}

function addPeerToStateIfNeeded(peerData) {
	return (dispatch, getState) => {
		const peers = getState().chat.peers
		if (!(peerData.token in peers)) {
			return dispatch(addPeerToState(peerData))
		} else {
			return Promise.resolve()
		}
	}
}

function addPeerToState(peerData) {
	return { type: Constants.CHAT.ADD_PEER_TO_STATE, peerData: peerData }
}

function fetchPeer(peerToken) {
	return (dispatch, getState) => {
		const myToken = getState().me.overview.token
		return axios(`${CHAT_API_PREFIX}/getPeer/${myToken}?token=${peerToken}`)
			.then(response => response.data.result)
			.then(result => {
				if (result && result.peer) {
					dispatch(addPeerToState(result.peer))
				}
			})
			// .catch((error) => {
			// 	console.log("Problem with fetchPeer action: " + error.message)
			// })
	}
}

function fetchPeerIfNeeded(token) {
	return (dispatch, getState) => {
		const peers = getState().chat.peers;
		if (peers[token] && (peers[token].lastMessage)) {
			return Promise.resolve();
		} else {
			return dispatch(fetchPeer(token, getState()));
		}
	}
}

function fetchMessagesIfNeeded() {
	return (dispatch, getState) => {
  		if (shouldFetchMessages(getState())) {
  			return dispatch(fetchMessages(getState()))
  		}
  	}
}

function shouldFetchMessages(state) {
	const currentPeerToken = state.chat.currentPeerToken
	const peer = state.chat.peers[currentPeerToken]
	if (!currentPeerToken) {
		return false
	} else if (peer && !peer.messages) {
		return true
	} else {
		return false
	}
}

function fetchMessages(peerToken) {
	return (dispatch, getState) => {
		const state = getState()
		const myToken = state.me.overview.token
		const lang = state.me.overview.locale
		const currentPeerToken = state.chat.currentPeerToken
		dispatch(requestMessages(peerToken))
		return axios(`${CHAT_API_PREFIX}/getMessages/${myToken}?token=${peerToken}&lang=${lang}`)
			.then(response => response.data.result.messages)
			.then(messages => {
				dispatch(receiveMessages(messages, peerToken))
				if (currentPeerToken === peerToken) {
					dispatch(clearUnreadCount(peerToken))
					dispatch(fetchTotalUnreadCount())
				}

			})
			// .catch((error) => {
			// 	console.log("Problem with fetching messages: " + error.message)
			// })
	}

}

function sendMessage(message, token) {
	return (dispatch, getState) => {
		const state = getState()
		const peerToken = token ? token : getState().chat.currentPeerToken
		const peer = state.chat.peers[peerToken]
		const myToken = state.me.overview.token
		const lang = state.me.overview.locale
		const data = {
			token: peerToken,
			msg: message
		}

		if (peer && peer.isSendingMessage) return Promise.resolve();

		dispatch(sendMessageRequest(peerToken))
		return axios.post(`${CHAT_API_PREFIX}/sendMessage/${myToken}`, data)
			.then(response => response.data)
			.then(data => {
				if (!(data.status === 201 || data.status === 200)) {
					throw { message : 'Message failed to send' }
				}
				return data.result.message
			})
			.then(message => {
				dispatch(sendMessageSuccess(message, peerToken))
				dispatch(fetchPeer(peerToken))
					.then(() => dispatch(shiftPeerToTop(peerToken)))
					.then(() => $('.convo_list_wrapper').animate({ scrollTop: 0}, 'slow'))
			})
			// .catch((error) => {
			// 	console.log("Problem with sending messages: " + error.message)
			// })
	}

}

function shiftPeerToTop(token) {
	return { type: Constants.CHAT.SHIFT_PEER_TO_TOP, peerToken: token }
}

function shiftPeerToTopOfInbox(token) {
	return { type: Constants.CHAT.SHIFT_PEER_TO_TOP_OF_INBOX, peerToken: token }
}

function disableEditMode() {
	return { type: Constants.CHAT.DISABLE_EDIT_MODE }
}

function deselectPeer(peerToken) {
	return { type: Constants.CHAT.DESELECT_PEER, peerToken: peerToken }
}

function removePeer(peerToken) {
	return { type: Constants.CHAT.REMOVE_PEER, peerToken: peerToken }
}

function markAllRead() {
	return (dispatch, getState) => {
		const state = getState()
		if (!state.chat.totalUnreadCount) return Promise.resolve()
		const myToken = state.me.overview.token
		const peers = state.chat.peers
		let peerTokens = []
		for (let token in peers) {
			if (peers[token].numUnread > 0) {
				peerTokens.push(token)
			}
		}
		return axios.post(`${CHAT_API_PREFIX}/readAll/${myToken}`)
			.then(response => response.data.status)
			.then(status => {
				if (status === 200) {
					for (let i = 0; i < peerTokens.length; i++) {
						dispatch(clearUnreadCount(peerTokens[i]))
					}
					dispatch(fetchTotalUnreadCount())
				} else {
					throw { message : 'Mark all read not successful' }
				}
			})
			// .catch((error) => {
			// 	console.log("Problem with mark read: " + error.message)
			// })
	}
}

function markRead() {
	return (dispatch, getState) => {
		const state = getState()
		const myToken = state.me.overview.token
		const peers = state.chat.peers
		let peerTokens = []
		for (let token in peers) {
			if (peers[token].isSelected) {
				peerTokens.push(token)
			}
		}
		const data = { tokens: peerTokens }
		return sendReadRequest(myToken, data).then(status => {
				if (status === 200) {
					for (let i = 0; i < peerTokens.length; i++) {
						dispatch(deselectPeer(peerTokens[i]))
						dispatch(clearUnreadCount(peerTokens[i]))
					}
					dispatch(disableEditMode())
				} else {
					throw { message : 'Mark read not successful' }
				}
			})
			// .catch((error) => {
			// 	console.log("Problem with mark read: " + error.message)
			// })
	}
}



function sendReadRequest(myToken, data) {
	return axios.post(`${CHAT_API_PREFIX}/read/${myToken}`, data)
		.then(response => response.data.status)
}



function setNewCurrentPeer(getState, dispatch) {
	return (dispatch, getState) => {
		const state = getState()
		const peerTokens = state.chat.isInbox ?
			state.chat.inbox.peerTokens :
			state.chat.outbox.peerTokens

		if (peerTokens.length > 0) {
			dispatch(setCurrentPeer(peerTokens[0]))
			dispatch(fetchMessages(peertokens[0]))
		} else {
			dispatch(setCurrentPeer(undefined))
		}
	}

}

function deleteConversations() {
	return (dispatch, getState) => {
		const state = getState()
		const myToken = state.me.overview.token
		const peers = state.chat.peers
		let peerTokens = []
		for (let token in peers) {
			if (peers[token].isSelected) {
				peerTokens.push(token)
			}
		}
		const data = { tokens: peerTokens }
		return axios.post(`${CHAT_API_PREFIX}/delete/${myToken}`, data)
			.then(response => response.data.status)
			.then(status => {
				if (status === 200) {
					for (let i = 0; i < peerTokens.length; i++) {
						dispatch(deselectPeer(peerTokens[i]))
						dispatch(removePeer(peerTokens[i]))
					}
					dispatch(disableEditMode())
				} else {
					throw { message : 'Delete conversation not successful' }
				}
				dispatch(fetchTotalUnreadCount())
				dispatch(clearCurrentPeer())
			})
			// .catch((error) => {
			// 	console.log("Problem with delete conversation: " + error.message)
			// })
	}
}

function deleteCurrentConversation() {
	return (dispatch, getState) => {
		const state = getState()
		const currentPeerToken = state.chat.currentPeerToken
		const myToken = state.me.overview.token
		const data = { tokens: [currentPeerToken] }
		return axios.post(`${CHAT_API_PREFIX}/delete/${myToken}`, data)
			.then(response => response.data.status)
			.then(status => {
				if (status === 200) {
					dispatch(removePeer(currentPeerToken));
					dispatch(clearCurrentPeer());
					if (state.chat.isMobileView)
						dispatch(segueToConversationsPanel());
				} else {
					throw { message : 'Delete current conversation not successful' }
				}
				dispatch(fetchTotalUnreadCount())
				dispatch(clearCurrentPeer())
			})
			// .catch((error) => {
			// 	console.log("Problem with delete current conversation: " + error.message)
			// })
	}
}

function blockCurrentUser(intl) {
	return (dispatch, getState) => {
		const state = getState()
		const currentPeerToken = state.chat.currentPeerToken
		const peer = state.chat.peers[currentPeerToken]
		const data = { blocked_id: currentPeerToken }
		return axios.post(`/en/api/v2/blockings`, data)
			.then(response => {
				if (response.status === 200) {
	                const msg = intl.formatMessage({
	                	id:'common.name_has_been_blocked'},
	                	{name: peer.name});
	                RBNotify.notify('simple', {title: msg});

					dispatch(removePeer(currentPeerToken));
	                dispatch(clearCurrentPeer());
	                if (state.chat.isMobileView)
	                	dispatch(segueToConversationsPanel());
				} else {
					throw { message : 'Unsuccessful block' }
				}
			})
			// .catch((error) => {
			// 	console.log("Problem with block user: " + error.message)
			// })
	}
}

function setCurrentPeer(peerToken) {
	return { type : Constants.CHAT.SET_CURRENT_PEER, currentPeerToken : peerToken }
}

function scrollConvListToTop() {
	const convList = $('.convo_list_wrapper')[0]
	if (convList) convList.scrollTop = 0;
}

function showMsgbox(action) {
	return (dispatch, getState) => {
		dispatch(action);
		scrollConvListToTop();
	}
}

function showInbox() {
	return showMsgbox({ type : Constants.CHAT.SHOW_INBOX });
}

function showOutbox() {
	return showMsgbox({ type : Constants.CHAT.SHOW_OUTBOX });
}

function enableLiteView() {
	return { type: Constants.CHAT.ENABLE_LITE_VIEW };
}

function disableLiteView() {
	return { type: Constants.CHAT.DISABLE_LITE_VIEW };
}

function slimConversationPanel() {
	return { type: Constants.CHAT.SLIM_CONVERSATION_PANEL };
}

function fattenConversationPanel() {
	return { type: Constants.CHAT.FATTEN_CONVERSATION_PANEL };
}

function setTotalUnreadCount(unreadCount) {
	return {
		type: Constants.CHAT.SET_TOTAL_UNREAD_COUNT,
		totalUnreadCount: unreadCount
	}
}

function clearCurrentPeer() {
	return { type: Constants.CHAT.CLEAR_CURRENT_PEER }
}

function segueToConversationList() {
	return (dispatch, getState) => {
		dispatch(fattenConversationPanel())
		dispatch(clearCurrentPeer())
	}
}

function segueToMessagesPanel(peerToken) {
	return (dispatch, getState) => {
		dispatch(hideConversationsPanel());
		dispatch(displayMessagesPanel());
		if (peerToken) {
			dispatch(setCurrentPeer(peerToken));
	        return dispatch(fetchUserData(peerToken))
	        	.then((userData) => {
	        		dispatch(loadPeerDataIntoState(userData.overview));

	        	})
	        	.catch((e) => {
	        		console.log(e.message);
	        		dispatch(segueToConversationsPanel());
	        	});
		}
		return Promise.resolve();
	}
}

function segueToConversationsPanel() {
	return (dispatch, getState) => {
		dispatch(hideMessagesPanel());
		dispatch(displayConversationsPanel());
		dispatch(clearCurrentPeer());
	}
}


function displayMessagesPanel() {
	return { type: Constants.CHAT.DISPLAY_MESSAGES_PANEL }
}

function displayConversationsPanel() {
	return { type: Constants.CHAT.DISPLAY_CONVERSATIONS_PANEL }
}

function hideMessagesPanel() {
	return { type: Constants.CHAT.HIDE_MESSAGES_PANEL }
}

function hideConversationsPanel() {
	return { type: Constants.CHAT.HIDE_CONVERSATIONS_PANEL }
}

function enableMobileView() {
	return (dispatch, getState) => {
		// if (getState().chat.isLiteView) return;
		const currentPeerToken = getState().chat.currentPeerToken
		dispatch({ type : Constants.CHAT.ENABLE_MOBILE_VIEW })
		if (currentPeerToken) {
			dispatch(segueToMessagesPanel());
		} else {
			dispatch(segueToConversationsPanel());
		}
	}
}

function disableMobileView() {
	return { type : Constants.CHAT.DISABLE_MOBILE_VIEW };
}

function fetchUserData(peerToken) {
	return (dispatch, getState) => {
		const state = getState();
		if (state.user.overview && state.user.overview.token === peerToken) {
			return Promise.resolve(state.user);
		} else {
	    	return RBService.getUser(peerToken)
		    	.then(response => {
		    		return (new User(response.data.user)).data;;
		    	})
		    	.catch((e) => console.log(e));
		}
	}
}

// peerOverview is used because fetchPeer returns nothing if peer has no conversation with user
function loadPeerDataIntoState(peerOverview) {
	return (dispatch, getState) => {
		const overview = peerOverview;
		const peerToken = overview.token;
		const peerData = {
		    VIP: overview.isVIP,
		    age: overview.age,
		    location: overview.address,
		    locked: !overview.isVIP,
		    name: overview.name,
		    numReceived: 0,
		    numUnread: 0,
		    photoURL: overview.mainPhoto.small_image_url,
		    token: overview.token
		}

		return dispatch(determinePeerType(peerToken))
		    .then(() => dispatch(fetchPeersIfNeeded()))
		    .then(() => dispatch(addPeerToStateIfNeeded(peerData)))
		    .then(() => dispatch(fetchMessages(peerToken)))
	}
}

function openChatPanel(peerOverview) {
	return (dispatch, getState) => {
		require.ensure([], (require) => {
			const chatView = require('../views/chat/ChatView');
			dispatch(loadLiteView(chatView));
			dispatch(setCurrentPeer(peerOverview.token));
			dispatch(enableLiteView());
			dispatch(showLiteView());
			dispatch(disableEditMode());
			dispatch(slimConversationPanel());
		},'chat');
		return dispatch(loadPeerDataIntoState(peerOverview))

	}
}

function openChatPanelFromNotification(peerToken) {
	return (dispatch, getState) => {
		require.ensure([], (require) => {
			const chatView = require('../views/chat/ChatView');
			dispatch(loadLiteView(chatView));
			dispatch(setCurrentPeer(peerToken));
			dispatch(showInbox());
			dispatch(disableEditMode());
			dispatch(enableLiteView());
			dispatch(showLiteView());
			dispatch(slimConversationPanel());
		}, 'chat')
		return dispatch(fetchMessages(peerToken));
	}
}

function switchChatConvoFromNotification(peerToken) {
	return (dispatch, getState) => {
			dispatch(setCurrentPeer(peerToken));
			dispatch(showInbox());
			dispatch(disableEditMode());
		return dispatch(fetchMessages(peerToken));
	}
}

function disableChatPanel() {
	return (dispatch, getState) => {
		dispatch(clearCurrentPeer());
		// dispatch(displayMessagesPanel());
		// dispatch(displayConversationsPanel());
		return dispatch(disableLiteView());
	}
}

function closeChatPanel() {
	return (dispatch, getState) => {
	    $('.chat-lite-view-container')
	      .addClass('slideOutRight')
	      .one("webkitAnimationEnd \
	            mozAnimationEnd    \
	            MSAnimationEnd     \
	            oanimationend      \
	            animationend", () => {
	              dispatch(disableLiteView());
	              dispatch(hideLiteView());
	              dispatch(clearCurrentPeer());
	              $('.chat-lite-view-container').off();
	      });
	}
}

function openConversation(peerToken) {
	return (dispatch, getState) => {
		const state = getState();
		const myToken = state.me.overview.token;
		const isMobileView = state.chat.isMobileView;
		const isLiteView = state.chat.isLiteView;
		if (isLiteView) {
			dispatch(slimConversationPanel());
		}
		if (isMobileView) {
			dispatch(segueToMessagesPanel());
		}
		dispatch(setCurrentPeer(peerToken));
		return dispatch(fetchMessages(peerToken));
	}
}

function fetchTotalUnreadCount() {
	return (dispatch, getState) => {
		const state = getState()
		const myToken = state.me.overview.token
		return axios.get(`${CHAT_API_PREFIX}/getNumUnread/${myToken}`)
			.then(response => response.data)
			.then(data => {
				if (data.status === 200) {
					dispatch(setTotalUnreadCount(data.result.numUnread))
				} else {
					throw { message : 'Fetch unread count not successful' }
				}
			})
	}
}

function initializeChatPageView(token) {
	return (dispatch, getState) => {
		dispatch(clearCurrentPeer());
		if (getState().chat.isLiteView) {
			dispatch(disableLiteView());
			dispatch(hideLiteView());
		}
		dispatch(fetchPeersIfNeeded());
		const isMobileView = getState().chat.isMobileView;
		if (token) {
			if (isMobileView) dispatch(segueToMessagesPanel(token));
		} else {
			if (isMobileView) dispatch(segueToConversationsPanel());
			else {
				dispatch(displayConversationsPanel());
				dispatch(displayMessagesPanel());
			}
		}
	}
}

function initializeChatNotificationList() {
	return (dispatch, getState) => {
		dispatch(fetchTotalUnreadCount());
		dispatch(fetchPeersIfNeeded());
	}
}

function cleanUpChat() {
	return (dispatch, getState) => {
		dispatch(clearCurrentPeer());
		dispatch(disableEditMode());
		dispatch(disableMobileView());
	}
}

export default {
  showInbox: showInbox,
  showOutbox: showOutbox,
  enableMobileView: enableMobileView,
  disableMobileView: disableMobileView,
  setCurrentPeer: setCurrentPeer,
  cleanInput: () => ({ type: Constants.CHAT.CLEAN_INPUT }),
  dirtyInput: () => ({ type: Constants.CHAT.DIRTY_INPUT }),
  enableEditMode: () => ({ type: Constants.CHAT.ENABLE_EDIT_MODE }),
  disableEditMode: disableEditMode,
  selectPeer: (peerToken) => ({ type: Constants.CHAT.SELECT_PEER, peerToken: peerToken }),
  deselectPeer: deselectPeer,
  fetchPeersIfNeeded: fetchPeersIfNeeded,
  sendMessage: sendMessage,
  markRead: markRead,
  markAllRead: markAllRead,
  deleteConversations: deleteConversations,
  blockCurrentUser: blockCurrentUser,
  deleteCurrentConversation: deleteCurrentConversation,
  setWindowHeight: (windowHeight) => ({ type: Constants.CHAT.SET_WINDOW_HEIGHT, windowHeight: windowHeight }),
  openChatPanel: openChatPanel,
  openChatPanelFromNotification: openChatPanelFromNotification,
	switchChatConvoFromNotification: switchChatConvoFromNotification,
  closeChatPanel: closeChatPanel,
  disableChatPanel: disableChatPanel,
  fetchMorePeersIfAny: fetchMorePeersIfAny,
  receiveMessage: receiveMessage,
  openConversation: openConversation,
  fetchTotalUnreadCount: fetchTotalUnreadCount,
  initializeChatPageView: initializeChatPageView,
  cleanUpChat: cleanUpChat,
  segueToConversationList: segueToConversationList,
  segueToConversationsPanel: segueToConversationsPanel,
  initializeChatNotificationList: initializeChatNotificationList,

};
