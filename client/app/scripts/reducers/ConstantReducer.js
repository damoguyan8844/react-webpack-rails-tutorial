import {combineReducers} from 'redux';
import Constants from '../actions/Constants';



export default function ConstantReducer(state={}, action){
    switch (action.type){
        case Constants.CONSTANT.GET_CONSTANT:
            return action.data;
        default :
            return state;
    }
}

