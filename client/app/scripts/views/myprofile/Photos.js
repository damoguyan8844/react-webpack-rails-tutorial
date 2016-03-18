
var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {addPhoto,changeProfilePhoto,uploadingPhoto,uploadedPhoto} from '../../actions/MeActionCreators.js';
import {openLightBox, closeLightBox} from '../../actions/LightBoxActionCreators';
import {deletePhoto} from '../../actions/CommonActionCreators';
import RBService from '../../services/RBService';


var Photos = React.createClass({
    dZone:null,
    mZone:null,
    mpZone:null,
    getInitialState:function(){
        return {
            uploading:false,
            uploadProgress:0
        }
    },
    initDropzone:function(selector){
        var me = this;
        //console.log($('#rb-desktop-profile-dropzone'));

        var dz = new Dropzone(selector,{
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
            acceptedFiles: "image/jpeg,image/png,image/gif"
        });

        return dz;

    },
    componentDidMount: function() {
        var ddz = '#rb-desktop-myprofile-dropzone';
        var mp = '#rb-main-profile-dropzone';
        var mbz = '#rb-mobile-myprofile-dropzone';
        this.dZone = this.initDropzone(ddz);
        this.setHandlersForDesktop(this.dZone);
        this.mZone = this.initDropzone(mbz);
        this.setHandlersForMobile(this.mZone);
        if($(mp).length >0){
            this.mpZone = this.initDropzone(mp);
            this.setHandlersForMobile(this.mpZone,true);
        }
    },
    componentDidUpdate:function( prevProps, prevState){
        const w = $('.rb-myprofile-photos').width();
        $('.myphotos_photo.uploading').height(w*1.0233*0.31);
    },
    onLoadImage:function(e){
        if(e.target.width < e.target.height){
            $(e.target).addClass('portrait');
        }
    },
    setHandlersForDesktop:function(zone){
        zone.on('success',function(file,response){
            var photoId = file.name + file.lastModifiedDate.getTime();
            this.props.uploadedPhoto(photoId,{user_photo:response.user_photo});
        }.bind(this));
        zone.on('error',function(file,errorMessage){
            var photoId = file.name + file.lastModifiedDate.getTime();
            this.props.uploadedPhoto(photoId,null);
        }.bind(this));
        zone.on('uploadprogress',function(file,progress,bytesSent){
            var photoId = file.name + file.lastModifiedDate.getTime();
            this.props.uploadingPhoto(photoId,progress);
        }.bind(this));
        zone.on('processing',function(file){
            var reader = new FileReader();
            reader.onload = function(){
                this.props.addPhoto({
                    user_photo:{
                        id:file.name + file.lastModifiedDate.getTime(),
                        small_image_url:reader.result
                    },
                    uploading:true,
                    uploadProgress:0
                });
            }.bind(this);
            reader.readAsDataURL(file);

        }.bind(this))
    },
    setHandlersForMobile:function(zone,isMain){
        if(isMain){
            zone.on('sending',function(file,xhr,formData){
                formData.append('user_photo[is_main]',true);
            })
        }
        zone.on('uploadprogress',function(file,progress,bytesSent){
            var photoId = file.name + file.lastModifiedDate.getTime();
            this.props.uploadingPhoto(photoId,progress);
        }.bind(this));
        zone.on('processing',function(file){
            var reader = new FileReader();
            reader.onload = function(){
                this.props.addPhoto({
                    user_photo:{
                        id:file.name + file.lastModifiedDate.getTime(),
                        small_image_url:reader.result
                    },
                    uploading:true,
                    uploadProgress:0
                });
            }.bind(this);
            reader.readAsDataURL(file);

        }.bind(this))
        zone.on('error',function(file,errorMessage){
            var photoId = file.name + file.lastModifiedDate.getTime();
            this.props.uploadedPhoto(photoId,null);
        }.bind(this));
        zone.on('success',function(file,response){
            var photoId = file.name + file.lastModifiedDate.getTime();
            this.props.uploadedPhoto(photoId,{user_photo:response.user_photo});
            if(isMain){
                this.props.changeProfilePhoto({user_photo:response.user_photo});
            }

        }.bind(this))
    },
    onClickPhoto:function(index){
        this.props.openLightBox(this.props.overview,this.props.photos,index,true);
    },
    deleteFailedPhoto:function(photo,e){
        this.props.deletePhoto(photo);
       // e.stopPropagation();
    },
    deleteFlaggedPhoto:function(photo){
        RBService.deletePhoto(photo.user_photo.id)
        .then(function(){
            this.props.deletePhoto(photo);
        }.bind(this))
    },
    render: function() {
        console.log('render photos')
        var photos = this.props.photos.map(function(p,index){
            var photo = p.user_photo.small_image_url;
           // p.user_photo.flagged=1;
            return (
                <a className={classNames({"myphotos_photo":true,"uploading":p.uploading})}  key={p.user_photo.id}
                   onClick={!p.uploading && !p.user_photo.flagged?this.onClickPhoto.bind(null, index):null}>
                    {p.uploading && <div className="uploading-mask"></div> }
                    <img className="myphotos_img" onLoad={this.onLoadImage} src={photo}></img>
                    {p.user_photo.flagged >0 &&
                    <div className="myphotos_error-mask">
                        <div className="myphotos_flagged-content">
                            <div className="myphotos_flagged-content_title"><FormattedMessage id="yikes_photo_flagged"/></div>
                            <div className="myphotos_flagged-content_delete"
                                 onClick={this.deleteFlaggedPhoto.bind(null,p)}><FormattedMessage id="delete"/></div>
                        </div>
                        <div className="myphotos_error-mask_bar"></div>
                    </div>
                    }
                    {p.uploadFailed &&
                    <div className="myphotos_error-mask">
                        <div className="myphotos_flagged-content">
                            <div className="myphotos_flagged-content_title">
                                <FormattedMessage id="oops_something_went_wrong_try_again"/>
                            </div>
                            <div className="myphotos_flagged-content_delete"
                                 onClick={this.deleteFailedPhoto.bind(null,p)}><FormattedMessage id="ok"/>
                            </div>
                        </div>
                        <div className="myphotos_error-mask_bar"></div>
                    </div>
                    }
                    {p.uploading && !p.uploadFailed &&
                    <div className="myphotos_upload-progress-bar" style={{width:p.progress +'%'}}></div>
                    }
                </a>
            )
        }.bind(this));
        //var hasMainProfile = this.props.overview && !this.props.overview.mainPhoto.isSystemDefault;
        var hasMainProfile = this.props.photos.length>0;
        var plCls = "myphotos_photos-list";
        if(hasMainProfile){
            plCls += ' has-main-profile';
        }
        return(
            <div className="rb-myprofile-photos more myphotos">
              <div className="desktop-upload">
                <div id="rb-desktop-myprofile-dropzone" className="desktop-upload_dropzone">
                    <div className="dz-message desktop-upload_dropzone_add-photo">
                        <div className="dropzone-message" ><FormattedMessage id="drag_and_drop_your_photo_here"/></div>
                        <div className="dropzone-message">
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
                        <div className="dropzone-message or"><FormattedMessage id="or"/></div>
                        <div className="dropzone-message"><FormattedMessage id="click_to_browser_computer"/></div>
                    </div>
                </div>
              </div>
                {!hasMainProfile &&
                <div className="main-profile-upload-area mobile">
                    <div id="rb-main-profile-dropzone" className="main-upload-dropzone">
                        <div className="dz-message main-upload-dropzone_add-photo">
                        <div className="plus-sign">
                            <svg width="72px" height="73px" viewBox="0 0 72 73" version="1.1"  >
                                <g id="-My-Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                                    <g id="m.myprofile----no-main"  transform="translate(-125.000000, -458.000000)" stroke-linecap="square" stroke="#C8C8C8" stroke-width="2">
                                        <g id="sidebar"  transform="translate(0.000000, 276.000000)">
                                            <g id="main-placeholder" transform="translate(10.000000, 68.000000)" >
                                                <g id="+" transform="translate(116.000000, 115.000000)">
                                                    <path d="M35,0.5 L35,70.5" id="Line"></path>
                                                    <path d="M70,35.5 L0,35.5" id="Line-Copy"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="desc"><FormattedMessage id="add_your_main_photo"/></div>
                        </div>
                    </div>
                </div>
                }
                <div className={plCls}>
                    {photos}
                </div>
                <div id="rb-mobile-myprofile-dropzone" className=" dropzone mobile mobile-dropzone">
                    <div className="dz-message add-photo-mobile">
                    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" >

                        <defs>
                            <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-1">
                                <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.35 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix>
                                <feMerge>
                                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>
                        </defs>
                        <g id="-My-Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                            <g id="m.myprofile----no-main"  transform="translate(-250.000000, -737.000000)">
                                <g id="add-button"  transform="translate(252.000000, 738.000000)">
                                    <ellipse id="Oval-17-Copy" fill="#EE3888" filter="url(#filter-1)"  cx="24.5969409" cy="24.6051618" rx="24.5969409" ry="24.6051618"></ellipse>
                                    <path d="M36.398,26.8116923 L26.796,26.8116923 L26.796,35.6750769 L23.602,35.6750769 L23.602,26.8116923 L14,26.8116923 L14,23.8633846 L23.602,23.8633846 L23.602,15 L26.796,15 L26.796,23.8633846 L36.398,23.8633846 L36.398,26.8116923 Z" id="add" fill="#FFFFFF" ></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    </div>
                </div>
            </div>

        )
    }
});


function mapStateToProps(state){
    return {
        photos:state.me.photos,
        overview:state.me.overview
    }
}

Photos = connect(mapStateToProps,{addPhoto,changeProfilePhoto,uploadingPhoto,uploadedPhoto,openLightBox, closeLightBox,deletePhoto})(Photos)
export default Photos;
