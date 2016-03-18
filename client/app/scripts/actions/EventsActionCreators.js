import Constants from './Constants.js';


export default {

    getEvents: (events) => ({type:Constants.EVENTS.GET_EVENTS, events:events}),
    getEventDetail: (detail,showMobileDetail) => ({type:Constants.EVENTS.GET_DETAIL, detail:detail,showMobileDetail:showMobileDetail}),
    getPastEvent:(pastEvent)=>({type:Constants.EVENTS.GET_PAST_EVENT, pastEvent:pastEvent}),
    showMobileDetail:(showMobileDetail) =>({type:Constants.EVENTS.SET_MOBILE_DETAIL, showMobileDetail:showMobileDetail})
}