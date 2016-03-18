
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ImageResources from '../utils/ImageResources';
import {injectIntl,FormattedMessage} from 'react-intl';
import chatActionCreators from '../actions/ChatActionCreators';
import EmailConfirm from '../common/dialogs/EmailConfirm';

var QuickViewAvatar = React.createClass({
    getInitialState:function(){
        return {
            showEmailConfirm:false
        }
    },
    sendMessage: function() {
        const me = RB.getMe();
        const peerOverview = this.props.overview;
        if(!me.overview.emailConfirmed){
            this.setState({showEmailConfirm:true});
        }else{
            this.props.actions.openChatPanel(peerOverview);
        }
    },
    onCloseEmailConfirm:function(){
        this.setState({showEmailConfirm:false});
    },
    viewProfile:function(e){
        var token = this.props.overview.token;
        if(token && e.nativeEvent.which == 1 && !e.metaKey ){
            this.props.viewProfile && this.props.viewProfile(token);
            e.preventDefault();
        }
    },
    render: function() {
        var {overview,photos} = this.props;
        var isOnline = overview && overview.isOnline;
        var name = overview && overview.name;
        var address = overview && overview.address;
        var photo = photos && photos[0];

        const isVIP = overview && overview.isVIP;
        const isStaff = overview && overview.userType==2;
        const noProfile = RB.getMe().overview.mainPhoto.isSystemDefault;
        //isOnline=true;
        //isVIP=true;
        var viewProfileLink = this.props.overview? '/profile/'+this.props.overview.token : '#';
        return(
            <div className="rb-quickview-avatar">
                {noProfile && <div className="no-profile-mask"/> }
                {this.state.showEmailConfirm && <EmailConfirm onClose={this.onCloseEmailConfirm}/>}
                <div className="rb-quickview-avatar_avatar" >
                    <div className="rb-quickview-avatar_cover">
                        { isOnline && <div className="rb-quickview-avatar_online"></div> }
                        { isVIP  && !isStaff && <span className="vip-badge ">VIP</span> }
                        { isStaff && <span className="staff-badge "><FormattedMessage id="staff"/></span> }
                    </div>
                    <img className="rb-quickview-avatar_img" src={photo?photo.user_photo.small_image_url:ImageResources.no_photo_thumb}></img>
                </div>
                <div className="rb-quickview-avatar_user-info">
                    <div className="rb-quickview-avatar_name-address">
                        <span className="rb-quickview-avatar_name">{name}</span>
                        <div className="rb-quickview-avatar_address">{address}</div>
                    </div>
                    <div className="rb-quickview-avatar_actions">
                        <span className="rb-quickview-avatar_message" onClick={this.sendMessage}><FormattedMessage id="message"/></span>
                        <Link to={viewProfileLink} target="_blank" className="rb-quickview-avatar_more" onClick={this.viewProfile}><FormattedMessage id="sidebar.profile"/></Link>
                    </div>
                </div>
            </div>

        )
    }
})

const mapStateToProps = (state) => ({
  peers : state.chat.peers
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(chatActionCreators, dispatch)
})

QuickViewAvatar = injectIntl(QuickViewAvatar);
export default connect(mapStateToProps, mapDispatchToProps)(QuickViewAvatar);
