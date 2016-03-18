import Constants from './Constants.js';

export function createConstant(data){
    return {
        type:Constants.CONSTANT.CREATE_USER,
        data:data
    };
}