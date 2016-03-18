var React = require('react');
var ReactDOM = require('react-dom');
import SearchResult from "./SearchResult.js"
import AdvanceSelect from "./MultiSelect.js"
import Select from 'react-select';
import SearchUser from '../../models/SearchUser.js';
var RBService = require('../../services/RBService');
import {connect} from 'react-redux';
import SearchFilters from "./MBSearchBaseItem.js";
import {searchCriterias,saveSearchRst} from '../../actions/SearchActionCreators.js';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import {sort_opts} from "../../common/CommonItems.js";

var mapAdv = {
    sign:"search[profile_zodiac_eq]",
    'zodiac': "search[profile_cn_zodiac_eq]",
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


var loading_nextpage=false;
var MobileSearch = React.createClass({
    getInitialState: function() {
        return {
            show_filter: false,
            m_cur_page:this.props.cur_page,
            m_max_page:this.props.max_page,
            loading :true,
            search_Criterias:""
        }
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
        params.push("use_advanced=1");
        return params.join("&");
    },
    onSearch: function(b,m){
        var param = this.searchParams(b,m);
        this.setState({
            show_filter: false,
            loading: true,
            search_Criterias:param,
            m_cur_page:1
        });
        param = param + "&search[order]=" + this.props.criterias.order;
        RBService.getUserList(param).then(function(response){
            var list = response.data.users;
            var users = this.mapUsers(list);
            this.setState({
                m_cur_page: response.data.next_page-1,
                loading:false
            });
            this.props.searchCriterias(response.data.search,param);
            var userList = [];
            userList.push(users);
            if (response.data.next_page > 0)
                RB.addChangeLayoutListener(this.initScroll);
            this.props.saveSearchRst(userList,1);
        }.bind(this)).catch(function(response){
            console.log("onSearch getUserList error:",response);
            this.setState({
                loading:false
            });
        }.bind(this))
    },
    showFilterPanel:function(){
        this.setState({
            show_filter: true
        });
    },
    onCancal:function(){
        this.setState({
            show_filter: false
        });
    },
    removeAdvanceCriteria:function(selected_criteria){
        this.props.onRemoveAdvanceCriteria(selected_criteria);
    },
    initScroll: function(){

    },
    componentWillReceiveProps:function(){
        console.log("sub componentWillReceiveProps");
        if(this.props.searchResult){
            this.setState({
                loading:false,
                cur_page:this.props.searchResult.curPage
            });
        }
        else {
            if(this.props.isServiceOK){}

            else
                this.setState({
                    loading:false
                });
        }
    },
    componentDidMount:function(){
        console.log("sub componentDidMount");
        this.setState({
            search_Criterias: "use_advanced=1"
        })
        this.initScroll();
    },
    componentWillUnmount: function() {

    },
    mapUsers:function(source){
        var users = [];//this.state.m_users;
        if (source == null || source.length<1){
            return users;
        }
        source.forEach(function(u){
            var user = (new SearchUser(u.user)).data;
            users.push(user);
        });
        return users;
    },
    changeSort:function(value){
        this.props.criterias.order = value;
        this.setState({
            loading: true,
            m_cur_page:1
        });
        RBService.getUserList(this.props.searchCriteria + "&search[order]=" + value).then(function(response){
            var list = response.data.users;
            var users = this.mapUsers(list);
            if (response.data.next_page == 0) {

                this.setState({
                    m_max_page: this.state.m_cur_page
                });
                RB.removeChangeLayoutListener(this.initScroll);
            }
            else{
                this.setState({
                    m_cur_page: response.data.next_page-1
                });
            };
            loading_nextpage=false;

                var userList = [];
                userList.push(users);
                this.props.saveSearchRst(userList,1);

        }.bind(this)).catch(function(response){
            loading_nextpage=false;
            console.log("getConstantData error:",response);
        });
        console.log("fff::" + this.props.criteria);
    },
    render: function(){
        var userList = [];
        const {formatMessage} = this.props.intl;
        if(this.props.searchResult){
            this.props.searchResult.users.map(function(u){
                userList = userList.concat(u);
            })
        }
        return (
            <div className="mb-search-panel mb-search">
                <div className="mb-search_result" style={{display: this.state.show_filter?"none":"" }}>
                    <div className="mb-search_head">
                        <span className="mb-search_button" onClick={this.showFilterPanel}>{formatMessage({id:"filters" })}</span>
                        <div className="mb-search_sort"><Select className="sel_control" searchable={false} onChange={this.changeSort} placeholder={formatMessage({id:"sort_by" })} value={this.props.criterias && this.props.criterias.order} name="form-field-name" clearable={false} options={sort_opts[[RB.locale]]} label={formatMessage({id:"sort_by" })} /></div>
                    </div>
                    {

                        (!this.props.searchResult || this.props.searchResult.users.length<this.props.searchResult.curPage) ? <div className="loading"><object data="/app/images/tail-spin.svg" type="image/svg+xml"></object></div> :

                            <SearchResult users={userList} is_quick_view={false} platform="mb" sourceFrom="search" />
                    }
                    {
                        loading_nextpage && <div className="loading"><object data="/app/images/tail-spin.svg" type="image/svg+xml"></object></div>
                    }
                </div>
                <SearchFilters onSearch={this.onSearch} onCancal={this.onCancal} show_filter={this.state.show_filter} basic={this.props.basic} criteria={this.props.criteria} onRemoveAdvanceCriteria={this.removeAdvanceCriteria}/>
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        searchResult:state.search.searchResult,
        searchCriteria:state.search.strCriteria,
        criterias:state.search.criterias
    }
}
MobileSearch = connect(mapStateToProps,{searchCriterias,saveSearchRst})(MobileSearch)
export default injectIntl(MobileSearch);
