
import {combineReducers} from 'redux';
import Constants from '../actions/Constants';


export default  function HeaderReducer(state={}, action){
    switch (action.type){
        case Constants.HEADER.HIGHLIGHT_TAB:
            return Object.assign({}, state,{highlightTab:action.tab});
        case Constants.HEADER.SHOW_EVENTS:
            return Object.assign({},state,{eventList:action.eventList})
        default :
            return state;
    }
}