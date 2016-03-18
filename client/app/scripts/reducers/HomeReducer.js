
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';


export default  function HomeReducer(state={feeds:[],events:[]}, action){
    const feedsData = action.feedsData;
    switch (action.type){
        case Constants.HOME.CREATE_FEEDS:
            return Object.assign({}, state,{feeds:feedsData.feeds,nextPage:feedsData.nextPage,nextPageToken:feedsData.nextPageToken});

        case Constants.HOME.GET_FEEDS:
            const feeds = state.feeds.concat(feedsData.feeds);
            return Object.assign({}, state,{feeds:feeds,nextPage:feedsData.nextPage,nextPageToken:feedsData.nextPageToken});
        case Constants.HOME.GET_EVENTS:
            return Object.assign({}, state,{events:action.events});
        default :
            return state;
    }
}