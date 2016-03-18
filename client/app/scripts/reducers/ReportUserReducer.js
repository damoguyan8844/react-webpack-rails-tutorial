import Constants from '../actions/Constants';

const initialState = {
    isReporting: false,
    showReportModal: false,
    checkboxes: {
        reportUserAbusiveMessage: {
            name: "Abusive Message",
            comment: "Abusive Message",
            specId: 12,
            checked: false
        },
        reportScammer: {
            name: "Scammer",
            comment: "Scammer",
            specId: 13,
            checked: false
        },
        reportFakeUser: {
            name: "Fake User",
            comment: "Fake User",
            specId: 12,
            checked: false
        }
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
    case Constants.REPORT_USER.OPEN:
        return Object.assign({}, state, {showReportModal: true});
    case Constants.REPORT_USER.CLOSE:
        return Object.assign({}, state, {showReportModal: false});
    case Constants.REPORT_USER.SELECT:
        return Object.assign({}, state, {
            checkboxes: Object.assign({}, state.checkboxes, {
                [action.key]: Object.assign({}, state.checkboxes[action.key], {
                    checked: true
                })})});
    case Constants.REPORT_USER.UNSELECT:
        return Object.assign({}, state, {
            checkboxes: Object.assign({}, state.checkboxes, {
                [action.key]: Object.assign({}, state.checkboxes[action.key], {
                    checked: false
                })})});
    case Constants.REPORT_USER.START_PROCESSING:
        return Object.assign({}, state, {isReporting: true});
    case Constants.REPORT_USER.SUCCESS:
        return Object.assign({}, state, {isReporting: false});
    case Constants.REPORT_USER.FAILURE:
        return Object.assign({}, state, {isReporting: false});
    case Constants.REPORT_USER.RESET:
        return Object.assign({}, initialState);
    default:
        return state;
    }
}
