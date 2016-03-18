import { combineReducers } from 'redux';
import Constants from '../actions/Constants';
import MeReducer from './MeReducer';
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';
import ConnectionsReducer from './ConnectionsReducer';
import SearchReducer from './SearchReducer';
import HeaderReducer from './HeaderReducer';
import LightBoxReducer from './LightBoxReducer';
import ChatLiteReducer from './ChatLiteReducer';
import reportUser from './reportUserReducer';
import BlockUserReducer from './BlockUserReducer'
import EventsReducer from './EventsReducer';
import HomeReducer from './HomeReducer';

export default combineReducers({
    me:MeReducer,
    user:UserReducer,
    chat:ChatReducer,
    chatLite:ChatLiteReducer,
    connections:ConnectionsReducer,
    search:SearchReducer,
    header:HeaderReducer,
    lightbox:LightBoxReducer,
    reportUser:reportUser,
    blockUser:BlockUserReducer,
    events:EventsReducer,
    home:HomeReducer

})
