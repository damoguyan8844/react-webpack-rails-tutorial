import Constants from '../actions/Constants';

export default function ChatLiteReducer(state = {isDisplayed: false}, action) {
	switch(action.type) {
		case Constants.CHAT_LITE.LOAD_LITE_VIEW:
			return Object.assign({}, state, {
				chatView: action.chatView
			});
		case Constants.CHAT_LITE.SHOW_LITE_VIEW:
			return Object.assign({}, state, {
				isDisplayed: true
			});
		case Constants.CHAT_LITE.HIDE_LITE_VIEW:
			return Object.assign({}, state, {
				isDisplayed: false
			});
		default:
			return state;
	}
}