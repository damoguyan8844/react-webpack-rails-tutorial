
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import Overview from './Overview.js';
import Avatar from '../../components/Avatar.js';


var MyProfileSideBar = React.createClass({

    render: function() {
        //console.log('get user')
        return(
            <div className="rb-myprofile-sidebar">
                <Avatar {...this.props} editMode={true}   />
                <Overview />
            </div>

        )
    }
});

function mapStateToProps(state){
    return {
        photos:state.me.photos,
        overview:state.me.overview
    }
}

MyProfileSideBar = connect(mapStateToProps)(MyProfileSideBar)
export default MyProfileSideBar;

