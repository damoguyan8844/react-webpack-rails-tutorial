import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportUserActionCreators from '../../actions/ReportUserActionCreators'
import { bindActionCreators } from 'redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import CheckBox from '../../components/CheckBox';

// Required props:
//     targetUserToken: String,
class ReportUser extends Component {
    reportBody() {
        let checkboxes = [];
        for (let key in this.props.checkboxes) {
            checkboxes.push(Object.assign({}, this.props.checkboxes[key], {key: key}));
        }
        return checkboxes.map((checkbox, index) => {
            return (
                <CheckBox
                    label = {checkbox.name}
                    checked = {checkbox.checked}
                    comment = {checkbox.comment}
                    specId = {checkboxes.specId}
                    key = {checkbox.key}
                    onClick = { (checkbox.checked) ?
                                (() => {this.props.actions.unselectReportReason(checkbox.key);}) :
                                (() => {this.props.actions.selectReportReason(checkbox.key);})} />
            );
        });
    }
    render() {
        return (
            <Modal
                className='report-user-modal modal-bottom'
                show={this.props.showReportModal}
                onHide={this.props.actions.closeReportModal}>

                <Modal.Header
                  className='report-user-header'
                  closeButton>
                    <Modal.Title> Report user </Modal.Title>
                    <span className="report-user-subtitle"> How has the user violated our TOS? </span>
                </Modal.Header>
                <Modal.Body className='report-user-body'>
                  {this.reportBody()}
                </Modal.Body>
                <Modal.Footer className='report-user-footer'>
                    <button
                        disabled={this.props.isReporting}
                        className="btn report-user-button"
                        onClick={() => {this.props.actions.submitReport(this.props.targetUserToken)}}>
                        <large>Report</large>
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReporting: state.reportUser.isReporting,
        showReportModal: state.reportUser.showReportModal,
        checkboxes: state.reportUser.checkboxes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, ReportUserActionCreators), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportUser);
