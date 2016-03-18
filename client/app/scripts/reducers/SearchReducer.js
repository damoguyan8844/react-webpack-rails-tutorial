
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';


export default  function SearchReducer(state={multiCriterias:[]}, action){
    switch (action.type){
        case Constants.COMMON.UPDATE_PHOTO_TAG:
            if(!state.user){
                return state;
            }
            var photos = state.user.photos && state.user.photos.map(function(p){
                if(p.user_photo.id == action.photo.user_photo.id){
                    var tags = p.user_photo.tags && p.user_photo.tags.map(function(tag){
                            if(tag.index == action.tag.index){
                                return Object.assign({}, tag,{count:action.tag.count,marked:action.tag.marked});
                            }
                            return tag;
                        })
                    action.photo.user_photo.tags = tags;
                    return action.photo;
                }else{
                    return p;
                }
            })
            var user = Object.assign({}, state.user,{photos:photos})
            return Object.assign({}, state,{user:user});
        case Constants.SEARCH.SHOW_USER:
            return Object.assign({}, state,{user:action.user,searchUser:null});
        case Constants.SEARCH.DESTROY_SEARCH_USER:
            return Object.assign({}, state,{searchUser:null});
        case Constants.SEARCH.QUICK_VIEW:
            return Object.assign({}, state,{user:null,searchUser:action.searchUser});
        case Constants.SEARCH.SEARCH_CRITERIAS:
            return Object.assign({}, state,{criterias:action.criterias,strCriteria:action.strCriteria});
        case Constants.SEARCH.USED_MULTI_CRITERIAS:
            return Object.assign({}, state,{multiCriterias:action.multiCriterias});
        case  Constants.SEARCH.SEARCH_RESULT:
            return Object.assign({},state,{searchResult:{users:action.searchResult, curPage:action.curPage}});
        default :
            return state;
    }
}