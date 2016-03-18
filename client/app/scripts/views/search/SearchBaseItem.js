var React = require('react');
var ReactDOM = require('react-dom');
var scrollbar = require('perfect-scrollbar');
import Select from 'react-select';
var ReactIntl = require('react-intl');
import AdvanceSelect from "./MultiSelect.js";
import SearchAdvanceItems from './AdvanCriteria.js';
import SpinnerSelect from './SpinnerSelect.js'
import RBCheckBox from "../../common/RBCheckBox.js";
var IntlMixin = ReactIntl.IntlMixin;
import {looking_opts,country_opts,state_opts,cons_opts,cons_opt_vals,birthplace_opts,
    faith_opts,height_opts,age_arrived_opts,sort_opts,adv_opts,states} from "../../common/CommonItems.js";
import {connect} from 'react-redux';
import {searchCriterias} from '../../actions/SearchActionCreators.js';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';


var MinLimitAge = 18;
var initialMaxAge = 45
var SearchBaseItem = React.createClass({
    getInitialState:function(){
        return {
            seeking: this.props.basic.int,
            minAge: this.props.basic.bab,
            maxAge: initialMaxAge,
            isHideCriteria: false,
            is_quick_view: this.props.is_quick_view,
            is_has_photo: this.props.basic.has_ok_photo_gte== 1 ? true:false,
            country: this.props.basic.country_eq,
            state_opts:[],
            state: this.props.basic.state_eq,
            sortby: this.props.basic.sortby
        }
    },
    increaseMinAge: function(){
            this.props.criterias.bab = parseInt(this.props.criterias.bab) + 1;
            this.setState ({ minAge : this.props.criterias.bab});
    },
    decreaseMinAge: function(){
        if(this.props.criterias.bab > MinLimitAge )
            this.props.criterias.bab = parseInt(this.props.criterias.bab) - 1;
            this.setState ({ minAge : this.props.criterias.bab});
    },
    increaseMaxAge: function(){
        console.log("ffasl;dkjf:" + this.props.criterias.bat + " | " + this.state.maxAge);
        this.props.criterias.bat = parseInt(this.props.criterias.bat) + 1;
        this.setState ({ maxAge : this.props.criterias.bat});
    },
    decreaseMaxAge: function(){
        if(parseInt(this.props.criterias.bat) > parseInt(this.props.criterias.bab)) {
          this.props.criterias.bat = parseInt(this.props.criterias.bat) - 1;
          this.setState ({ maxAge : this.props.criterias.bat});
        }
    },
    onSearch:function(){
        var b = {
            "search[has_ok_photo_gte]": this.state.is_has_photo ? 1 : 0 ,
            "search[country_eq]": this.props.criterias.country_eq,
            "search[state_eq]": this.props.criterias.state_eq,
            "search[bab]":this.props.criterias.bab,
            "search[bat]":this.props.criterias.bat,
            "search[int]":this.props.criterias.int,
            "search[order]":this.props.criterias.order
        };
        this.props.onSearch(b,this.state.is_quick_view,this.props.multiCriterias);
    },
    showEditAge:function(){
        this.setState({ isEditAge: !this.state.isEditAge });
    },
    componentDidMount: function() {
        //$('.Select-menu-outer').on('DOMMouseScroll mousewheel',RB.preventScrollPropagation);


    },
    componentWillUnmount:function(){

    },
    removeAdvanceCriteria:function(selected_criteria){
        this.props.onRemoveAdvanceCriteria(selected_criteria);
    },
    changeSort:function(value){

        this.props.criterias.order = value;
        console.log("fff::" + this.props.criteria);
    },
    showCriteria:function(){
        this.setState({ isHideCriteria: false })
    },
    changeSeeking:function(value){
        this.props.criterias.int = value;
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
        this.setState({changed:true})
    },
    changeState:function(value){
        this.props.criterias.state_eq = value;
    },
    isEnableQuick:function(){
        this.props.onSetQuickView(!this.state.is_quick_view);
        this.setState({ is_quick_view:!this.state.is_quick_view });
    },
    isHasPhotos:function(){
        var search = jQuery.extend(true,{}, this.props.criterias);
        search.has_ok_photo_gte = this.props.criterias.has_ok_photo_gte == "true" ? "false":"true"
        this.props.searchCriterias(search);
    },
    render: function(){
        const {formatMessage} = this.props.intl;
        var criteriaHtml = this.props.multiCriterias && this.props.multiCriterias.map(function (item) {
            return(
                <li className="search_criteria_items" key={item.value}><span className="search_criteria_item">{item.label} <span className="search_criteria_close" onClick={this.removeAdvanceCriteria.bind(null,item)}>
                    <svg width="12px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="-Search" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                        <g id="main-paged-nav" transform="translate(-237.000000, -248.000000)" strokeLinecap="square" stroke="#A9A9A9" strokeWidth="2">
                            <g id="filters-copy" transform="translate(17.000000, 74.000000)">
                                <g id="advanced" transform="translate(90.000000, 163.000000)">
                                    <g id="filter:-sign">
                                        <g id="close-dark" transform="translate(131.000000, 13.000000)">
                                            <path d="M0.587061466,0.278838042 L9.49839033,9.20165538" id="Line"></path>
                                            <path d="M9.49839033,0.278838042 L0.587061466,9.20165538" id="Line-2"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg></span></span></li>
            )
        }.bind(this));
        var countryList = [{ label: formatMessage({id:"all" }), value:''}];
        countryList = countryList.concat(country_opts[RB.locale]);
        var stateList = [{ label: formatMessage({id:"all" }), value:''}];
        if(this.props.criterias) {
            if(states[this.props.criterias.country_eq])
                stateList = stateList.concat(states[this.props.criterias.country_eq]);
        }
        return (
            <div className="search_item">
                <div className="search_opts">
                    <div className="search_criteria" style={{display:!this.state.isHideCriteria?"none":""}}>
                        <li className="search_criteria_items"><span className="search_button_change no-border" onClick={this.showCriteria}>{formatMessage({id:"search_page.change_filters" })}</span></li>
                        {criteriaHtml}<div style={{clear:"both"}}></div>
                    </div>
                    <div style={{display:this.state.isHideCriteria?"none":""}}>
                        <ul className="search_item_row">
                            <li className="search_item_label">{formatMessage({id:"essentials" })}</li>
                            <div className="search_field_row search_essentials_options">
                                <li className="search_field_item search_sex-opt">
                                    <div className="search_looking_wrap"><Select name="form-field-name" onChange={this.changeSeeking} clearable={false} value={this.props.criterias && this.props.criterias.int} options={looking_opts[RB.locale]} searchable={false} /></div>
                                </li>
                                <li className="search_field_item search_options">
                                  <RBCheckBox checked={this.state.is_quick_view} onChange={this.isEnableQuick} checkboxId="chb_is_quick_view" checkboxLabel={formatMessage({id:"search_page.enable_quick_view" })}/>
                                </li>
                                <li className="search_field_item search_options">
                                  <RBCheckBox checked={this.props.criterias && (this.props.criterias.has_ok_photo_gte =="true") ? true :false } onChange={this.isHasPhotos} checkboxId="chb_has_photos" checkboxLabel={formatMessage({id:"search_page.has_photos" })}/>
                                </li>

                                <div style={{clear:"both"}}></div>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </ul>
                        <ul className="search_item_row">
                            <li className="search_item_label">{formatMessage({id:"basics" })} </li>
                            <div className="search_field_row search_basic_options">
                              <div className="search_age-state_wrapper">
                                <li className="search_field_item search_age_option">
                                  <SpinnerSelect spinnerLabel={formatMessage({id:"ages" })}
                                    minValue={this.props.criterias && this.state.minAge} maxValue={this.props.criterias && this.state.maxAge}
                                    increaseMin={this.increaseMinAge} decreaseMin={this.decreaseMinAge}
                                    increaseMax={this.increaseMaxAge} decreaseMax={this.decreaseMaxAge}
                                    />
                                </li>
                                <li className="search_field_item search_country"><div className="search_country_wrap"><Select name="form-field-name" value={this.props.criterias && this.props.criterias.country_eq} clearable={false} placeholder={formatMessage({id:"all" })} onChange={this.changeCountry} options={countryList} searchable={false}/></div></li>
                              </div>
                                <li className="search_field_item search_state"><div className="search_state_wrap"><Select name="form-field-name" value={this.props.criterias && this.props.criterias.state_eq} placeholder={formatMessage({id:"all" })} disabled={stateList.length <= 1 ? true:false} clearable={false} onChange={this.changeState}  options={stateList} searchable={false}/></div></li>
                                <div style={{clear:"both"}}></div>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </ul>
                        <SearchAdvanceItems criteria={this.props.criteria} onRemoveAdvanceCriteria={this.removeAdvanceCriteria}/>
                    </div>
                </div>
                <div className="search_control">
                    <li className="search_sort">
                        <div className="search_sort_wrap"><Select className="sel_control" searchable={false} onChange={this.changeSort} placeholder={formatMessage({id:"sort_by" })} value={this.props.criterias && this.props.criterias.order} name="form-field-name" clearable={false} options={sort_opts[[RB.locale]]} label={formatMessage({id:"sort_by" })} /></div>
                    </li>
                    <li className="search_button no-border" onClick={this.onSearch}>{formatMessage({id:"search_page.show_matches" })}</li>
                </div>
            </div>
        )
    }
});
function mapStateToProps(state){
    return {
        criterias:state.search.criterias,
        multiCriterias:state.search.multiCriterias
    }
}
SearchBaseItem = connect(mapStateToProps,{searchCriterias})(SearchBaseItem)
export default injectIntl(SearchBaseItem);
