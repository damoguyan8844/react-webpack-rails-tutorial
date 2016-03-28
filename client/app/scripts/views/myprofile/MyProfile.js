
require('../../styles/views/MyProfile.scss');

var React = require('react');
var ReactDOM = require('react-dom');

import MyProfileContent from './MyProfileContent.js';
import MyProfileSidebar from './MyProfileSidebar.js';

var MyProfile = React.createClass({
    componentWillMount:function(){
    },
    render: function(){
        return(
            <div className="rb-myprofile">

                    <MyProfileSidebar onProfile={false}  />

                    <MyProfileContent {...this.props} />

            </div>
        )
    }
});

export default  MyProfile;
