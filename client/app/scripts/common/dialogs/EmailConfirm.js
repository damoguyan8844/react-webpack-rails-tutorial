require('../../styles/common/dialogs/emailconfirm.scss');

var React = require('react');
var RBService = require('../../services/RBService');
import {injectIntl,FormattedMessage} from 'react-intl';
import Modal from 'react-bootstrap/lib/Modal';
import RBNotify from '../../common/notification/RBNotify';



var EmailConfirm = React.createClass({
    onClose:function(){
        this.props.onClose&&this.props.onClose();
    },
    resendEmail:function(){
        RBService.resendEmailVerification()
        .then(function(){
            RBNotify.notify('simple',{title:'Email has been sent to your email address!'});
            this.onClose();
        }.bind(this))
        .catch(function(){
            this.onClose();
        }.bind(this))
    },
    render() {
        return (
            <Modal dialogClassName="rb-email-confirm rb-dialog animated fadeIn" animation={false} show={true} onHide={this.onClose} container={this} >
                <Modal.Body >
                    <div className="rb-dialog-content">
                        <div className="rb-dialog-header">
                            <button type="button" onClick={this.onClose} className="close icon-button-close" ></button>
                            <div className="title"><FormattedMessage id="email_unconfirmed" /></div>
                        </div>
                        <div className="rb-dialog-body">
                            <div className="description" ><FormattedMessage id="you_need_cofirm_email_to_send_message" /></div>
                            <span className="ok" onClick={this.onClose}><FormattedMessage  id="ok" /></span>
                            <a className="resend" onClick={this.resendEmail}><FormattedMessage id="resend_verification_email" /></a>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        );
    }
});

export default EmailConfirm;
