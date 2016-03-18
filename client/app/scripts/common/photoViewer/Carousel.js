var React = require('react');
import IE from '../../utils/ieChecker.js'
import "../../utils/object-fit.js";

var PhotoCarousel = React.createClass({

    componentDidMount:function() {
        $('.carousel-image').objectFit('contain');  
    },
    showNext:function(e){
        var index = (this.props.index+1) % this.props.photos.length;
        this.props.setIndex(index);
    },
    showPrev:function(e){
        var index = (this.props.index-1) % this.props.photos.length;
        if(index < 0){
            index += this.props.photos.length;
        }
        this.props.setIndex(index);
    },
    render: function () {
        var plist = this.props.photos.map(function(p,index){
            if(index == this.props.index){
                return (<img className="animated carousel-image active "  src={p.user_photo.large_image_url}></img>);
            }else{
                return (<img className="animated carousel-image "  src={p.user_photo.large_image_url}></img>);
            }
        }.bind(this));
        var showArrows = this.props.photos.length >1;
        return (
            <div className="rb-carousel">
                <div className="carousel-container">
                    {plist}
                </div>
                {showArrows && !this.props.disableArrows &&
                <div id="carousel-arrows" className="arrows">
                    <a  className="pull-left" onClick={this.showPrev}><i className="icon-photo-arrow-left"></i></a>
                    <a  className="pull-right" onClick={this.showNext}><i className="icon-photo-arrow-right"></i></a>
                </div>
                }
            </div>
        );
    }
});

export default PhotoCarousel;
