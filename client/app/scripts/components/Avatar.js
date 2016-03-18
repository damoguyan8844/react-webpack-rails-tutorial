
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import ChangeProfilePopover from '../common/photoUploader/ChangeProfilePopover';
import ImageResources from '../utils/ImageResources';
import {injectIntl,FormattedMessage} from 'react-intl';
import {openLightBox } from '../actions/LightBoxActionCreators';

var Avatar = React.createClass({

    getInitialState:function(){

        return {
            editMode:this.props.editMode,
            currentIndex:0,
            showPhotoUploader:false
        }
    },
    onEditAvatar:function(){
       // this.refs.photoUploader.show();
        this.setState({showPhotoUploader:true});
    },
    onClosePhotoUploader:function(){
        this.setState({showPhotoUploader:false});
    },
    profilePhotoChanged(){
        this.setState({showPhotoUploader:false});
    },
    showPrev:function(){
        var index = (this.state.currentIndex-1) % this.props.photos.length;
        if(index < 0){
            index += this.props.photos.length;
        }
        this.setState({currentIndex:index});
    },
    showNext:function(){
        var index = (this.state.currentIndex+1) % this.props.photos.length;
        this.setState({currentIndex:index});
    },
    showLightbox:function(){
        if(!this.state.editMode && !RB.isMobileLayout()){
            this.props.dispatch(openLightBox(this.props.overview,this.props.photos,0,false));
        }
    },
    render: function() {
        var isOnline = this.props.overview && this.props.overview.isOnline;
        var name = this.props.overview && this.props.overview.name;
        var address = this.props.overview && this.props.overview.address;
        var photo = this.props.photos && this.props.photos[this.state.currentIndex];
        /*
        var avatarStyle = photo?{backgroundImage: 'url('+ photo.user_photo.mobile_image_url +')'}:null;
        if(!avatarStyle){
            avatarStyle = {backgroundImage: 'url('+ ImageResources.no_profile+ ')'};
        }
        */
        const isVIP = this.props.overview && this.props.overview.isVIP;
        const isStaff = this.props.overview && this.props.overview.userType==2;
        var coverCls = 'rb-avatar-cover';
        if(this.state.editMode){
            coverCls += ' edit-mode';
        }
        return(
        <div className="rb-profile-avatar">
            {this.state.showPhotoUploader && <ChangeProfilePopover onClose={this.onClosePhotoUploader}  photos={this.props.photos} onSuccess={this.profilePhotoChanged}></ChangeProfilePopover> }
            <div className={coverCls} onClick={this.showLightbox} >
                <div className="profile-avatar_arrows">
                    <a className="profile-avatar_arrow pull-left" onClick={this.showPrev}><i className="profile-avatar_icon icon-photo-arrow-left"></i></a>
                    <a className="profile-avatar_arrow pull-right" onClick={this.showNext}><i className="profile-avatar_icon icon-photo-arrow-right"></i></a>
                </div>
                <div>
                    <div className="profile-avatar_user-info">
                        { isOnline && <span className="profile-avatar_online"><FormattedMessage id="online"/></span> }
                        <div className="profile-avatar_name-address">
                            <span className="profile-avatar_name">{name}</span>
                            { isVIP && !isStaff && <span className="vip-badge">VIP</span> }
                            { isStaff && <span className="staff-badge"><FormattedMessage id="staff"/></span> }
                            <div className="profile-avatar_address">{address}</div>
                        </div>
                    </div>
                    <div className="profile-avatar_change">
                        <a className="profile-avatar_change_link" onClick={this.onEditAvatar}>
                            <svg className="profile-avatar_change_svg" width="33px" height="33px" >

                                <g id="change-profile-photo-icon">
                                    <circle id="Oval-31" opacity="0.75" fill="#FFFFFF" filter="url(#filter-1)" cx="16.5" cy="16.5" r="16.5"></circle>
                                    <path d="M20.9970874,15.5593325 L13.4550364,23.1012743 L9,23.9235073 L9.89872573,19.5449636 L17.4407767,12.002949 L20.9970874,15.5593325 L20.9970874,15.5593325 Z M22.0826578,14.4737257 L24,12.5563835 L20.4436165,9 L18.5262743,10.9173786 L22.0826578,14.4737257 L22.0826578,14.4737257 Z" id="edit-/-mobile" fill="#000000"></path>
                                </g>
                            </svg>
                            <span className="profile-avatar_change_text"><FormattedMessage id="common.change_profile_photo"/></span>
                        </a>

                    </div>
                </div>
            </div>

            <img className="profile-avatar_img" src={photo?photo.user_photo.mobile_image_url:ImageResources.no_profile}></img>

        </div>

        )
    }
})

export default connect()(Avatar);
