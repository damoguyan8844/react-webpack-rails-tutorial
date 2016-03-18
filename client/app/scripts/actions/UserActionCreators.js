import Constants from './Constants.js';
import RBService from '../services/RBService';
import User from '../models/User';

function createUser(user) {
	return {type:Constants.USER.CREATE_USER, user:user};
}

function viewProfile(token, history) {
	return (dispatch, getState) => {
	    return RBService.getUser(token)
		    .then(response => {
		        const user = (new User(response.data.user)).data;
		        dispatch(createUser(user));
		        history.pushState(null,'/profile/' + token);
		    });
	}
}

export default {
    createUser: createUser,
    favorite: () => ({type:Constants.USER.FAVORITE}),
    unFavorite: () => ({type:Constants.USER.UNFAVORITE}),
    deleteUser: () => ({type:Constants.USER.DELETE_USER}),
    viewProfile: viewProfile
}
