import {BLOCK_USER} from '../actions/Constants';

const initialState = {
  isOpen: false,
}

export default function BLockUserReducer(state = initialState, action) {
	switch(action.type) {
		case BLOCK_USER.OPEN_MODAL:
			return Object.assign({}, state, {
				isOpen: true,
			});
		case BLOCK_USER.CLOSE_MODAL:
			return Object.assign({}, state, {
				isOpen: false,
			});
		default:
			return state;
	}
}
