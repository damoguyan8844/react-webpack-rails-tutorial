require('../styles/components/quickview.scss');
var React = require('react');
import {connect} from 'react-redux';
import BriefDetail from './BriefDetail.js';
import QuickViewAvatar from './QuickViewAvatar.js';
import RBPhotoUploader from '../common/photoUploader/RBPhotoUploader';

var QuickViewSideBar = React.createClass({
    profilePhotoChanged:function(){
        this.props.reload && this.props.reload();
    },
    render: function() {
        const noProfile = this.props.overview && this.props.overview.mainPhoto.isSystemDefault;
        return(
            <div className="rb-quickview-sidebar">
                {noProfile &&
                <RBPhotoUploader onQuickView={true} onSuccess={this.profilePhotoChanged}
                                 title="set_a_profile_photo" subTitle="we_cant_let_you_do_without_photo"/>
                }
                <QuickViewAvatar {...this.props.user} viewProfile={this.props.viewProfile} />

                <BriefDetail {...this.props} onProfile={false} />
            </div>
        )
    }
});
function mapStateToProps(state){
    return {
        overview:state.me.overview
    }
}

export default connect(mapStateToProps)(QuickViewSideBar);