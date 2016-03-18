var React = require('react');
var ReactDOM = require('react-dom');

import {connect} from 'react-redux';
import BriefDetail from '../../components/BriefDetail.js';

var Overview = React.createClass({

    render: function() {
        return(
            <BriefDetail {...this.props} onProfile  />
        )
    }
});

function mapStateToProps(state){
    return {
        user:state.user
    }
}

Overview = connect(mapStateToProps)(Overview)

export default Overview;