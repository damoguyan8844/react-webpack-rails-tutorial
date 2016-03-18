
var React = require('react');

import {connect} from 'react-redux';
import { History } from 'react-router';

import QuickViewSideBar from '../../components/QuickViewSideBar.js';
import {createUser} from '../../actions/UserActionCreators.js';
import {destroySearchUser} from '../../actions/SearchActionCreators.js';


var SearchSidebar = React.createClass({
    mixins: [History],
    viewProfile:function(token){
        if(this.props.user && !this.props.searchUser){
            this.props.createUser(this.props.user)
        }
        this.history.pushState(null,'/profile/'+token);
    },
    onReload:function(){
        if(this.props.searchUser){
            this.props.reload && this.props.reload(this.props.searchUser);
        }
    },
    componentWillUnmount:function(){
        this.props.destroySearchUser();
    },
    render: function() {
        var user = this.props.user;
        var sUser = this.props.searchUser;
        var quickView = false;
        if(sUser){
            user = {overview:sUser,photos:[{user_photo:sUser.mainPhoto}]};
            quickView = true;
        }
        return(
            <div className="rb-search-sidebar search_sidebar">
                <QuickViewSideBar user={user} quickView={quickView} reload={this.onReload} viewProfile={this.viewProfile}   
                  sidebarHeight={this.props.sidebarHeight} setSidebar={this.props.setSidebar}/>
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        user:state.search.user,
        searchUser:state.search.searchUser
    }
}

SearchSidebar = connect(mapStateToProps,{createUser,destroySearchUser})(SearchSidebar)
export default SearchSidebar;
