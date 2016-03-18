import Constants from './Constants.js';
import axios from 'axios';
// import RBService from '../services/RBService.js';

function selectReportReason(key){
    return {
        type: Constants.REPORT_USER.SELECT,
        key: key
    }
}

function unselectReportReason(key){
    return {
        type: Constants.REPORT_USER.UNSELECT,
        key: key
    }
}

function openReportModal() {
    return { type: Constants.REPORT_USER.OPEN}
}

function closeReportModal() {
    return { type: Constants.REPORT_USER.CLOSE}
}

function startReporting(){
    return {type: Constants.REPORT_USER.START_PROCESSING}
}

function reportSuccess(){
    return {type: Constants.REPORT_USER.SUCCESS}
}

function reportFailure(){
    return {type: Constants.REPORT_USER.FAILURE}
}

function resetSelection(){
    return {type: Constants.REPORT_USER.RESET}
}

function submitReport(userToken){
    return (dispatch, getState) => {
        let feedbacks = getState().reportUser.checkboxes
        let promises = []
        let data = {}
        for (let key in feedbacks) {
            if (feedbacks[key].checked){
                data = {
                    target_user_token: userToken,
                    feedback: {
                        comment: feedbacks[key].comment,
                        feedback_spec_id: feedbacks[key].specId.toString()
                    }
                };
                promises.push(axios.post(`/en/api/v2/feedbacks/report_inappropriate_profile`, data));
                // promises.push(RBService.reportUser(userToken, feedbacks[key].specId, feedbacks[key].comment));
            }
        }
        if (promises.length === 0) {
            return;
        }

        dispatch(startReporting());
        axios.all(promises)
            .then(arr => {
                for(let i=0; i<arr.length; i++) {
                    if (arr[i].status !== 200) {
                        throw { message : 'Unsuccessful report' }
                    }
                }
                dispatch(reportSuccess())
            })
            .catch((error) => {
                dispatch(reportFailure())
                console.log("Problem with report user: " + error.message)
            })
            .then(() => {
                console.log("done");
                dispatch(resetSelection());
                setTimeout(() => {
                    dispatch(closeReportModal());
                }, 2000)
            });

    }
}

export default {
    openReportModal: openReportModal,
    closeReportModal: closeReportModal,
    submitReport: submitReport,
    reportFailure: reportFailure,
    reportSuccess: reportSuccess,
    selectReportReason: selectReportReason,
    unselectReportReason: unselectReportReason
};
