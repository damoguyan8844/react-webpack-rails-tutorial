var React = require('react');
var Tags = require('./Tags');
import RBService from '../../services/RBService';
import {injectIntl,FormattedMessage} from 'react-intl';
var PhotoDetail = React.createClass({
    getInitialState:function(){
        return {
            editingComment:false,
            caption:this.props.photos[this.props.index].user_photo.caption
        }
    },
    onClose:function(e){
        this.props.closeLightBox();
    },
    onEditComment:function(){
        this.setState({editingComment:true});

    },
    onCancelEditComment:function(){
        this.setState({editingComment:false});
    },
    onChangeCaption:function(e){
        this.setState({caption: e.target.value});
    },
    onSaveComment:function(){
        var caption = this.refs.tArea.value.trim();
        var photo = this.props.photos[this.props.index];
        if(caption != '' && caption != this.props.photos[this.props.index].user_photo.caption){
            this.setState({caption:caption,editingComment:false});
            RBService.updatePhotoCaption(photo.user_photo.id,caption)
            .then(function(){
                this.props.updatePhotoCaption(photo,caption);
            }.bind(this))
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({editingComment:false,caption:nextProps.photos[nextProps.index].user_photo.caption})
    },

    render: function () {
        console.log('render in photoDetail')
        var indexStr = (this.props.index +1) + '/' + this.props.photos.length;
        var nameStr = `${this.props.overview.name},${this.props.overview.age}`;
        var caption = this.state.caption;
        if((!caption || caption=='') && !this.state.editingComment && this.props.editMode){
            caption ='-';
        }
        var placeholder = 'Describe your photo here';
        return (
            <div className="rb-photo-detail">
                <button type="button" onClick={this.onClose} className="close icon-button-close" ></button>
                <div className="photo-index">
                    {indexStr}
                </div>
                <hr/>
                <div className="user">
                    <div className="user-profile">
                        <div >
                            <img src={this.props.overview.mainPhoto.small_image_url}></img>
                        </div>
                        <div className="name-address">
                            <div className="name ellipsis">{nameStr}</div>
                            <div className="address ellipsis-2line">{this.props.overview.address}</div>
                        </div>
                    </div>
                    {   !this.state.editingComment &&
                        <div>
                            <div className="comment">{caption}</div>
                            {this.props.editMode && <div>
                                <span onClick={this.onEditComment} className="edit-btn">
                                <i className="icon-button-edit"></i>
                                <FormattedMessage id="edit" />
                                </span>
                                </div>}
                        </div>
                    }
                    {   this.state.editingComment &&
                        <div className="editing-comment">
                            <textarea ref="tArea" value={caption}  onChange={this.onChangeCaption} placeholder={placeholder} className="gray-border"/>
                            <div>
                                <span className="cancel" onClick={this.onCancelEditComment}><FormattedMessage id="cancel" /></span>
                                <span className="save" onClick={this.onSaveComment}><FormattedMessage id="save" /></span>
                            </div>

                        </div>
                    }

                </div>
                <Tags {...this.props}/>
            </div>
        );
    }
});

export default PhotoDetail;