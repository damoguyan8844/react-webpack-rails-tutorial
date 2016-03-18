
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';


export default  function UserReducer(state={}, action){
    switch (action.type){
        case Constants.USER.CREATE_USER:
            return action.user;
        case Constants.USER.FAVORITE:
            var overview = Object.assign({}, state.overview,{favorited:true});
            return Object.assign({}, state,{overview:overview});
        case Constants.USER.UNFAVORITE:
            var overview = Object.assign({}, state.overview,{favorited:false});
            return Object.assign({}, state,{overview:overview});
        case Constants.USER.DELETE_USER:
            return {};
        default :
            return state;
    }
}