
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';
import User from '../models/User';

function Photos(state=[],action){
    switch(action.type){

    }
}

export default function MeReducer(state={}, action){
    switch (action.type){
        case Constants.COMMON.DELETE_PHOTO:
            var photos = state.photos.filter(p => p != action.photo);
            var overview = state.overview;
            if(photos.length <=0){
                overview = Object.assign({},overview,{mainPhoto:User.defaultMainPhoto()});
            }
            return Object.assign({}, state,{photos:photos,overview:overview});
        case Constants.COMMON.UPDATE_PHOTO_CAPTION:
            var photos = state.photos.map(function(p){
                if(p.user_photo.id == action.photo.user_photo.id){
                    action.photo.user_photo.caption = action.caption;
                    return action.photo;
                }else{
                    return p;
                }
            })
            return Object.assign({}, state,{photos:photos});

        case Constants.ME.CHANGE_PROFILE_PHOTO:
            var fromExisting=false;
            var photos = state.photos.filter(p => p.user_photo.id != action.photo.user_photo.id);
            photos = [action.photo,...photos];
            var overview = Object.assign({}, state.overview,{mainPhoto:action.photo.user_photo});
            return Object.assign({}, state,{photos:photos, overview:overview});
        case Constants.ME.ADD_PHOTO:
            var photos = [...state.photos,action.photo];
            return Object.assign({}, state,{photos:photos});
        case Constants.ME.UPLOADING_PHOTO:
            var photos = state.photos.map(function(p){
                return p.user_photo.id == action.photoId ?Object.assign({},p,{progress:action.progress}):p;
            })
            return Object.assign({}, state,{photos:photos});
        case Constants.ME.UPLOADED_PHOTO:
            var photos = state.photos.map(function(p){
                if(p.user_photo.id == action.photoId) {
                    return action.newPhoto?action.newPhoto:Object.assign({},p,{uploadFailed:true})
                }else{
                    return p;
                }
            })
            return Object.assign({}, state,{photos:photos});
        case Constants.ME.SAVE_QUESTION:
            var questions = state.insight.questions.map(function(q){
                if(q.id == action.questionId){
                    return Object.assign({}, q, {answer:action.answer})
                }
                return q;
            })
            var insight = Object.assign({},state.insight,{questions:questions});
            return Object.assign({}, state,{insight:insight});
        case Constants.ME.SAVE_DETAIL:
            var overview = Object.assign({},state.overview,action.detail.general);
            return Object.assign({}, state,{detail:action.detail,overview:overview});
        case Constants.ME.UPDATE_USERSRATUS:
            return Object.assign({}, state,{userStatus:action.userStatus});
        default :
            return state;
    }
}