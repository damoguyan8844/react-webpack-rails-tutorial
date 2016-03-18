var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import UserList from '../search/SearchResult.js';
import Paginator from '../../common/paginator/Paginator.js';
import {createVisitors,createFavorited,createVisited,createFavoritedMe,setLoadingData} from '../../actions/ConnectionsActionCreators.js';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import RBService from '../../services/RBService.js';
import SearchUser from '../../models/SearchUser.js';
var loading_nextpage = {
    visitors:false,
    visited:false,
    favorited:false,
    favoritedMe:false
};

var ConnectionList = React.createClass({
    getInitialState:function(){
        return {
            isFirstLoad: true
        }
    },
    callServiceByTab:function(tab,page,isFirst){
        if(loading_nextpage[tab] && !isFirst)
            return;
        var param = page>1 ? "?page=" + page + "&pagination_token=" + this.props[this.props.activeItem].pageToken : "";
        loading_nextpage[tab]=true;
        var loading = jQuery.extend(true,{}, this.props.loading);
        if(!isFirst){
            loading[tab] = true;
            this.props.setLoadingData(loading);
        }
        switch (tab) {
            case "visitors":
                RBService.getVisitors(param)
                    .then(function(response){
                        var userList = response.data.visitations.map(function(u){
                            return (new SearchUser(u.visitation.user)).data;
                        });
                        var preList = this.props["visitors"] && !isFirst ? this.props["visitors"].users.concat() : [];
                        preList = preList.concat(userList);
                        this.props.createVisitors(preList,page,response.data.next_page==null ? page : 1000,response.data.pagination_token);
                        loading_nextpage[tab]=false;
                        if(this.props.activeItem == "visitors" && this.state.isFirstLoad)
                            this.quickView(preList[0]);
                        var loading = jQuery.extend(true,{}, this.props.loading);
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                        this.setState({isFirstLoad:false});
                    }.bind(this)).catch(function(response){
                        loading_nextpage[tab]=false;
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                        console.log("getConstantData error:",response);
                    }.bind(this));
                break;
            case "visited":
                RBService.getVisitedUsers(param)
                    .then(function(response){
                        var userList = response.data.visitations.map(function(u){
                            return (new SearchUser(u.visitation.user)).data;
                        });
                        var preList = this.props["visited"] && !isFirst ? this.props["visited"].users.concat() : [];
                        preList = preList.concat(userList);
                        this.props.createVisited(preList,page,response.data.next_page==null ? page : 1000,response.data.pagination_token);
                        loading_nextpage[tab]=false;
                        if(this.props.activeItem == "visited" && this.state.isFirstLoad)
                            this.quickView(preList[0]);
                        var loading = jQuery.extend(true,{}, this.props.loading);
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                        this.setState({isFirstLoad:false});
                    }.bind(this)).catch(function(response){
                        loading_nextpage[tab]=false;
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                    }.bind(this));
                break;
            case "favorited":
                RBService.getFavoritedUsers(param)
                    .then(function(response){
                        console.log(response);
                        var userList = response.data.favoritisms.map(function(u){
                            return (new SearchUser(u.favoritism.favorite_user.user)).data;
                        });
                        var preList = this.props["favorited"]&& !isFirst ? this.props["favorited"].users.concat() : [];
                        preList = preList.concat(userList);
                        this.props.createFavorited(preList,page,response.data.next_page==null ? page : 1000,response.data.pagination_token);
                        loading_nextpage[tab]=false;
                        if(this.props.activeItem == "favorited" && this.state.isFirstLoad)
                            this.quickView(preList[0]);
                        var loading = jQuery.extend(true,{}, this.props.loading);
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                        this.setState({isFirstLoad:false});
                    }.bind(this)).catch(function(response){
                        loading_nextpage[tab]=false;
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                    }.bind(this));
                break;
            case "favoritedMe":
                RBService.getFavoritedMeUsers(param)
                    .then(function(response){
                        console.log(response);
                        var userList = response.data.favoritisms.map(function(u){
                            return (new SearchUser(u.favoritism.user)).data;
                        });
                        var preList = this.props["favoritedMe"]&& !isFirst ? this.props["favoritedMe"].users.concat() : [];
                        preList = preList.concat(userList);
                        this.props.createFavoritedMe(preList,page,response.data.next_page==null ? page : 1000,response.data.pagination_token);
                        if(this.props.activeItem == "favoritedMe" && this.state.isFirstLoad)
                            this.quickView(preList[0]);
                        var loading = jQuery.extend(true,{}, this.props.loading);
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                        this.setState({isFirstLoad:false});
                    }.bind(this)).catch(function(response){
                        loading_nextpage[tab]=false;
                        loading[tab] = false;
                        this.props.setLoadingData(loading);
                    }.bind(this));
                break;
        };
        this.initScroll();
    },
    onChangePage: function(page) {
        this.callServiceByTab(this.props.activeItem,page,false);
    },
    quickView:function(searchUser){
        this.props.onQuickView(searchUser);
    },
    onEditAvatar:function(){
        this.props.onEditAvatar();
    },
    componentWillUnmount: function() {

    },
    componentWillReceiveProps:function(nextProps){
        console.log("nextProps:" + nextProps.params);
        console.log("this.state.acitveItem:" + this.props.activeItem);
    },
    initScroll: function(){

    },
    render:function(){
        const {formatMessage} = this.props.intl;
        var tab = this.props.activeItem;
        if(this.props[tab]){

        }
        else{
            this.callServiceByTab(tab,1,true);
        }
        console.log(this.props.loading[tab]);
        return(
            <div>
                 { this.props[this.props.activeItem] && <UserList users={this.props[this.props.activeItem].users} is_quick_view={this.props.isQuickView} onQuickView={this.quickView}
                              platform="web" onEditAvatar={this.onEditAvatar} sourceFrom="connections" /> }
                { this.props.loading[tab] && <div className="loading"><object data="/app/images/tail-spin.svg" type="image/svg+xml"></object></div>}

            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        visitors:state.connections.visitors,
        favorited:state.connections.favorited,
        visited:state.connections.visited,
        favoritedMe:state.connections.favoritedMe,
        loading:state.connections.loading
    }
}

ConnectionList = connect(mapStateToProps,{createVisitors,createFavorited,createVisited,createFavoritedMe,setLoadingData})(ConnectionList)
export default injectIntl(ConnectionList);