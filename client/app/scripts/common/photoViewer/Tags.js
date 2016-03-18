var React = require('react');
import {updatePhotoTag} from '../../actions/CommonActionCreators';
import {connect} from 'react-redux';
import RBService from '../../services/RBService';
var Tags = React.createClass({
    onToggleTag:function(tag){
        if(this.props.editMode){
            return;
        }
        var photoId = this.props.photos[this.props.index].user_photo.id;
        if(tag.marked){
            RBService.unSetPhotoTag(photoId,tag);
            tag.marked = false;
            tag.count--;

        }else{
            RBService.setPhotoTag(photoId,tag);
            tag.marked = true;
            tag.count++;
        }
        this.props.dispatch(updatePhotoTag(this.props.photos[this.props.index],tag));
    },
    render: function () {
        console.log('render tags')
        var photo = this.props.photos[this.props.index];

        var tags = photo.user_photo.tags.map(function(tag,index){
            var cls = 'tag ' + (this.props.editMode?'disabled':'enabled');
            if(tag.marked && !this.props.editMode){
                cls += ' marked';
            }
            return (<div className="tag-item">
                <span className="tag-count">{tag.count}x</span>
                <span  className={cls} onClick={this.onToggleTag.bind(this,tag)}>{tag.name}</span>
                </div>);

        }.bind(this));
        return (
            <div className="rb-photo-tags tags">
                    {tags}
            </div>
        );
    }
});

export default connect()(Tags);