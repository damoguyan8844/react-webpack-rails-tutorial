
require('../../styles/views/Search.scss');

var React = require('react');
var ReactDOM = require('react-dom');
import Select from 'react-select';
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
import MsgPanel from '../../common/msgpanel/MsgPanel.js';
import SearchResult from './SearchResult.js';
import Paginator from '../../common/paginator/Paginator.js';
import AdvanceSelect from "./MultiSelect.js";
import SearchBaseItem from "./SearchBaseItem.js";
import SearchSideBar from './SearchSidebar.js';
import {connect} from 'react-redux';
import MobileSearch from "./MbSearch.js";
import SearchUser from '../../models/SearchUser.js';
import { HEADER, SIDEBAR, MARGIN } from '../../utils/ConstantValues'
var RBService = require('../../services/RBService');
var User = require('../../models/User');
import {showUser,quickView,searchCriterias,usedMulitCriterias,saveSearchRst} from '../../actions/SearchActionCreators.js';
import {highlightTab} from '../../actions/HeaderActionsCreator';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import IE from '../../utils/ieChecker.js'

var mapAdv = {
    zodiac:"search[profile_zodiac_eq]",
    'chinese_zodiac': "search[profile_cn_zodiac_eq]",
    'body_type': "search[profile_body_type_eq]",
    'marital_status': "search[profile_marital_status_eq]",
    'birthplace': "search[profile_birth_place_eq]",
    'immigration': "search[profile_immigration_eq]",
    'faith': "search[profile_religion_eq]",
    'languages': "search[profile_knows_languages_any]",
    'interests': "search[profile_has_interests_any]",
    'smoking': "search[profile_smoking_eq]",
    'drinking': "search[profile_drinking_eq]",
    'minimum_income': "search[profile_income_gte]",
    'height': "search[profile_height_gte]",                 //search[profile_height_lte]
    'have_children': "search[profile_have_children_eq]",
    'education': "search[profile_education_gte]",
    'age_arrived': "search[profile_first_arrive_gte]"   //search[profile_first_arrive_lte]
    };

var originalSidebarHeight = 0;
var Search = React.createClass({

    getInitialState: function() {
        return {
            sidebarHeight : 0,
            searchKey: '',
            loading: true,
            criteria:[],
            cur_page: 1,
            max_page:1000,
            search_Criterias:'',
            is_quick_view:true,
            isServiceOK:false,
            isMobile:false,
            basic:{
                has_ok_photo_gte:1,
                country_eq:1,
                int:2,
                sortby:'descend_by_last_request_at',
                bab:18,
                bat:40,
                state_eq:'',
                approved_photos_count_gte:0
            }
        }
    },
    onChangePage: function(page) {
        console.log(page);
        if (this.state.cur_page > 0 && this.state.max_page !==1000)
            return;
        this.setState({
            loading: true
        });
        if(this.props.searchResult.users.length < page){

            RBService.getUserList(this.props.searchCriteria + "&page=" + page).then(function(response){
                var list = response.data.users;
                var users = this.mapUsers(list);
                var userList = this.props.searchResult.users.concat();
                userList.push(users);
                this.props.saveSearchRst(userList,page);
                if (response.data.next_page == 0)
                    this.setState({
                        users:users,
                        max_page:this.state.cur_page,
                        loading: false
                    });
                else
                    this.setState({
                        users:users,
                        cur_page: response.data.next_page-1,
                        loading: false
                    });

            }.bind(this)).catch(function(response){
                console.log("getConstantData error:",response);
            });
        }
        else{
            var userList = this.props.searchResult.users.concat();
            this.props.saveSearchRst(userList,page);
            this.setState({
                cur_page: page,
                loading: false
            });
        }

    },
    mapUsers:function(source){
        var users = [];
        if (source == null || source.length<1){
            return users;
        }
        source.forEach(function(u){
            var user = (new SearchUser(u.user)).data;
            users.push(user);
        });
        return users;
    },
    setBasicCriteria:function(response,users){
        this.setState({
            cur_page: response.data.next_page-1,
            loading:false,
            isServiceOK:true
        });
    },
    getInitParam:function(){
        var params = [];
        var b = {
            "search[order]":this.props.criterias ? this.props.criterias.order : this.state.basic.sortby,
            "use_advanced":1

        };
        for(var key in b)
        {
            params.push(key + "=" + b[key]);
        }
        return params.join('&');
    },
    componentWillUnmount: function() {
        this.props.highlightTab(null);
        RB.removeChangeLayoutListener(this.changeMobile);
        this.cleanUpPositionHandlers();
    },
    componentDidMount:function(){
        console.log("RB.isMobileLayout:" + RB.isMobileLayout);
        if (IE.isTheBrowser && IE.actualVersion === "10") {
          this.adjustSearchPanelWidth();
        }
        if(this.props.searchResult){
            this.setState({
                loading:false,
                isServiceOK:true,
                cur_page:this.props.searchResult.curPage
            });
           // this.onQuickView(this.props.searchResult.users[this.props.searchResult.curPage-1][0]);
        }
        else{
            var param = this.getInitParam();
            this.setState({
                search_Criterias: param
            })
            this.callServer(param);

        }
        RB.addChangeLayoutListener(this.changeMobile);
        if(RB.isMobileLayout()){
            this.setState({
                isMobile:true
            });
            console.log("RB.isMobileLayout()  true");
        }
        this.initPositionHandlers();
    },
    setSidebar:function(height) {
      this.setState({ sidebarHeight : height });
    },
    initPositionHandlers:function(){
        var wh = RB.viewport().height;
        $('.rb-body-wrap').css('min-height',wh);
        RB.addResizeListener(this.windowSizeChanged);
        RB.addScrollListener(this.windowScrolling);
    },
    cleanUpPositionHandlers:function(){
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
    adjustSearchPanelWidth:function() {
        var windowsWidth = RB.viewport().width;
        var sidebarWidth = $('.rb-search-sidebar').width();
        if ( windowsWidth < 1024 ) {
          const searchPanelWidth = windowsWidth - ( sidebarWidth + MARGIN.M_15 + MARGIN.M_15 + 10 );
          console.log("ww|" + windowsWidth + "|sw|" + sidebarWidth + "|spw|" + searchPanelWidth + "|");
          $('.search_panel_left').css("width", searchPanelWidth + "px");
        } else {
          $('.search_panel_left').css("width", "585px");
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

        if(wh + docTop > bodyHeight){
            if(!$('.rb-search-sidebar').hasClass('show-footer')){
                $('.rb-search-sidebar').addClass('show-footer');
                $('.rb-sidebar-detail').css('max-height',wh -75 -190);
                console.log('show footer');
            }

        }else{
            if($('.rb-search-sidebar').hasClass('show-footer')){
                $('.rb-search-sidebar').removeClass('show-footer');
                $('.rb-sidebar-detail').css('max-height','none');
                console.log('hide footer')
            }
        }
    },
    changeMobile:function(isMobile){
        console.log("isMobile:" + isMobile);
        if(isMobile){
            this.setState({
                isMobile:true
            });
        }
        else{
            this.setState({
                isMobile:false,
                cur_page:this.props.searchResult ? this.props.searchResult.curPage : 1
            });
        }
    },
    callServer:function(param){
        RBService.getUserList(param).then(function(response){
            var list = response.data.users;
            var users = this.mapUsers(list);
            if(users.length>0){
                this.onQuickView(users[0]);
            }
            this.props.searchCriterias(response.data.search,param);
            this.setBasicCriteria(response,users);
            var userList = [];
            userList.push(users);
            this.props.saveSearchRst(userList,1);

        }.bind(this)).catch(function(response){
            console.log("getConstantData error:",response);
            this.setState({
                loading:false,
                isServiceOK:true
            })
        }.bind(this));
    },
    componentWillMount:function(){
        this.props.highlightTab('search');
    },
    removeAdvanceCriteria: function(selected_criteria){
        var checked_cri = this.props.multiCriterias.concat();
        var index = -1;
        checked_cri.map(function (key ,i) {
            if(selected_criteria.value == key.value)
            {
                index = i;
            }
        });
        if (index > -1) {
            checked_cri.splice(index, 1);
        }
        this.props.usedMulitCriterias(checked_cri);
    },
    searchParams:function(b,m){
        var params = [];
        for(var key in b)
        {
            params.push(key + "=" + b[key]);
        }
        m.map(function(item){
            if(item.value == "height"){
                if(item.checked_values.length != 0)
                    params.push("search[profile_height_gte]=" + item.checked_values);
                if(item.checked_values.length != 0)
                    params.push("search[profile_height_lte]=" + item.checked_values1);
            }
            else if(item.value=="age_arrived")
            {
                if(item.checked_values.length != 0)
                    params.push("search[profile_first_arrive_gte]=" + item.checked_values);
                if(item.checked_values.length != 0)
                    params.push("search[profile_first_arrive_lte]=" + item.checked_values1);
            }
            else
            {
                if(item.checked_values.constructor == Array)
                    params.push(mapAdv[item.value] + "=" + item.checked_values.join(','));
                else
                    params.push(mapAdv[item.value] + "=" + item.checked_values);
            }
        });
        return params.join("&");
    },
    onSearch:function(b,is_quick_view,m){
        var param = this.searchParams(b,m);
        this.setState({
            loading: true,
            search_Criterias:param,
            cur_page: 1
        });
        RBService.getUserList(param).then(function(response){
            var list = response.data.users;
            var users = this.mapUsers(list);
            this.setState({
                cur_page: response.data.next_page-1,
                loading:false
            });
            this.props.searchCriterias(response.data.search,param);
            var userList = [];
            userList.push(users);
            this.props.saveSearchRst(userList,1);
        }.bind(this)).catch(function(response){
            console.log("onSearch getUserList error:",response);
            this.setState({
                loading:false
            });
        }.bind(this))
    },
    setQuickView:function(is_quick_view){
     this.setState({
         is_quick_view: is_quick_view
     });
    },
    onQuickView:function(searchUser){
        const noProfile = RB.getMe().overview.mainPhoto.isSystemDefault;
        this.props.quickView(searchUser);
        var token = searchUser.token;
        if(!noProfile){
            RBService.getUser(token)
                .then(function(response){
                    var user = (new User(response.data.user)).data;
                    this.props.showUser(user);
                }.bind(this))
        }
    },
    onClickNext:function(){
        if(this.state.cur_page == this.state.max_page)
            return;

        this.onChangePage(this.state.cur_page + 1);
    },
    onClickPrev:function(){
        if(this.state.cur_page == this.state.max_page)
            return;
        this.onChangePage(this.state.cur_page - 1);
    },
    onReloadSidebar:function(searchUser){
        this.onQuickView(searchUser);
    },
    onEditAvatar:function(){
        //this.setState({showNoProfileTip:true});
    },
    render: function(){
        var s = this.state;
        const {formatMessage} = this.props.intl;
        return (<div className="rb-search search">
                    <div className="rb-msgpanel display_none" id="popMsg">
                        <MsgPanel ref="msgPanel" sendMessage={this.showPopMsg} />
                    </div>

                    {(!this.state.isMobile) &&
                        <div className="clearfix search_panel">
                            <div className="search_panel_left">
                                <SearchBaseItem criteria={this.state.criteria} basic={this.state.basic} is_quick_view={this.state.is_quick_view} onSearch={this.onSearch} onSetQuickView={this.setQuickView} onRemoveAdvanceCriteria={this.removeAdvanceCriteria}/>
                                {
                                    (s.loading || !this.props.searchResult || this.props.searchResult.users.length<this.props.searchResult.curPage) ?
                                        <div className="loading"><object data="/app/images/tail-spin.svg" type="image/svg+xml"></object></div>
                                    : <SearchResult  sourceFrom="search" users={this.props.searchResult ? this.props.searchResult.users[this.props.searchResult.curPage-1] : []} platform="web" onEditAvatar={this.onEditAvatar} loading={s.loading} is_quick_view={this.state.is_quick_view} onQuickView={this.onQuickView} />
                                }
                                { (!s.loading && this.state.cur_page>0) && <Paginator max={this.state.max_page} currentPage={this.state.cur_page} isShowNum={false} onClickPrev={this.onClickPrev} onClickNext={this.onClickNext} />}
                            </div>
                            <SearchSideBar reload={this.onReloadSidebar} sidebarHeight={this.state.sidebarHeight} setSidebar={this.setSidebar}/>
                        </div>
                    }
                    {this.state.isMobile &&
                        <MobileSearch criteria={this.state.criteria} isServiceOK={this.state.isServiceOK} basic={this.state.basic}
                                  cur_page={this.state.cur_page} onRemoveAdvanceCriteria={this.removeAdvanceCriteria}/>
                    }
            </div >

        );
    }

});


function mapStateToProps(state){
    return {
        photos:state.user.photos,
        overview:state.user.overview,
        mePhotos:state.me.photos,
        criterias:state.search.criterias,
        multiCriterias:state.search.multiCriterias,
        searchResult:state.search.searchResult,
        searchCriteria:state.search.strCriteria
    }
}


Search = connect(mapStateToProps,{showUser, quickView,searchCriterias,highlightTab,usedMulitCriterias,saveSearchRst})(Search)

export default injectIntl(Search);
