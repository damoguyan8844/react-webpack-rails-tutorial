import Constants from './Constants.js';

export default {
    addPhoto:(photo) => ({type:Constants.ME.ADD_PHOTO,photo:photo}),
    uploadingPhoto:(photoId,progress) => ({type:Constants.ME.UPLOADING_PHOTO,photoId:photoId,progress:progress}),
    uploadedPhoto:(photoId,newPhoto) => ({type:Constants.ME.UPLOADED_PHOTO,photoId:photoId,newPhoto:newPhoto}),
    changeProfilePhoto:(photo) => ({type:Constants.ME.CHANGE_PROFILE_PHOTO,photo:photo}),
    saveQuestion:(questionId,answer) => ({type:Constants.ME.SAVE_QUESTION,questionId:questionId,answer:answer}),
    saveDetail:(detail) => ({type:Constants.ME.SAVE_DETAIL,detail:detail}),
    updateUserStatus:(userStatus) => ({type:Constants.ME.UPDATE_USERSRATUS,userStatus:userStatus})
}