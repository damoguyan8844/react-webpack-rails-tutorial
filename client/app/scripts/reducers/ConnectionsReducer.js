
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';


export default  function ConnectionsReducer(state={loading:{visitors:true,visited:true,favorited:true,favoritedMe:true}}, action){
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
        case Constants.CONNECTIONS.CREATE_VISITORS:
            return Object.assign({}, state,{visitors:{users:action.users,curPage:action.curPage,nextPage:action.nextPage,pageToken:action.pageToken}});
        case Constants.CONNECTIONS.CREATE_VISITED:
            return Object.assign({}, state,{visited:{users:action.users,curPage:action.curPage,nextPage:action.nextPage,pageToken:action.pageToken}});
        case Constants.CONNECTIONS.CREATE_FAVORITED:
            return Object.assign({}, state,{favorited:{users:action.users,curPage:action.curPage,nextPage:action.nextPage,pageToken:action.pageToken}});
        case Constants.CONNECTIONS.CREATE_FAVORITEDME:
            return Object.assign({}, state,{favoritedMe:{users:action.users,curPage:action.curPage,nextPage:action.nextPage,pageToken:action.pageToken}});
        case Constants.CONNECTIONS.SHOW_USER:
            return Object.assign({}, state,{user:action.user,searchUser:null});
        case Constants.CONNECTIONS.DESTROY_SEARCH_USER:
            return Object.assign({}, state,{searchUser:null});
        case Constants.CONNECTIONS.QUICK_VIEW:
            return Object.assign({}, state,{user:null,searchUser:action.searchUser});
        case Constants.CONNECTIONS.LOAD_DATA:
            return Object.assign({}, state,{loading:action.loading});
        default :
            return state;
    }
}