import React from 'react';
import ReactDOM from 'react-dom';
import {injectIntl,FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import { History } from 'react-router';
import { bindActionCreators } from 'redux';
import RBNotify from '../../common/notification/RBNotify.js';
import RBService from '../../services/RBService.js';
import UserActionCreators from '../../actions/UserActionCreators.js';
import ChatActionCreators from '../../actions/ChatActionCreators';
import RBCheckBox from "../../common/RBCheckBox.js";
import EmailConfirm from '../../common/dialogs/EmailConfirm';

var ProfileMessages = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            activeItem: 'Message',
            winked: false,
            favorited: this.props.overview.favorited,
            animation: '',
            useDiamonds:false,
            showEmailConfirm:false
        }
    },
    onAction: function(e) {
        var isVIP = this.props.overview.isVIP || this.props.meOverview.isVIP;
        if (this.state.activeItem =='Message') {
            if(this.state.useDiamonds){
                RBService.consumingDiamonds('message_user',this.props.overview.token)
                .then(function(){
                    this.sendMessage();
                }.bind(this))
            }else{
                this.sendMessage();
            }

        } else if(this.state.activeItem =="Wink") {
            if (!this.state.winked) {
                this.setState({winked:true});
            }
        } else {
            this.handleFavoriteActions()
        }
    },
    sendMessage:function(){
        const peerOverview = this.props.overview;
        const message = this.refs.messageInput.value;
        const me = RB.getMe();
        if(!me.overview.emailConfirmed){
            this.setState({showEmailConfirm:true});
        }else {
            this.props.actions.openChatPanel(peerOverview)
                .then(() => this.props.actions.sendMessage(message, peerOverview.token));
            this.refs.messageInput.value = '';
        }
    },
    handleFavoriteActions: function() {
        var token = this.props.overview.token;
        this.setState({animation:'fadeOut'});
        if(this.props.overview.favorited){
            RBService.unFavorite(token)
            .then(function(response){
                this.setState({favorited:false, animation:'fadeIn'});
                this.props.actions.unFavorite();
            }.bind(this),function(info){})
        }else{
            RBService.favorite(token)
            .then(function(response){
                this.setState({favorited:true, animation:'fadeIn'});
                this.props.actions.favorite();
            }.bind(this),function(info){})
        }
    },
    onCloseEmailConfirm:function(){
        this.setState({showEmailConfirm:false});
    },
    switchTab:function(tab){
        this.setState({activeItem:tab});
        if(tab =='Favorite' ){
            if(this.props.overview.favorited){
                this.setState({favorited:true});
            }else{
                this.setState({favorited:false});
            }

        }
    },
    gotoVIPPlan:function(){
        this.history.pushState(null,'/settings/vip_status');
    },
    toggleConsumeDiamonds:function(name,value,checked){
        this.setState({useDiamonds:checked});
    },
    render: function() {
        var formatMessage = this.props.intl.formatMessage;
        var tabs=['Message','Wink','Favorite'];
        var tips = {
            'Message':formatMessage({id:'write_something_meaningful'}),
                'Wink':formatMessage({id:'you_can_only_send_six_winks_tip'}),
                'Winked':formatMessage({id:'you_just_winked_name'},{name:this.props.overview.name}),
                'Favorite':formatMessage({id:'adding_them_as_favorite_notify'}),
                'Favorited':formatMessage({id:'you_just_favorited_name'},{name:this.props.overview.name})
        };
        var tabWordings = {
            'Message':formatMessage({id:'message'}),
            'Wink':formatMessage({id:'wink'}),
            'Favorite':formatMessage({id:'favorite'}),
            'Favorited':formatMessage({id:'favorited'})
        }
        var buttonWordings ={
            'Message':formatMessage({id:'send'}),
                'Wink':formatMessage({id:'wink'}),
                'Winked':formatMessage({id:'winked'}),
                'Favorite':formatMessage({id:'add_favorite'}),
                'Favorited':formatMessage({id:'favorited'})
        };
        var icons = {
            "Message":"icon-msg-bubble",
            "Wink":"icon-msg-wink",
            "Favorite":"icon-msg-favorite",
            "Favorited":"icon-msg-favorited"
        }
        var action = buttonWordings[this.state.activeItem];
        var tip = tips[this.state.activeItem];
        var abCls = 'button';
        if(this.state.activeItem =='Wink' && this.state.winked){
            action = buttonWordings['Winked'];
            tip = tips['Winked'];
            abCls += ' disabled'
        }
        if(this.state.activeItem =='Favorite' && this.state.favorited){
            action = buttonWordings['Favorited'];
            tip = tips['Favorited'];
        }
        var isVIP = this.props.overview.isVIP || this.props.meOverview.isVIP;
        var cls = 'rb-profile-message ' + this.state.activeItem;
        if(isVIP){
            cls += ' vip';
        }

        var tipCls = 'animated ' + this.state.animation;

        var menus = tabs.map(function(item){
            var tab = tabWordings[item];
            var icon = icons[item];
            if(item =='Favorite' && this.state.favorited){
                tab = tabWordings['Favorited'];
                icon = icons['Favorited'];
            }

            if(item == this.state.activeItem){
                return (
                    <li key={item} className="rb-profile-message_tab_item active"><a className="rb-profile-message_tab_link" onClick={this.switchTab.bind(null,item)} ><i className={"rb-profile-message_tab_icon " + icon}></i><span className="rb-profile-message_tab_text">{tab}</span></a></li>
                )
            }else{
                return (
                    <li key={item} className="rb-profile-message_tab_item"><a className="rb-profile-message_tab_link" onClick={this.switchTab.bind(null,item)} ><i className={"rb-profile-message_tab_icon " + icon}></i><span className="rb-profile-message_tab_text">{tab}</span></a></li>
                )
            }

        }.bind(this));
        return(
            <div className={cls}>
                {this.state.showEmailConfirm && <EmailConfirm onClose={this.onCloseEmailConfirm}/>}
                {!isVIP &&
                <div className="rb-profile-message_no-vip-tips">
                    <div><a className="rb-profile-message_no-vip-tips_link" onClick={this.gotoVIPPlan}><FormattedMessage id="only_vips_get_unlimited_messaging" /></a></div>
                    <div className="rb-profile-message_use-diamonds">
                        <RBCheckBox value={this.state.useDiamonds} checkboxId="profile-use-diamonds" onChange={this.toggleConsumeDiamonds}
                            checkboxLabel={this.props.intl.formatMessage({id:"use_ten_diamonds_to_unlock"})} />
                    </div>
                </div>
                }
                <div className="rb-profile-message_arrow-box arrow-box">
                    {this.state.activeItem =='Message' &&
                    <textarea className="rb-profile-message_input" ref="messageInput" placeholder={tip}/>
                    }
                    {this.state.activeItem !='Message' &&
                    <div key={tip} className={"rb-profile-message_div " + tipCls}>
                        <span>{tip}</span>
                    </div>
                    }
                </div>
                <div className="rb-profile-message_actions">
                    <div className="rb-profile-message_tab">
                        <ul>
                            {menus}
                        </ul>
                    </div>
                    <span className={"rb-profile-message_" + abCls}  onClick={this.onAction}>{action}</span>
                </div>
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        meOverview:state.me.overview,
        overview: state.user.overview,
        peers: state.chat.peers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign({},
            ChatActionCreators,
            UserActionCreators), dispatch)
    }
}

ProfileMessages = injectIntl(ProfileMessages);
ProfileMessages = connect(mapStateToProps, mapDispatchToProps)(ProfileMessages);

export default ProfileMessages;
