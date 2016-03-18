
var React = require('react');

import {connect} from 'react-redux';


import Sidebar from '../../components/Sidebar.js';


var ProfileSideBar = React.createClass({
    render: function() {
        return(
            <Sidebar {...this.props} />
        )
    }
});

function mapStateToProps(state){
    return {
        user:state.user
    }
}

ProfileSideBar = connect(mapStateToProps)(ProfileSideBar)
export default ProfileSideBar;