import Constants from './Constants.js';


export default {
    highlightTab:(tab) => ({type:Constants.HEADER.HIGHLIGHT_TAB,tab:tab}),
    showEventList:envets => ({type:Constants.HEADER.SHOW_EVENTS,eventList:envets})
}