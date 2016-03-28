require('../../styles/views/Profile.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import User from '../../models/User';
import RBService from '../../services/RBService';
import MsgPanel from '../../common/msgpanel/MsgPanel.js';
import ProfileSideBar from './ProfileSidebar.js';
import { ProfileContent } from './ProfileContent.js';
import { createUser, deleteUser } from '../../actions/UserActionCreators.js';
import { connect } from 'react-redux';

class Profile extends React.Component {
    componentWillMount() {
        var uid = this.props.user.overview && this.props.user.overview.token;
        var userId = this.props.params.id;
        //userId ='bK6n9ZJlyE';
        console.log('userId: ', userId)
        console.log('uid: ', uid)
        if(userId){
            if(userId == uid){
                this.setState({reload:false});
            }else{
                this.setState({reload:true});
                RBService.getUser(userId)
                .then(function(response){
                    //axios.get('/api/users/msk9d92aUm').then(function(response){
                    var user = (new User(response.data.user)).data;
                    this.props.dispatch(createUser(user));
                    this.setState({reload:false});
                }.bind(this))
            }
        }
    }

    componentWillUnmount() {
       // this.props.dispatch(deleteUser());
    }

    render() {
        if (this.props.user.overview && !this.state.reload) {
            return (
                <div className="rb-profile">
                    <ProfileSideBar onProfile />
                    <ProfileContent {...this.props} />
                </div>
            )
        } else {
            return null;
        }
    }
}


function mapStateToProps(state) {
    return { user: state.user }
}


Profile = connect(mapStateToProps)(Profile);
export default Profile;
