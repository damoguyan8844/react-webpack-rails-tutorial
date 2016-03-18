var React = require('react');
var Carousel = require('./Carousel');
var PhotoDetail = require('./PhotoDetail');
var Tags = require('./Tags');
var RBService = require('../../services/RBService');
import {injectIntl,FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import Modal from 'react-bootstrap/lib/Modal';

var RBPhotoViewer = React.createClass({
    getInitialState:function(){
        return {
            show:false,
            deleting:false,
            showMore:false,
            showActions:false
        }
    },
    toggleShowMore:function(e){
        this.setState({showMore:!this.state.showMore});
    },
    componentDidMount: function(){

    },
    deletePhoto:function(e){
        var photo = this.props.photos[this.props.index];
        RBService.deletePhoto(photo.user_photo.id)
        .then(function(response){
            this.setState({deleting:false});
            this.props.deletePhoto(photo);
        }.bind(this),function(info){
            console.log('failed to delete photo')
        })
    },
    setAsMainPhoto:function(){
        var photo = this.props.photos[this.props.index];
        RBService.setAsMainPhoto(photo.user_photo.id)
        .then(function(){
            this.props.changeProfilePhoto(photo);
            this.setState({showMore:false});
        }.bind(this))
        .catch(function(info){
            console.log(info)
        }.bind(this))
    },
    confirmDelete:function(e){
        this.setState({deleting:true});
    },
    cancelDelete:function(e){
        this.setState({deleting:false});
    },
    onShowActions:function(e){
        if(!this.state.showActions){
            this.setState({showActions:true});
        }
    },
    onClose:function(e){
        this.props.closeLightBox();
        e.preventDefault();
        e.stopPropagation();
    },
    render() {
        var photo = this.props.photos[this.props.index];
        var indexStr = (this.props.index +1) + '/' + this.props.photos.length;
        const mvCls = classNames({
            "rb-mobile-photo-viewer":true,
            "show-actions":this.state.showActions
        })
        return (
            <Modal dialogClassName="rb-lightbox animated fadeIn" animation={false} show={true} onHide={this.onClose} container={this} >
            <Modal.Body >
                <div className="rb-desktop-photo-viewer">
                    <div className="desktop-carousel">
                            {this.props.editMode &&  !this.state.deleting &&
                                <span onClick={this.confirmDelete} className="photo-delete"><i className="icon-trash-can"></i></span>}
                            {this.state.deleting &&
                                <div className="photo-delete-confirm">
                                    <span><FormattedMessage id="do_you_want_to_delete_photo" /></span>
                                    <div className="confirm-btns">
                                        <span className="no-btn" onClick={this.cancelDelete}><FormattedMessage id="no" /></span>
                                        <span onClick={this.deletePhoto} className="yes-btn"><FormattedMessage id="yes" /></span>
                                    </div>
                                </div>}

                        <Carousel  {...this.props} disableArrows={this.state.deleting}></Carousel>
                    </div>
                    <PhotoDetail {...this.props} />
                </div>
                <div className={mvCls}  onMouseOver={this.onShowActions} onTouchEnd={this.onShowActions}>
                    {this.state.showActions &&
                    <div className="header animated slideInDown">
                        {this.props.editMode &&  !this.state.deleting &&
                        <span onClick={this.confirmDelete} className="photo-delete"><i className="icon-trash-can"></i></span>}
                        <span className="viewer-close" onClick={this.onClose}><FormattedMessage id="done" /></span>
                    </div>
                    }
                    <Carousel  {...this.props} disableArrows={this.state.deleting} ></Carousel>
                    {!this.state.deleting && this.state.showActions &&
                        <div className="photo-detail animated slideInUp">
                            {!this.state.showMore && <div className="comment">{photo.user_photo.caption}</div>}
                            <div className="index-more">
                                <span className="photo-index">{indexStr}</span>
                                {!this.state.showMore && <a  onClick={this.toggleShowMore} className="more icon-more-arrow-up"> </a> }
                                {this.state.showMore && <a  onClick={this.toggleShowMore} className="more icon-more-arrow-down"> </a> }
                            </div>
                            {this.state.showMore &&
                                <div className="show-more">
                                    <Tags {...this.props}/>
                                    {this.props.editMode &&
                                    <div className="use-as-profile" onClick={this.setAsMainPhoto}><FormattedMessage id="lightbox.user_as_profile_photo" /></div>
                                    }
                                    </div>
                            }
                        </div>
                    }
                    {this.state.deleting &&

                    <div className="photo-deleting">
                        <div className="mask" onClick={this.cancelDelete}></div>
                        <div className="deleting-options">
                            <div className="title"><FormattedMessage id="lightbox.delete_photo" /></div>
                            <div className="cancel" onClick={this.cancelDelete}><FormattedMessage id="cancel" /></div>
                            <div className="delete" onClick={this.deletePhoto}><FormattedMessage id="delete" /></div>
                        </div>

                    </div>
                    }

                </div>
            </Modal.Body>

            </Modal>
        );
    }
});

export default RBPhotoViewer;
