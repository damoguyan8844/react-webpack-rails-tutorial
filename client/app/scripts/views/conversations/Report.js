var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';

import Modal from 'react-bootstrap/lib/Modal';

var Report = React.createClass({
    report: function() {
        var checkedArr = $("input:checkbox[name=report]:checked");
        checkedArr.each(function(i,e){
            $('#report-user-button').attr('disabled', true);
            var comment = $(this).attr('data-comment');
            var specId = $(this).attr('data-spec-id');
            var parent = $(this).closest(".checkbox");
            $.ajax({
                url: "en/feedbacks/report_inappropriate_profile",
                data: {
                    "target_user_token": currentPeerToken,
                    "feedback": {
                        "comment": comment,
                        "feedback_spec_id": specId,
                        "controller": "feedbacks",
                        "action": "report_inappropriate_profile"
                    }
                },
                type: 'POST',
                success: function(data){
                    if(data.success){
                        $("#report-flash").text(data.message).css('background', '#64B62B');
                    } else {
                        $("#report-flash").text(data.message).css('background', '#EB4121');
                    }
                    $("#report-flash").fadeIn(100).delay(1000).fadeOut(100);
                    if(i == checkedArr.length-1) {
                        hideModal();
                        $('#report-user-button').attr('disabled', false);
                    }
                },
                error: function(data){
                    $("#report-flash").text(i18n("feedback_error")).css('background', '#EB4121');
                    $("#report-flash").fadeIn(100).delay(1000).fadeOut(100);
                    $('#report-user-button').attr('disabled', false);
                }
            });
        });
    },
    render: function() {
        return (
            <div className="modal" id="report-user-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">report</h4>
                            <small>which</small>
                        </div>
                        <br/>
                        <div id="report-flash"></div>
                        <div className="modal-body">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="report" data-comment="Abusive Message" data-spec-id="12"/> abusive messages
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="report" data-comment="Scammer" data-spec-id="13"/>scammer
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="report" data-comment="Fake User" data-spec-id="12"/>fake user
                                </label>
                            </div>
                        </div>
                        <button type="button" id="report-user-button" className="btn btn-primary" onClick={this.report}><large>report</large></button>
                    </div>
                </div>
            </div>
        )
    }
});

//function mapStateToProps(state){
//    return {
//        user:state?state.user:state
//    }
//}

//var  Report = connect(mapStateToProps)(Report)

exports.Report = Report;