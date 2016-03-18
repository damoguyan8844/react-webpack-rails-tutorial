const initialChatState = {
	isInputEmpty: true,
	isMobileView: false,
	isEditMode: false,
	isInbox: true,
	isLiteView: false,
	shouldSlimConvPanel: false,
	mobileHeaderHeight: 0,
	totalUnreadCount: 0,
	currentPeerToken: undefined,
	shouldDisplayConversationsPanel: true,
	shouldDisplayMessagesPanel: true,
	inbox: {
		isFetchingPeers: false,
		nextSeq: undefined,
		noMore: false,
		peerTokens: []
	},
	outbox:
	{
		isFetchingPeers: false,
		nextSeq: undefined,
		noMore: false,
		peerTokens: []
	},
	peers: {}
};

module.exports = initialChatState
