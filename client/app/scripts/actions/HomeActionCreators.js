import Constants from './Constants.js';


export default {
    createFeeds: (feedsData) => ({type:Constants.HOME.CREATE_FEEDS, feedsData:feedsData}),
    getFeeds: (feedsData) => ({type:Constants.HOME.GET_FEEDS, feedsData:feedsData}),
    getEvents:(events) => ({type:Constants.HOME.GET_EVENTS, events:events})
}