var React = require('react');
var ReactDOM = require('react-dom');
import Modal from 'react-bootstrap/lib/Modal';
import RBPhotoUploader from './RBPhotoUploader';
import {changeProfilePhoto} from '../../actions/MeActionCreators';
var ChangeProfilePopover = React.createClass({


    onTryAgain:function(){
        this.props.onClose && this.props.onClose();
    },

    onClose:function(){
        this.props.onClose && this.props.onClose();
    },
    onCancel:function(){
        this.props.onClose && this.props.onClose();
    },
    onSuccess:function(){
        this.props.onSuccess && this.props.onSuccess();
        this.props.onClose && this.props.onClose();
    },

    render() {
        return (
            <Modal dialogClassName="uploader rb-photo-uploader animated fadeIn" animation={false} onHide={this.onClose}
                   show={true}  container={this} >
                <Modal.Body >
                    <RBPhotoUploader {...this.props} onSuccess={this.onSuccess} onClose={this.onClose} onTryAgain={this.onTryAgain}  />
                </Modal.Body>
            </Modal>
        );
    }
});


export default ChangeProfilePopover;
