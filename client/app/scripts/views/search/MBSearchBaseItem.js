var React = require('react');
var ReactDOM = require('react-dom');
var perfectScrollbar = require('perfect-scrollbar');
import Select from 'react-select';
var ReactIntl = require('react-intl');
import AdvanceSelect from "./MultiSelect.js";
import SearchAdvanceItems from './AdvanCriteria.js';
import RBCheckBox from "../../common/RBCheckBox.js";
var IntlMixin = ReactIntl.IntlMixin;
import {looking_opts,country_opts,state_opts,sign_opts,zodiac_opts,cons_opts,cons_opt_vals,birthplace_opts,
    faith_opts,height_opts,age_opts,sort_opts,adv_opts,states} from "../../common/CommonItems.js";
import {connect} from 'react-redux';
import {searchCriterias} from '../../actions/SearchActionCreators.js';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
//import SelectModal from '../../components/search/SelectModal.js';
//<SelectModal placeholder={formatMessage({id:"all" })} onChange={this.changeCountry} options={country_opts[RB.locale]} />

var MinLimitAge = 18;
var SearchFilters = React.createClass({
    getInitialState:function(){
        return {
            seeking: this.props.basic.int,
            minAge: this.props.basic.bab,
            maxAge: this.props.basic.bat,
            is_has_photo: this.props.basic.has_ok_photo_gte== 1 ? true:false,
            country: this.props.basic.country_eq,
            state_opts:states[this.props.basic.country_eq],
            state: this.props.basic.state_eq,
            sortby: this.props.basic.sortby,
            includeAge:true
        }
    },
    onSearch:function(){
        //ref close
        console.log(this.props.show_filter);
        var b = {
            "search[has_ok_photo_gte]": this.state.is_has_photo ? 1 : 0 ,
            "search[country_eq]": this.props.criterias.country_eq,
            "search[state_eq]": this.props.criterias.state_eq,
            "search[int]":this.props.criterias.int
        };
        if(this.state.includeAge)
        {
            b["search[bab]"]= this.props.criterias.bab;
            b["search[bat]"]=this.props.criterias.bat;
        }
        this.props.onSearch(b,this.props.criteria);
    },
    onCancal:function(){
        this.props.onCancal();
    },
    handleChange: function (item,value) {
        console.log('Value:', value,"cb:",item);
        var checked_cri = this.state.checked_criteria;
        checked_cri.map(function (key) {
            if(item.value == key.value)
            {
                key.checked_values = value;
            }
        });
    },
    handleDropDownOutsideClicks:function() {
      //Detect iOS and dropdown is hidden if clicked outside the Select
      if(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
        $(document).off("click touchend").on("click touchend", function(){
            $(".Select-menu-outer").hide();
            $(".Select").removeClass("is-open is-focused")
        });
        $(".Select").on("click touchend", function(e){
            e.stopPropagation();
        });
      }
    },
    removeAdvanceCriteria:function(selected_criteria){
        this.props.onRemoveAdvanceCriteria(selected_criteria);
    },
    changeMinAge:function(value){
        this.props.criterias.bab = value.toString();
    },
    onOpen:function(){
        $('.mb-search-fliters-panel').on('DOMMouseScroll mousewheel',RB.preventScrollPropagation);
        perfectScrollbar.initialize(document.getElementsByClassName('Select-menu-outer')[0],
            { suppressScrollX: true }
        )
    },
    changeMaxAge:function(value){
        var tmpAge = value;
        if(value < parseInt(this.props.criterias.bab))
            tmpAge = parseInt(this.props.criterias.bab);
        this.props.criterias.bat = tmpAge.toString();
        this.setState({changeMaxAge:true})
    },
    onFocus:function(){
        console.log(event.defaultPrevented);
    },
    isIncludeAge:function(){
        this.setState({
            includeAge: !this.state.includeAge
        })
    },
    componentDidMount:function(){
      this.handleDropDownOutsideClicks();
    },
    componentWillUnmount:function(){

    },
    changeCountry:function(value){
        this.props.criterias.country_eq = value.toString();
        var opts = states[value];
        if(opts) {
            opts.push({ values: "", options: ""});
            this.props.criterias.state_eq = "";
        }
        else{
            this.props.criterias.state_eq = "";
        }
        this.setState({ country:value,
            state_opts:states[value]
        });

        console.log("country:"+this.state.country);
    },
    changeState:function(value){
        this.props.criterias.state_eq = value;
    },
    changeSeeking:function(value){
        this.props.criterias.int = value;
    },
    isHasPhotos:function(){
        var search = jQuery.extend(true,{}, this.props.criterias);
        search.has_ok_photo_gte = this.props.criterias.has_ok_photo_gte == "true" ? "false":"true";
        this.props.searchCriterias(search);
    },
    render: function(){
        const {formatMessage} = this.props.intl;
        var countryList = [{ label: formatMessage({id:"all" }), value:''}];
        countryList = countryList.concat(country_opts[RB.locale]);
        var stateList = [{ label: formatMessage({id:"all" }), value:''}];
        if(this.props.criterias) {
            if(states[this.props.criterias.country_eq])
                stateList = stateList.concat(states[this.props.criterias.country_eq]);
        }
        return (
            <div className="mb-search-fliters-panel mb-search_filters" style={{display: this.props.show_filter?"":"none" }}>
                <div className="mb-search_filters_header">
                    <span className="mb-search_filters_span">{formatMessage({id:"filters" })}</span>
                    <span className="mb-search_filters_span mb-search_filters_close" onClick={this.onCancal} ref="closePanel"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="-Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="m.search----filters" transform="translate(-298.000000, -54.000000)" stroke-linecap="square" stroke="#9C9C9C">
                                <g id="filter-header" transform="translate(-1.000000, 41.000000)">
                                    <g id="close-dark-mobile" transform="translate(299.000000, 13.000000)">
                                        <path d="M0.704473759,0.33460565 L11.3980684,11.0419865" id="Line"></path>
                                        <path d="M11.3980684,0.33460565 L0.704473759,11.0419865" id="Line-2"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg></span>
                </div>



                <div className="mb-search_filters_items">
                    <ul>
                        <li className="mb-search_filters_label">{formatMessage({id:"essentials" })}</li>
                        <li>
                            <div className="mb-search_filters_looking-wrap"><Select name="form-field-name" clearable={false} value={this.props.criterias && this.props.criterias.int} onChange={this.changeSeeking} options={looking_opts[RB.locale]} searchable={false}/></div>
                        </li>
                        <li className="options">
                            <RBCheckBox checked={this.props.criterias && (this.props.criterias.has_ok_photo_gte =="true") ? true :false } onChange={this.isHasPhotos} checkboxId="mb_chb_has_photos" checkboxLabel={formatMessage({id:"search_page.has_photos" })}/>
                        </li>

                    </ul>
                    <ul>
                        <li className="mb-search_filters_label">{formatMessage({id:"basics" })}</li>
                        <li>
                            <span>{formatMessage({id:"ages" })}</span>
                            <span className="mb-search_filters_preference">
                              <RBCheckBox checked={!this.state.includeAge} onChange={this.isIncludeAge} checkboxId="mb_chb_include_age" checkboxLabel={formatMessage({id:"no_preference" })}/>
                            </span>
                        </li>
                        <li className="mb-search_filters_age">
                            <span className="mb-search_filters_min-age-label" style={{folat:"left"}}>
                                <span className="mb-search_filters_min-label">{formatMessage({id:"min" })}</span>
                                <Select name="form-field-name" clearable={false} onChange={this.changeMinAge} placeholder="" value={this.props.criterias && this.props.criterias.bab} disabled={!this.state.includeAge ? true:false} options={age_opts} searchable={false}/>
                            </span>
                            <span className="mb-search_filters_max-age-label">
                                <Select name="form-field-name" clearable={false} onChange={this.changeMaxAge} placeholder="" value={this.props.criterias && this.props.criterias.bat} disabled={!this.state.includeAge ? true:false} options={age_opts} searchable={false}/>
                                <span className="mb-search_filters_max-label">{formatMessage({id:"max" })}</span>
                            </span>
                        </li>
                        <li>
                            <span>{formatMessage({id:"country" })}</span>
                            <div className="mb-search_filters_looking-wrap">
                                <Select name="form-field-name" placeholder={formatMessage({id:"all" })} clearable={false} value={this.props.criterias && this.props.criterias.country_eq} onOpen = {this.onOpen} options={countryList} onChange={this.changeCountry} onFocus={this.onFocus} searchable={false}/></div>

                        </li>
                        <li>
                            <span>{formatMessage({id:"state" })}</span>
                            <div className="mb-search_filters_looking-wrap"><Select name="form-field-name" clearable={false} onChange={this.changeState} placeholder="All" value={this.props.criterias && this.props.criterias.state_eq} disabled={stateList.length < 2 ? true:false} options={stateList} searchable={false}/></div>
                        </li>
                    </ul>
                    <ul>
                        <li className="mb-search_filters_label">{formatMessage({id:"advanced" })} </li>
                        <SearchAdvanceItems isMobile={true} criteria={this.props.criteria} onRemoveAdvanceCriteria={this.removeAdvanceCriteria} basic={this.state.basic}/>
                    </ul>
                </div>
                <div className="mb-search_show-match"><span className="mb-search_show-match_bn" onClick={this.onSearch}>{formatMessage({id:"search_page.show_matches" })}</span></div>


            </div>
        )
    }
});
function mapStateToProps(state){
    return {
        criterias:state.search.criterias
    }
}
SearchFilters = connect(mapStateToProps,{searchCriterias})(SearchFilters);

export default injectIntl(SearchFilters);
