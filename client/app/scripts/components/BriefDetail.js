var React = require('react');
var ReactDOM = require('react-dom');

import {connect} from 'react-redux';
import { History } from 'react-router';
import {injectIntl,FormattedMessage} from 'react-intl';
import perfectScrollbar from 'perfect-scrollbar';
import RBService from '../services/RBService.js';
import RBNotify from '../common/notification/RBNotify.js';
import ImageResources from '../utils/ImageResources';
import {openLightBox } from '../actions/LightBoxActionCreators';
import BriefDetailPlaceholder from '../common/loadingPlaceholder/BriefDetailPlaceholder';
import { HEADER, SIDEBAR, MARGIN } from '../utils/ConstantValues'
import ReportUser from '../views/report_user/ReportUser';
import BlockUser from '../common/dialogs/BlockUser';
import { openReportModal } from '../actions/ReportUserActionCreators';
import { openBlockUserModal } from '../actions/BlockUserActionCreators';

var SVGComponent = React.createClass({
    render:function(){
        return <svg className="brief_common_svg" {...this.props}>{this.props.children}</svg>;
    }
})
var Circle = React.createClass({
    render:function(){
        return <circle {...this.props}>{this.props.children}</circle>;
    }
})
var RedCircle = React.createClass({

    render: function() {

        return(
            <SVGComponent width="25" height="25" >
                <Circle cx="50%" cy="50%" r="7" stroke="crimson" fill="none"/>
            </SVGComponent>
        )
    }
})

var InterestIn = React.createClass({
    render: function() {
        var {overview, lookingFor} = this.props.user;
        var nameStyles = ['sidebar.he_interested_in','sidebar.she_interested_in'];
        var seekingWords = ['men','women'];
        var nameStyle = nameStyles[overview.gender-1];
        var interestedInTitle = this.props.intl.formatMessage({id:nameStyle});
        var interestedInContent=[this.props.intl.formatMessage({id:seekingWords[overview.seeking-1]})];
        for(var p in lookingFor){
            var item = lookingFor[p];
            if(item.text){
                interestedInContent.push(item.text);
            }
        }
        interestedInContent = interestedInContent.join(' · ');
        return(
            <div className="brief_interest">
                <div className="brief_title">{interestedInTitle}</div>
                <hr className="brief_divider"></hr>
                <p className="brief_detail">
                    {interestedInContent}
                </p>
            </div>
        )
    }
});
InterestIn = injectIntl(InterestIn);

var AboutUser = React.createClass({
    getInitialState:function(){
      return {
          blocked:false,
          reported:false,
          showReportModal: false
      }
    },

    toggleBlock:function(){
      this.setState({ blocked: !this.state.blocked });
    },

    onClickBlock: function() {
      this.props.dispatch(openBlockUserModal());
    },

    onClickReport: function() {
        this.props.dispatch(openReportModal());
    },

    onReport:function(){
        var {overview} = this.props.user;
        var name = overview.name;
        var msg = this.props.intl.formatMessage({id:'common.name_has_been_reported'},{name:name});
        RBNotify.notify('simple',{title:msg});
    },
    render: function() {
        var {overview} = this.props.user;
        var userToken = overview.token;
        var name = overview.name;
        var aboutmeDetail = overview.aboutMe;
        var blockStr = this.state.blocked
            ?this.props.intl.formatMessage({id:'unblock'})
            :this.props.intl.formatMessage({id:'block'});
        var reportStr = this.props.intl.formatMessage({id:'report'});
        return(
            <div className="brief_about">
                <div className="brief_title">
                    <span><FormattedMessage id="sidebar.about_name" values={{name:name}}/></span>
                    {this.props.onProfile &&
                    <span className="brief_block-report">
                        <span className="brief-span brief_block" onClick={this.onClickBlock}>{blockStr}</span>
                        <span className="brief-span brief_report" onClick={this.onClickReport}>{reportStr}</span>
                    </span>
                    }
                </div>
                <ReportUser targetUserToken={userToken} />
                <BlockUser user={this.props.user.overview} blocked={this.state.blocked} toggleBlock={this.toggleBlock} />
                <hr className="brief_divider"></hr>
                <p className="brief_detail">
                    {aboutmeDetail}
                </p>
            </div>
        )
    }
});
AboutUser = injectIntl(AboutUser);

var DetailContent = React.createClass({
    initializePerfectScrollbar: function () {
      perfectScrollbar.initialize(document.getElementById("search_brief_scrollbar"),
        { suppressScrollX: true }
      );
      $(document).on('ps-scroll-y', function () {
        $( ".ps-container.ps-active-y > .ps-scrollbar-y-rail" ).css( "display", "block" ).delay(1000).fadeOut( "slow" );
      });
    },
    componentDidMount:function(){
        this.initializePerfectScrollbar();
        $('.rb-sidebar-detail').on('DOMMouseScroll mousewheel',RB.preventScrollPropagation);
    },
    componentWillUnmount:function(){
        $('.rb-sidebar-detail').off('DOMMouseScroll mousewheel',RB.preventScrollPropagation);
    },
    render: function() {
        return (
            <div id="search_brief_scrollbar" className="rb-sidebar-detail brief">
              {this.props.children}
            </div>
        )
    }
})

var BriefDetail = React.createClass({
    mixins: [History],
    viewPhoto:function(index,e){
        this.props.dispatch(openLightBox(this.props.user.overview,this.props.user.photos,index,false));
    },
    seeAllPhotos:function(){
        this.props.dispatch(openLightBox(this.props.user.overview,this.props.user.photos,0,false));
    },
    updateSidebarHeight: function() {
      if(!$(".rb-sidebar-detail").hasClass('place-holder')) {
        var windowsHeight = RB.viewport().height;
        var sidebarHeight = $('.rb-sidebar-detail').height() + HEADER.HEIGHT + SIDEBAR.AVATAR_HEIGHT + MARGIN.M_15;
        if( this.props.sidebarHeight == 0 ) {
          this.props.setSidebar(sidebarHeight);
        }
        if(windowsHeight < sidebarHeight) {
          $('.rb-sidebar-detail').addClass("stick-bottom");
        }
      }
    },
    resetSidebarHeight: function() {
      this.props.setSidebar(0);
    },
    componentWillReceiveProps: function(nextProps) {

      if(nextProps.user != this.props.user) {
        this.resetSidebarHeight();
        this.updateSidebarHeight();
      }
    },
    componentDidUpdate:function() {
      this.updateSidebarHeight();
    },
    render: function() {
        var loadingImg = <div>
            <img style={{width:'98%'}} src={ImageResources.sidebar_loading} />
        </div>;
        // if (true) {
        if (!this.props.user){
            return <div className="rb-sidebar-detail brief place-holder"><BriefDetailPlaceholder /></div>;
        } else {
            var {overview} = this.props.user;
            if(this.props.quickView){
                return <div className="rb-sidebar-detail brief place-holder"><BriefDetailPlaceholder /></div>;
            }else{
                var user = this.props.user;
                var photoList = user.photos && user.photos.map(function(p,index){
                        if(index>=4){
                            return null;
                        }
                        return (<a className="brief_photos_link" key={index} onClick={this.viewPhoto.bind(null,index)}> <img className="brief_photos_img" src={p.user_photo.small_image_url}></img> </a>);
                    }.bind(this));
                var commonList = [];
                for (var p in this.props.user.commonInterests){
                    var item = RB.baseData.interests[this.props.user.commonInterests[p]];
                    commonList.push(<div><RedCircle/> <span className="breif_common_span">{item.label}</span></div>)
                }
                var common =
                    <div className="brief_common">
                        <div className="brief_title"><FormattedMessage id="sidebar.what_you_have_in_common"/></div>
                        <hr className="brief_divider"></hr>
                        <div>
                            {commonList}
                        </div>
                    </div>;
                var photos =
                    <div className="brief_photos">
                        <div >
                            <span className="brief_title"><FormattedMessage id="photos"/></span>
                            <a  className="brief_see-all" onClick={this.seeAllPhotos}><FormattedMessage id="sidebar.see_all"/></a>
                        </div>
                        <hr className="brief_divider"></hr>
                        <div className="brief_photo-list">
                            {photoList}
                        </div>
                </div>
                if(this.props.onProfile){
                    return (
                        <div className="rb-sidebar-detail brief">
                            <AboutUser {...this.props}/>
                            {common}
                            <InterestIn {...this.props} />
                            {photos}
                        </div>
                    )
                }else{
                    return(
                            <DetailContent>
                                { common }
                                <AboutUser {...this.props}/>
                                <InterestIn {...this.props} />
                                {photos}
                            </DetailContent>
                    )
                }

            }


        }
    }
});

BriefDetail = injectIntl(BriefDetail);
export default  connect()(BriefDetail);
