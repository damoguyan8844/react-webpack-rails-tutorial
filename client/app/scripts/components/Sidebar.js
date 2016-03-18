
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import BriefDetail from './BriefDetail.js';
import Avatar from './Avatar.js';


var SideBar = React.createClass({
    render: function() {
        return(
            <div className="rb-profile-sidebar">
                <Avatar {...this.props.user}  />
                <BriefDetail {...this.props} />
            </div>
        )
    }
});

export default SideBar;