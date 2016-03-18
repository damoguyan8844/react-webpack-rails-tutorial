var React = require('react');
var ReactDOM = require('react-dom');

import {connect} from 'react-redux';
import {injectIntl,FormattedMessage} from 'react-intl';
import { History } from 'react-router';
import { bindActionCreators } from 'redux';
import RBService from '../../services/RBService.js';
import {favorite,unFavorite} from '../../actions/UserActionCreators.js';
import RBNotify from '../../common/notification/RBNotify.js';
import EmailConfirm from '../../common/dialogs/EmailConfirm';
import BlockUser from '../../common/dialogs/BlockUser';
import { openBlockUserModal } from '../../actions/BlockUserActionCreators';

var BottomBar = React.createClass({
    mixins:[History],
    getInitialState:function(){
        return {
            blocked:false,
            reported:false,
            showMore:false,
            winked:false,
            showEmailConfirm:false
        }
    },
    showMore:function(){
        this.setState({ showMore: true });
    },
    onSendMessage:function(){
        const me = RB.getMe();
        const peerOverview = this.props.overview;

        if(!me.overview.emailConfirmed){
            this.setState({showEmailConfirm:true});
        }else {
            this.history.pushState(null, `/chat/${peerOverview.token}`);
        }
    },
    onCloseEmailConfirm:function(){
        this.setState({showEmailConfirm:false});
    },
    onToggleFavorite:function(){
        var token = this.props.overview.token;
        if(this.props.overview.favorited){
            this.props.unFavorite();
            RBService.unFavorite(token)
                .then(function(response){

                }.bind(this),function(info){})
        }else{
            this.props.favorite();
            RBService.favorite(token)
                .then(function(response){

                }.bind(this),function(info){})
        }
    },
    onToggleBlock:function(){
        if(this.state.blocked){
            this.setState({blocked:false});
        }else{
            RBService.blockUser(this.props.overview.token)
                .then(function(){
                    var name = this.props.overview.name;
                    var msg = `${name} has been blocked!`;
                    RBNotify.notify('simple',{title:msg});
                    this.setState({blocked:true});
                }.bind(this))
        }
    },
    toggleBlock:function(){
      this.setState({ blocked: !this.state.blocked });
    },
    onWink:function(){
        this.setState({winked:true});
    },
    onReport:function(){
        var name = this.props.overview.name;
        var msg = `${name} has been reported!`;
        RBNotify.notify('simple',{title:msg});
    },
    onClickBlock: function() {
      this.props.actions.openBlockUserModal();
    },
    render: function() {
        var me = this;
        var More = React.createClass({
            mixins: [
                require('react-onclickoutside')
            ],
            handleClickOutside() {
                me.setState({ showMore: false });
            },
            render: function() {
                return (
                    <div className="profile-bottom_other-menus">
                        <div className="profile-bottom_report"><a className="profile-bottom_report_link" onClick={me.onReport}><FormattedMessage id="report_user"/></a></div>
                        <div className="profile-bottom_block"><a className="profile-bottom_block_link" onClick={me.onClickBlock}><FormattedMessage id={me.state.blocked?"unblock_user":"block_user"}/></a></div>
                    </div>
                )
            }
        });
        //More = enhanceWithClickOutside(More);
        var favoriteIcon = this.props.overview.favorited?"icon-msg-favorited":"icon-msg-favorite";
        var winkCls = this.state.winked?'winked':'wink';

        return(

            <div className="profile-bottom_bar">
                <a className="profile-bottom_link message" onClick={this.onSendMessage} ><i className="profile-bottom_icon profile-bottom_icon--green icon-msg-bubble"></i>
                  <span className="profile-bottom_text"><FormattedMessage id="send_message"/></span>
                </a>
                <a className="profile-bottom_link favorite" onClick={this.onToggleFavorite} ><i className={"profile-bottom_icon " + favoriteIcon}></i></a>
                <a className={"profile-bottom_link " + winkCls} onClick={this.onWink} ><i className="profile-bottom_icon icon-msg-wink"></i></a>
                <a className="profile-bottom_link others"  onClick={this.showMore}><i className="profile-bottom_icon icon-button-more"></i></a>
                {this.state.showMore && <More/>}
                {this.state.showEmailConfirm && <EmailConfirm onClose={this.onCloseEmailConfirm}/>}
                <BlockUser blocked={this.state.blocked} user={this.props.overview} toggleBlock={this.toggleBlock} />
            </div>

        )
    }
});

function mapStateToProps(state){
    return {
        overview:state.user.overview
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, {openBlockUserModal,favorite,unFavorite}), dispatch)
    };
}

BottomBar = connect(mapStateToProps, mapDispatchToProps)(BottomBar)

export default BottomBar;
