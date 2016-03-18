import Constants from './Constants.js';


export default {
    openLightBox:(overview,photos,index,editMode) => ({type:Constants.LIGHTBOX.OPEN,overview:overview,photos:photos,index:index,editMode:editMode}),
    closeLightBox:()=>({type:Constants.LIGHTBOX.CLOSE}),
    setIndex:(index)=>({type:Constants.LIGHTBOX.SET_INDEX,index:index})
}