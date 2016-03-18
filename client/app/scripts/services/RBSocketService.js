import { receiveMessage, fetchTotalUnreadCount } from '../actions/ChatActionCreators';

const REQ_TIMEOUT = 30000;

export default class RBSocketService {
	constructor(options) {
		this.store = options.store;
		this.myToken = this.store.getState().me.overview.token;
		this.myLocale = this.store.getState().me.overview.locale;

		this.socket = io({transports: ['polling']});
		this.socket.on('connect', () => {
			this.authenticate(this.myToken, () => {
				console.log('authenticated with socket.io successfully');
			});
		});
		// To send a message, a client sends a HTTP POST
		// /api/v2/chat/sendMessage/<token> to the server. 
		// The client will receive the same message data twice, 
		// once from HTTP POST response, once from socket.io push notification. 
		// The client should drop the latter message.
		this.socket.on('message', (message) => {
			this.store.dispatch(receiveMessage(message));
		});
	}

	// currently request is not used, as only socket listeners are used
	request(event, req, callback) {
		const timeoutID = this.startTimer(event)
		req.lang = this.myLocale;
		//req.platform = "MASQUE";
		this.socket.emit(event, req, (res) => {
			clearTimeout(timeoutID);
			if (res.status >= 400) {
				return;
			}
			callback(res.result);
		});
	}

	authenticate(token, callback) {
		const req = {token: token}
		this.request('authenticate', req, (result) => {
			callback();
		});
	}

	startTimer(event) {
		return setTimeout(() => {
			this.disconnect(event);
		}, REQ_TIMEOUT);
	}

	disconnect(event) {
		// show pop up or something?
		this.socket.disconnect();
		location.reload();
	}
}