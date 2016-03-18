
require('../../styles/views/Connections.scss');

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import { History } from 'react-router';
import SideBar from '../../components/Sidebar.js';
import RBService from '../../services/RBService.js';
import NavTab from '../../common/navTab/NavTab.js';
import ConnectionList from './connectionList.js';
import {showUser,quickView} from '../../actions/ConnectionsActionCreators.js';
import SearchUser from '../../models/SearchUser.js';
import {highlightTab} from '../../actions/HeaderActionsCreator';
import User from '../../models/User.js';
import { HEADER, SIDEBAR, MARGIN } from '../../utils/ConstantValues'
import ConnectionsSidebar from './ConnectionsSidebar.js';
import RBPhotoUploader from '../../common/photoUploader/RBPhotoUploader.js';
import {injectIntl,FormattedMessage} from 'react-intl';
import IE from '../../utils/ieChecker.js'

var Connections = React.createClass({
    mixins: [History],
    getInitialState:function(){
        return {
            sidebarHeight : 0,
            activeItem:'visitors',
            isQuickView:false
        }
    },
    switchTab:function(tab){
        this.history.pushState(null,'/connections/'+tab);
        /*
        this.setState({
            activeItem: tab
        });*/
        this.updateSidebarPosition();
    },
    componentWillReceiveProps:function(nextProps){
        console.log("nextProps:" + nextProps.params.tab);
        var tab =  nextProps.params.tab? nextProps.params.tab: 'visitors';
        var index = ['visitors','visited','favorited','favoritedMe'].indexOf(tab);
        if(index != -1 && tab != this.state.acitveItem){
            this.setState({activeItem:tab})
        }
    },
    componentDidMount:function(){
        var tab = this.props.params.tab?this.props.params.tab:'visitors';
        if(!RB.isMobileLayout())
            this.setState({isQuickView:true});
        this.setState({activeItem:tab});
        this.initPositionHandlers();
        if (IE.isTheBrowser && IE.actualVersion === "10") {
          this.adjustSearchPanelWidth();
        }
    },
    componentWillUnmount: function() {
        this.props.highlightTab(null);
        this.cleanUpPositionHandlers();
    },
    componentWillMount:function(){
        this.props.highlightTab('connections');
    },
    setSidebar:function(height) {
      this.setState({ sidebarHeight : height });
    },
    adjustSearchPanelWidth:function() {
        var windowsWidth = RB.viewport().width;
        var sidebarWidth = $('.rb-connections_sidebar').width();
        if ( windowsWidth < 1024 ) {
          const searchPanelWidth = windowsWidth - ( sidebarWidth + MARGIN.M_15 + MARGIN.M_15 + 10 );
          console.log("ww|" + windowsWidth + "|sw|" + sidebarWidth + "|spw|" + searchPanelWidth + "|");
          $('.rb-connections_content').css("width", searchPanelWidth + "px");
        } else {
          $('.rb-connections_content').css("width", "585px");
        }
    },
    initPositionHandlers:function(){
        var wh = RB.viewport().height;
        $('.rb-body-wrap').css('min-height',wh);
        RB.addChangeLayoutListener(this.layoutChanged);
        RB.addResizeListener(this.windowSizeChanged);
        RB.addScrollListener(this.windowScrolling);
    },
    cleanUpPositionHandlers:function(){
        RB.removeChangeLayoutListener(this.layoutChanged);
        RB.removeResizeListener(this.windowSizeChanged);
        RB.removeScrollListener(this.windowScrolling);
    },
    windowScrolling:function(){
        this.updateSidebarPosition();
    },
    windowSizeChanged:function(preSize,curSize){
        this.updateSidebarPosition();
        if (IE.isTheBrowser && IE.actualVersion === "10") {
          this.adjustSearchPanelWidth();
        }
    },
    updateSidebarPosition:function(){
        var originalSidebarHeight = this.state.sidebarHeight;
        var wh = RB.viewport().height;
        var docTop = $(document).scrollTop();
        var bodyHeight = $('.rb-body-wrap').outerHeight(true);
        var sidebarHeight = $('.rb-sidebar-detail').height() + HEADER.HEIGHT + SIDEBAR.AVATAR_HEIGHT + MARGIN.M_15;
        if( wh < originalSidebarHeight ) {
          $('.rb-sidebar-detail').addClass("stick-bottom");
        } else {
          $('.rb-sidebar-detail').removeClass("stick-bottom");
        }
        $('.rb-body-wrap').css('min-height',wh);

        if(wh + docTop > bodyHeight){
            if(!$('.rb-connections_sidebar').hasClass('show-footer')){
                $('.rb-connections_sidebar').addClass('show-footer');
                $('.rb-sidebar-detail').css('max-height',wh -75 -190);
                console.log('show footer')
            }

        }else{
            if($('.rb-connections_sidebar').hasClass('show-footer')){
                $('.rb-connections_sidebar').removeClass('show-footer');
                $('.rb-sidebar-detail').css('max-height','none');
                console.log('hide footer')
            }
        }
    },

    layoutChanged:function(isMobile){
        if(isMobile){
            this.setState({isQuickView:false});
        }
        else{
            this.setState({isQuickView:true});
        }
    },
    onPageChanged:function(){

    },
    onQuickView:function(searchUser){
        const noProfile = RB.getMe().overview.mainPhoto.isSystemDefault;
        this.props.quickView(searchUser);
        if(!noProfile) {
            RBService.getUser(searchUser.token)
                .then(function (response) {
                    console.log(response.data);
                    var user = (new User(response.data.user)).data;
                    this.props.showUser(user);
                }.bind(this))
        }
    },
    onReloadSidebar:function(searchUser){
        this.onQuickView(searchUser);
    },
    onEditAvatar:function(){

    },
    render: function(){
        console.log("this.state.activeItem:" + this.state.activeItem);
        const {formatMessage} = this.props.intl;
        var menus = [
            {key:'visitors',label:formatMessage({id:'visitors'})},
            {key:'visited', label:formatMessage({id:'visited'})},
            {key:'favorited', label:formatMessage({id:'favorited'})},
            {key:'favoritedMe', label:formatMessage({id:'favorited_me'})}];
        this.updateSidebarPosition();
        return(
            <div className="rb-connections white-box">

                    <div className="rb-connections_content">
                    <NavTab activeItem={this.state.activeItem} menuItems={menus} onSwitchTab={this.switchTab} >
                    </NavTab>
                    <ConnectionList activeItem={this.state.activeItem} onEditAvatar={this.onEditAvatar} onPageChanged={this.onPageChanged} onQuickView={this.onQuickView} isQuickView={this.state.isQuickView}/>
                </div>
                <ConnectionsSidebar reload={this.onReloadSidebar} sidebarHeight={this.state.sidebarHeight} setSidebar={this.setSidebar}/>
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        mePhotos:state.me.photos,
        loading:state.connections.loading
    }
}

Connections = connect(mapStateToProps,{showUser,quickView,highlightTab})(Connections)
export default injectIntl(Connections);
