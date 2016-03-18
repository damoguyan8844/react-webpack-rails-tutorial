import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { devTools, persistState } from 'redux-devtools'
import RBAppReducer from '../reducers/RBAppReducer.js';

export default function configureStore (initialState) {
	//amplify.store('rb:me',user);
	//var me = Immutable.fromJS(user);
	const logger = createLogger();
	let isDebugMode = !(process.env.NODE_ENV && process.env.NODE_ENV === 'production')
	let middleware = [thunk, promise, logger]
	let finalCreateStore;

	if (isDebugMode) {
		finalCreateStore = compose(
		    applyMiddleware(...middleware),
		    devTools(),
		    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)(createStore);
	} else {
		finalCreateStore = applyMiddleware(...middleware)(createStore);
	}

	return finalCreateStore(RBAppReducer,initialState);
}
