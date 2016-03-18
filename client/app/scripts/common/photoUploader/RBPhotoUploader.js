var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import {injectIntl,FormattedMessage} from 'react-intl';
import RBService from '../../services/RBService';
import perfectScrollbar from 'perfect-scrollbar';
import {changeProfilePhoto} from '../../actions/MeActionCreators';
import PhotoCropper from './PhotoCropper';

var RBPhotoUploader = React.createClass({
    cropperSelector:'.rb-photo-cropper >img',
    initState:{
        photo:null,
        uploadProgress:0,
        showCropper:false,
        uploading:false,
        uploadFailed:false,
        fromExistingPhoto:null
    },
    getInitialState:function(){
        return this.initState;
    },
    getDefaultProps:function(){
        return {
            title:'common.change_profile_photo',
            subTitle:null
        }
    },
    reset:function(options={}){
        this.setState(Object.assign(this.initState,options));
    },
    initializePerfectScrollbar: function() {
      perfectScrollbar.initialize(document.getElementById("uploader_photos_scrollbar"),
        { suppressScrollX: true }
      );
      $(document).on('ps-scroll-y', function () {
        $( ".ps-container.ps-active-y > .ps-scrollbar-y-rail" ).css( "display", "block" ).delay(1000).fadeOut( "slow" );
      });
    },
    componentDidMount: function() {
        this.initializePerfectScrollbar();
        this.initDropzone();
    },
    initDropzone:function(){
      console.log("DROPZONE COUNT: " + ($('#rb-desktop-profile-dropzone').length));
      if($('#rb-desktop-profile-dropzone').length) {
        console.log("Dropzone initialzied");
        var dz = RB.avatarDropZone = new Dropzone("#rb-desktop-profile-dropzone",{
            url:RBService.photoUploadUrl,
            headers:{
                "X-2RB-API-VERSION":"v2",
                "X-MOBILE-DEVICE":"iPhone",
                "X-2RB-APNS-DEVICE-TOKEN":"API_TEST",
                "X-2RB-WEBVIEW": '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)'
            },
            paramName:'user_photo[picture]',
            clickable:true,
            previewsContainer:null,
            autoProcessQueue: false,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        });
        dz.on("addedfile", function(file) {
            var reader = new FileReader();
            reader.onload = function(){
                this.setState({photo:reader.result});
            }.bind(this)
            reader.readAsDataURL(file);
        }.bind(this));
        dz.on('sending',function(file,xhr,formData){
            formData.append('user_photo[is_main]',true);
            if(this.refs.photoCropper){
                var data = this.refs.photoCropper.getData();
                console.log(data);
                formData.append('user_photo[crop_x]',data.x);
                formData.append('user_photo[crop_y]',data.y);
                formData.append('user_photo[crop_w]',data.width);
                formData.append('user_photo[crop_h]',data.height);
                formData.append('user_photo[rotate]',data.rotate);
            }
        }.bind(this))
        dz.on('uploadprogress',function(file,progress){
            console.log(progress);
            this.setState({uploadProgress:progress});
        }.bind(this))

        dz.on('success',function(file,response){
            const photo = {user_photo:response.user_photo};
            this.reset();
            this.props.dispatch(changeProfilePhoto(photo));
            this.props.onSuccess && this.props.onSuccess();
        }.bind(this))
        dz.on('error',function(file,progress){
            this.setState({uploadFailed:true});
        }.bind(this))
      }
    },
    tryAgain:function(){
        this.reset();
        this.props.onTryAgain && this.props.onTryAgain();
    },
    onCropperReady:function(){
        console.log('on ready')
        if(!this.state.showCropper){
            this.setState({showCropper:true});
        }
    },
    resetUploader:function() {
      this.setState(Object.assign(this.initState,{}));
      setTimeout(this.initDropzone, 100);
    },
    onClose:function(){
        this.props.onClose && this.props.onClose();
    },
    onCancel:function(){
        this.props.onCancel && this.props.onCancel();
    },

    onSave:function(){
        if(this.state.fromExistingPhoto){
            this.setState({uploading:true});
            var cropData = this.refs.photoCropper.getData();
            RBService.setAsMainPhoto(this.state.fromExistingPhoto.user_photo.id,cropData)
            .then(function(){
                this.reset();
                this.props.dispatch(changeProfilePhoto(this.state.fromExistingPhoto));
                this.props.onSuccess && this.props.onSuccess(this.state.fromExistingPhoto);
            }.bind(this))
            .catch(function(){
                this.setState({uploadFailed:true,uploading:false})
            }.bind(this))
        }else{
            RB.avatarDropZone.processQueue();
            this.setState({uploading:true});
        }
    },
    onSetMainFromExistingPhoto:function(photo){
        if(!this.state.uploading){
            this.setState({fromExistingPhoto:photo});
            if(!this.state.photo){
                this.setState({photo:photo.user_photo.large_image_url})
            }else{
                this.refs.photoCropper.replace(photo.user_photo.large_image_url);
            }
        }
    },

    componentWillUnmount:function(){
        console.log('unmount uploader')
    },

    render() {

        var photolist = this.props.photos && this.props.photos.map(function(p){
                return <img className="uploader_img" onClick={this.onSetMainFromExistingPhoto.bind(null,p)}
                            key={p.user_photo.id} src={p.user_photo.small_image_url} /> ;
            }.bind(this));
        const hasExistingPhotos = this.props.photos && this.props.photos.length>0;
        var uploadProgressStyle = {width:this.state.uploadProgress + '%'};
        var saveButtonCls = this.state.uploading?'save uploading':'save';
        var uploadStatus = null;
        if (this.state.uploading) {
            if (this.state.uploadFailed) {
                uploadStatus =  <div className="uploading-status">

                    <div className="uploading-status_failed">
                        <div className="uploading-status_tip"><FormattedMessage id="something_went_wrong_try_again" /></div>
                        <span className="uploading-status_try-again" onClick={this.tryAgain}>
                            <FormattedMessage id="yes" />
                        </span>
                    </div>
                    <div style={uploadProgressStyle} className="uploading-status_bar">
                    </div>
                </div>;
            } else {
                uploadStatus = <div className="uploading-status">
                    <div style={uploadProgressStyle} className="uploading-status_bar">
                    </div>
                </div>
            }
        }

        return (
                <div className="uploader">
                    <div className="uploader_container">
                        <div>
                            {!this.props.onQuickView &&
                                <button type="button" onClick={this.onClose}
                                        className="close close--uploader icon-button-close">
                                </button>
                            }
                            <div className="title uploader_title"><FormattedMessage id={this.props.title} /></div>

                        </div>
                        {this.props.subTitle && <div className="sub-title"><FormattedMessage id={this.props.subTitle} /></div> }
                        {!this.state.showCropper &&
                        <div id="rb-desktop-profile-dropzone" name="user_photo[picture]" className=" dropzone uploader_drag">
                            <div className="dz-message">
                            <div className="uploader_innerdiv"><FormattedMessage id="drag_and_drop_your_photo_here" /></div>
                            <div className="uploader_innerdiv">
                            <svg width="245px" height="68px" >

                                <g  transform="translate(-390.000000, -358.000000)" fill="#C6C6C6">
                                    <g id="lightbox" transform="translate(360.000000, 209.000000)">
                                        <g id="drag-area" transform="translate(15.000000, 54.000000)" >
                                            <g  transform="translate(15.000000, 48.000000)">
                                                <g id="computer-3-icon-+-picture-multi-2-icon-+-arrow-15-icon" transform="translate(0.000000, 47.000000)">
                                                    <path d="M198.604637,59.8528305 C197.819085,62.6053252 194.003795,66.3725716 191.216374,67.1480588 L226.484641,67.1480588 C223.792496,66.4611047 219.791917,62.5109015 219.096377,59.8528305 L198.604637,59.8528305 L198.604637,59.8528305 Z M240.609493,0.354107649 L177.091521,0.354107649 C174.66889,0.354107649 172.704921,2.29334556 172.704921,4.6854708 L172.704921,51.2086424 C172.704921,53.6009409 174.66889,55.5400056 177.091521,55.5400056 L240.609493,55.5400056 C243.032125,55.5400056 244.996094,53.6009409 244.996094,51.2086424 L244.996094,4.6854708 C244.996094,2.29334556 243.032125,0.354107649 240.609493,0.354107649 L240.609493,0.354107649 Z M237.60748,41.5476236 L180.093535,41.5476236 L180.093359,7.64985575 L237.607304,7.64950924 L237.607304,41.5476236 L237.60748,41.5476236 Z" id="computer-3-icon"></path>
                                                    <path d="M63.8377719,22.1280533 L57.1165581,0.354107649 L0.410958904,17.4197881 L13.4576196,59.6852171 L21.4536708,57.2787234 L21.4536708,66.3131331 L80.7344843,66.3131331 L80.7344843,22.1280533 L63.8377719,22.1280533 L63.8377719,22.1280533 Z M17.2844712,52.5920188 L7.59442068,21.199221 L53.2891217,7.44672851 L57.8211402,22.1282458 L21.4536708,22.1282458 L21.4536708,51.3372771 L17.2844712,52.5920188 L17.2844712,52.5920188 Z M74.9789027,60.6300272 L27.2086675,60.6300272 L27.2086675,27.8109667 L74.9789027,27.8109667 L74.9789027,60.6300272 L74.9789027,60.6300272 Z M34.812461,36.6324668 C34.812461,34.2371383 36.7792081,32.294772 39.2054737,32.294772 C41.6309594,32.294772 43.5977065,34.2371383 43.5977065,36.6324668 C43.5977065,39.0279877 41.6309594,40.9697765 39.2054737,40.9697765 C36.7792081,40.9697765 34.812461,39.0279877 34.812461,36.6324668 L34.812461,36.6324668 Z M57.093358,36.7710697 L49.8116368,46.986877 L45.8541627,42.9593064 L34.6878822,55.4867028 L69.5915988,55.4867028 L57.093358,36.7710697 L57.093358,36.7710697 Z" id="picture-multi-2-icon"></path>
                                                    <path d="M134.565722,22.0361897 L134.565722,13.4405995 L155.033745,33.6163779 L134.565722,53.7918674 L134.565722,45.1962772 L94.7911013,33.6163779 L134.565722,22.0361897 Z" id="arrow-15-icon"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            </div>
                            <div className="uploader_or"><FormattedMessage id="or" /></div>
                            <div><FormattedMessage id="click_to_browser_computer" /></div>
                            </div>
                        </div>
                        }
                        {!this.state.showCropper && !this.props.onQuickView &&
                        <span className="uploader_cancel" onClick={this.onCancel}><FormattedMessage id="cancel" /></span>
                        }
                        {uploadStatus}
                        {this.state.photo &&
                        <div  style={{visibility:this.state.showCropper}}>
                            <PhotoCropper ref="photoCropper" photo={this.state.photo} resetUploader={this.resetUploader} onReady={this.onCropperReady}></PhotoCropper>

                            <span className={ "uploader_" + saveButtonCls} onClick={this.onSave}><FormattedMessage id="save" /></span>
                        </div>
                        }


                    </div>
                    {hasExistingPhotos && <hr className="uploader_divider"/>}
                    {hasExistingPhotos &&
                      <div className="uploader_photos">
                        <div id="uploader_photos_scrollbar" className="uploader_photos_wrapper">
                            {photolist}
                        </div>
                      </div>
                    }
                </div>
        );
    }
});


export default connect()(RBPhotoUploader);
