require('../../styles/views/LightBox.scss');

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import PhotoViewer from '../../common/photoViewer/RBPhotoViewer';
import {openLightBox, closeLightBox,setIndex} from '../../actions/LightBoxActionCreators';
import {deletePhoto,updatePhotoCaption} from '../../actions/CommonActionCreators';
import {changeProfilePhoto} from '../../actions/MeActionCreators.js';

var LightBox = React.createClass({
    show:function(){

    },
    render: function(){
        if(this.props.photos && this.props.photos.length>0){
            return <PhotoViewer {...this.props} />
        }else{
            return <div/>
        }
    }
});


function mapStateToProps(state){
    return {
        overview:state.lightbox.overview,
        photos:state.lightbox.photos,
        index:state.lightbox.index,
        editMode:state.lightbox.editMode
    }
}

LightBox = connect(mapStateToProps,{openLightBox, closeLightBox,setIndex,deletePhoto,updatePhotoCaption,changeProfilePhoto})(LightBox)
export default  LightBox;

