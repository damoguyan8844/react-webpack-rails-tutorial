
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';


export default  function EventsReducer(state={eventList:[]}, action){
    switch (action.type){
        case Constants.EVENTS.GET_EVENTS:
           return Object.assign({}, state,{eventList:action.events});
        case Constants.EVENTS.GET_DETAIL:
            return Object.assign({}, state,{detail:action.detail,showMobileDetail:action.showMobileDetail});
        case Constants.EVENTS.GET_PAST_EVENT:
            return Object.assign({}, state,{pastEvent:action.pastEvent});
        case Constants.EVENTS.SET_MOBILE_DETAIL:
            return Object.assign({}, state,{showMobileDetail:action.showMobileDetail});
        default :
            return state;
    }
}