require('../../styles/common/dialogs/blockuser.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockUserActionCreators from '../../actions/BlockUserActionCreators'
import { bindActionCreators } from 'redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import {injectIntl,FormattedMessage} from 'react-intl';
import RBService from '../../services/RBService.js';
import RBNotify from '../notification/RBNotify.js';

class BlockUser extends Component {

    constructor(props) {
      super(props);
      this.onToggleBlock = this.onToggleBlock.bind(this);
    }

    onToggleBlock () {
      const user = this.props.user;
      if(this.props.blocked){
          RBService.unblockUser(user.token)
          .then(function(){
              var msg = this.props.intl.formatMessage({id:'common.name_has_been_unblocked'},{name:user.name})
              RBNotify.notify('simple',{title:msg})
              this.props.toggleBlock();
          }.bind(this))
      }else{
          RBService.blockUser(user.token)
          .then(function(){
              var msg = this.props.intl.formatMessage({id:'common.name_has_been_blocked'},{name:user.name})
              RBNotify.notify('simple',{title:msg})
              this.props.toggleBlock()
          }.bind(this))
      }
      this.props.actions.closeBlockUserModal()
    }

    render() {
        return (
            <Modal
                className='block-user_modal modal-bottom'
                show={this.props.isOpen}
                onHide={this.props.actions.closeBlockUserModal}>
                <Modal.Header className='block-user_header'>
                  <button type="button" onClick={this.props.actions.closeBlockUserModal}
                          className="close icon-button-close">
                  </button>
                  <Modal.Title className="block-user_title">Block user?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='block-user_body'>
                  <button className="block-user_button block-user_button--cancel" onClick={this.props.actions.closeBlockUserModal}>Cancel</button>
                  <button className="block-user_button block-user_button--submit" onClick={this.onToggleBlock}> {this.props.blocked?"Unblock":"Block"} User</button>
                </Modal.Body>
            </Modal>
        );
    }
}

BlockUser = injectIntl(BlockUser);

function mapStateToProps(state) {
    return {
        isOpen: state.blockUser.isOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, BlockUserActionCreators), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockUser);
