var React = require('react');
var ReactDOM = require('react-dom');

import {connect} from 'react-redux';
import {openLightBox } from '../../actions/LightBoxActionCreators';
var Photos = React.createClass({
    getDefaultProps:function(){
        return {
            photos:[]
        }
    },
    onClickPhoto:function(index,e){
        e.preventDefault();
        this.props.openLightBox(this.props.overview,this.props.photos,index,false);
    },
    render: function() {
        var photos = this.props.photos.map(function(p,index){
            var photo = p.user_photo.small_image_url;
            return (
                <a href="#" className="photos-more_link" onClick={this.onClickPhoto.bind(null, index)}><img className="photos-more_img" src={photo}></img></a>
            )
        }.bind(this))
        return(

            <div className="photos-more more">
                {photos}
            </div>

        )
    }
});

function mapStateToProps(state){
    return {
        overview:state.user.overview,
        photos:state.user.photos
    }
}

Photos = connect(mapStateToProps,{openLightBox})(Photos)

export default Photos;
