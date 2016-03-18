import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';

import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';


var PrintTest = React.createClass({
    render: function() {
        return (
            <div>dgdfgdfgdfffdsfdfgsfgfdgdgdfgfdfg****************************************************************************************************************************************</div>
        )
    }
});

function mapStateToProps(state){
    return {
    }
}

PrintTest = connect(mapStateToProps, {showEventList})(PrintTest)

export default PrintTest;
