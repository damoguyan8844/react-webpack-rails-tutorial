
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';
import {getPhotoTags} from '../common/CommonItems';


export default  function LightBoxReducer(state={}, action){
    switch (action.type){
        case Constants.COMMON.DELETE_PHOTO:
            if(!state.photos){return state};
            var index = state.photos.indexOf(action.photo);
            index = index >= state.photos.length-1?0:index;
            var photos = state.photos.filter(p => p != action.photo);
            return Object.assign({}, state,{photos:photos,index:index});
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
        case Constants.COMMON.UPDATE_PHOTO_TAG:
            var photos = state.photos.map(function(p){
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
            return Object.assign({}, state,{photos:photos});
        case Constants.LIGHTBOX.OPEN:
            var photos = action.photos.map(function(photo){
                var tags = getPhotoTags(RB.locale);
                photo.user_photo.tags && photo.user_photo.tags.map(function(tag){
                    var t = tag.tag?tag.tag:tag;
                    if(t.index <=5){
                        var tg = tags[t.index];
                        tg.count = t.count;
                        tg.marked = t.mark == 1 || t.marked;
                    }
                })
                photo.user_photo.tags = tags;
                return photo;
            })
            return Object.assign({}, state,{overview:action.overview,photos:action.photos,index:action.index,editMode:action.editMode});
        case Constants.LIGHTBOX.CLOSE:
            return {};
        case Constants.LIGHTBOX.SET_INDEX:
            return Object.assign({}, state,{index:action.index});
        default :
            return state;
    }
}