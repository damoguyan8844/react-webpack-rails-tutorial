var React = require('react');

var Slider = require('../slider/Slider.js');



var PhotoCropper = React.createClass({
    cropperSelector:'.rb-photo-cropper >img',
    cropper:null,
    size:275,
    getInitialState:function(){
        //console.log(this.props.photo);
        return {
            scale:1,
            scaleMin:1,
            scaleMax:100,
            imageSize:null,
            sliderDisabled:false
        }
    },

    componentDidMount: function() {

    },
    replace:function(imageUrl){
        $(this.cropperSelector).cropper('replace',imageUrl);
    },
    getData:function(){
        var data = $(this.cropperSelector).cropper('getData',true);
        var max = Math.max(this.state.imageSize.width, this.state.imageSize.height);
        if( max >1000){
            var ratio = 1000/max;
            data.x = Math.round(ratio*data.x);
            data.y = Math.round(ratio*data.y);
            data.width = Math.round(ratio*data.width);
            data.height = Math.round(ratio*data.height);
        }
        return data;
    },
    onScale:function(value){
        var scale=value/100;
        //console.log('scale',scale);
        var w = this.state.imageSize.width * scale;
        var h = this.state.imageSize.height * scale;
        var canvasData = $(this.cropperSelector).cropper('getCanvasData');
        var left = canvasData.left - (w -canvasData.width)/2;
        var top  = canvasData.top - (h -canvasData.height)/2;
        $(this.cropperSelector).cropper('setCanvasData',{left:left,top:top,width:w,height:h});
        //console.log("w ",w);

    },
    onLoadImage:function(e){
        var imgSize = {width:e.target.width, height:e.target.height};
        var scale = this.size*100/Math.min(imgSize.width,imgSize.height);
        if(scale > 100){
            scale = 100;
            this.setState({sliderDisabled:true});
            console.log(this.state.sliderDisabled);
        }else{
            this.setState({sliderDisabled:false});
        }
        console.log(scale);
        this.setState({scale:scale, scaleMin:scale, ScaleMax:100,imageSize:imgSize});

        if(!this.cropper){
            this.cropper =
            $(this.cropperSelector).cropper(
                {
                    viewMode:3,
                    aspectRatio:1,
                    strict: true,
                    guides: false,
                    highlight: false,
                    dragCrop: false,
                    dragMode:'move',
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    zoomOnWheel:false,
                    toggleDragModeOnDblclick:false,

                    built:function(){
                        var container = $(this).cropper('getContainerData');
                        var cropBoxWidth = 275;
                        var cropBoxHeight = 275;

                        $(this).cropper('setCropBoxData', {
                            width: cropBoxWidth,
                            height: cropBoxHeight,
                            left: (container.width - cropBoxWidth) / 2,
                            top: (container.height - cropBoxHeight) / 2
                        });
                    }

                }
            );
        }

        var me = this;
        $(me.cropperSelector).cropper('setCropBoxData',{width:me.size,height:me.size,top:0,left:0});
        me.props.onReady && me.props.onReady();
        setTimeout(function(){
            /*
            if(imgSize.width > imgSize.height){
                $(me.cropperSelector).cropper('setCanvasData',{height:me.size, top:0,left:0});
            }else{
                $(me.cropperSelector).cropper('setCanvasData',{width:me.size, top:0,left:0});
            }
            */

        },100)
    },
    onRotate:function(){
        $(this.cropperSelector).cropper('rotate',90);
    },
    render() {
        return (
            <div>
                <div className="cropper rb-photo-cropper">
                    <span onClick={this.props.resetUploader} className="uploader_button_clear">
                      <i className="icon-trash-can"></i>
                    </span>
                    <img className="cropper_img" ref="rbCropperImage" onLoad={this.onLoadImage} src={this.props.photo}></img>
                </div>

                <div className="rb-cropper-slider">
                    <div className="cropper-slider_minus">-</div>
                    <Slider disabled={this.state.sliderDisabled} min={this.state.scaleMin} max={this.state.ScaleMax} value={this.state.scale} onChange={this.onScale} />
                    <div className="cropper-slider_plus">+</div>
                    <div className="cropper-slider_rotate" onClick={this.onRotate}>
                        <svg width="14px" height="14px" >

                            <g id="Group">
                                <path d="M13.5705161,1.54571782 L1.9282134,1.54571782 L3.31657568,0.746262376 C3.50830273,0.635960396 3.57392556,0.391514851 3.4632804,0.200193069 C3.35266998,0.00887128713 3.10758313,-0.0569009901 2.91575186,0.0537475248 L0.232024814,1.5990495 C0.108039702,1.67050495 0.0315781638,1.8025 0.0315781638,1.94541089 C0.0315781638,2.08811386 0.108004963,2.22010891 0.232024814,2.29156436 L2.91575186,3.83724752 C2.97883871,3.87377228 3.04776179,3.89092574 3.11578164,3.89092574 C3.25432258,3.89092574 3.38911166,3.81926238 3.4632804,3.6910099 C3.5739603,3.49968812 3.50830273,3.25524257 3.31657568,3.14473267 L1.92863027,2.3454505 L13.169727,2.3454505 L13.169727,10.2091881 C13.169727,10.4299653 13.3491911,10.6089851 13.5705161,10.6089851 C13.7919107,10.6089851 13.9713747,10.4299653 13.9713747,10.2091881 L13.9713747,1.9455495 C13.9713747,1.72473762 13.7919107,1.54571782 13.5705161,1.54571782 L13.5705161,1.54571782 Z" id="Shape"></path>
                                <path d="M13.7707196,11.6765198 L11.0870273,10.1308366 C10.8952308,10.0201881 10.650005,10.0859604 10.539464,10.2773168 C10.4287841,10.4684653 10.4944069,10.7130495 10.6861687,10.8233861 L12.0741141,11.6228416 L0.83301737,11.6228416 L0.83301737,3.75913861 C0.83301737,3.53832673 0.65351861,3.35927228 0.432193548,3.35927228 C0.210799007,3.35927228 0.0313349876,3.53832673 0.0313349876,3.75913861 L0.0313349876,12.0227426 C0.0313349876,12.2435198 0.210799007,12.4225396 0.432193548,12.4225396 L12.074531,12.4225396 L10.6861687,13.2217871 C10.4944069,13.3321238 10.4288189,13.5767079 10.539464,13.7680644 C10.6136328,13.8963168 10.7484566,13.9680495 10.886928,13.9680495 C10.9549826,13.9680495 11.0238362,13.9508614 11.0870273,13.914302 L13.7707196,12.3689653 C13.89467,12.2976832 13.9711663,12.1657921 13.9711663,12.0229158 C13.9711663,11.8799703 13.8947742,11.7480099 13.7707196,11.6765198 L13.7707196,11.6765198 Z" id="Shape"></path>
                            </g>

                        </svg>
                    </div>
                </div>
            </div>
        );
    }
});

export default PhotoCropper;
