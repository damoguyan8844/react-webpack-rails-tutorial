import Constants from './Constants.js';


export default {
    deletePhoto:(photo)=>({type:Constants.COMMON.DELETE_PHOTO,photo:photo}),
    updatePhotoCaption:(photo,caption) => ({type:Constants.COMMON.UPDATE_PHOTO_CAPTION,photo:photo,caption:caption}),
    updatePhotoTag:(photo,tag) => ({type:Constants.COMMON.UPDATE_PHOTO_TAG,photo:photo,tag:tag})
}