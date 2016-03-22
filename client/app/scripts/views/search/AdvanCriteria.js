var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import AdvanceSelect from "./MultiSelect.js";
import Select from 'react-select';
import {cons_opts,cons_opt_vals,sign_opts,zodiac_opts,birthplace_opts,faith_opts,height_opts,age_arrived_opts} from "../../common/CommonItems.js";
import {usedMulitCriterias} from '../../actions/SearchActionCreators.js';
import ConstantValues from '../../utils/ConstantValues';
import SpinnerSelect from './SpinnerSelect.js'

var adv_opts= {
    'zodiac': {multi:true, options:cons_opts["zodiac"],values:cons_opt_vals['zodiac']},
    'chinese_zodiac': {multi:true, options:cons_opts["chinese_zodiac"],values:cons_opt_vals['chinese_zodiac'] },
    'body_type': {multi:true, options:cons_opts['body_type'],values:cons_opt_vals['body_type']},
    'marital_status': {multi:true, options:cons_opts['marital_status'],values:cons_opt_vals['marital_status']},
    'birthplace': {multi:true, options:birthplace_opts ,values:[[1,2,3,4,5,6]]},
    'immigration': {multi:true, options:cons_opts['immigration'] ,values:cons_opt_vals['immigration']},
    'religion': {multi:true, options:cons_opts["religion"],values:cons_opt_vals["religion"] },
    'languages': {multi:true, options:cons_opts['languages'] ,values:cons_opt_vals['languages']},
    'interests': {multi:true, options:cons_opts['interests'],values:cons_opt_vals['interests'] },
    'smoking': {multi:true, options:cons_opts['smoking'],values:cons_opt_vals['smoking']},
    'drinking': {multi:true, options:cons_opts['drinking'] ,values:cons_opt_vals['drinking']},
    'minimum_income': {multi:false, options:cons_opts['income']},
    'height': {multi:false, options:height_opts[RB.locale]},
    'have_children': {multi:false, options:cons_opts['have_children']},
    'education': {multi:false, options:cons_opts['education'] },
    'age_arrived': {multi:false, options:age_arrived_opts }
};

var minHeight = ConstantValues.SEARCH.DEFAULT_MIN_HEIGHT;
var maxHeight = ConstantValues.SEARCH.DEFAULT_MAX_HEIGHT;
var convertToCentimeter = function (inches) {
  return Math.round(inches * 2.54);
}

var SearchAdvanceItems = React.createClass({
    getInitialState:function(){
        return {
            last_selected: "",
            showHeight: false,
        }
    },
    handleSelectChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        const {formatMessage} = this.props.intl;
        var checked_cri = this.props.multiCriterias.concat();
        checked_cri.push({value:value,label:formatMessage({id:"search_filter." +value}),checked_values:[],checked_values1:[]});
        this.props.usedMulitCriterias(checked_cri);
        //this.setState({last_selected:value});
    },

    handleChange: function (item,value) {
        console.log('Value:', value,"isValue1:");
        var checked_cri = this.props.multiCriterias.concat();
        checked_cri.map(function (key) {
            if(item.value == key.value)
            {
               key.checked_values = value;
            }
        });
        this.props.usedMulitCriterias(checked_cri);
    },
    handleChange1: function (item,value) {
        console.log('Value:', value,"isValue1:");
        var checked_cri = this.props.multiCriterias.concat();
        checked_cri.map(function (key) {
            if(item.value == key.value)
            {
                if(key.checked_values > value){
                    value = key.checked_values;
                }
                key.checked_values1 = value;
            }
        });
        this.props.usedMulitCriterias(checked_cri);
    },

    handleMultiChange: function (item,values) {
        if(values.length == 0){
            this.props.onRemoveAdvanceCriteria(item);
            return;
        }
        adv_opts[item.value].values[0] = values;
        var checked_cri = this.props.multiCriterias.concat();
        checked_cri.map(function (key) {
            if(item.value == key.value)
            {
                key.checked_values = values;
            }
        });
        this.props.usedMulitCriterias(checked_cri);
    },
    removeAdvanceCriteria: function(item){
        this.props.onRemoveAdvanceCriteria(item);
    },
    selectedItems:function(selected_criteria){
        this.props.onSelectedItem();
    },
    convertToImperial: function(inches) {
      let foot = Math.floor(inches / 12);
      inches = Math.round(inches%12);
      return (foot.toString() + "'" + inches.toString() + "\"");
    },
    convertToCentimeter: function (inches) {
      return Math.round(inches * 2.54);
    },
    handleHeight: function (item, operation, event) {
      var checked_cri = this.props.multiCriterias.concat();
      checked_cri.map(function (key) {
          if(item.value == key.value)
          {
              switch (operation) {
                case "increaseMin" : key.checked_values = convertToCentimeter(++minHeight); break;
                case "decreaseMin" : key.checked_values = convertToCentimeter(--minHeight); break;
                case "increaseMax" : key.checked_values1 = convertToCentimeter(++maxHeight); break;
                case "decreaseMax" : key.checked_values1 = convertToCentimeter(--maxHeight); break;
                default: console.log("error");
              }
          }
      });
      this.props.usedMulitCriterias(checked_cri);
    },
    toggleHeightDropdown:function(){
        this.setState({ showHeight: !this.state.showHeight });
    },
    render: function(){
        var adv_criteria = [];
        const {formatMessage} = this.props.intl;
        for(var key in adv_opts){
            var is_disabled = false;
            if(this.props.multiCriterias)
                this.props.multiCriterias.map(function (item,index) {
                    if(item.value == key)
                    {
                        is_disabled = true;
                    }
                }.bind(this));
            if(!is_disabled){
                adv_criteria.push({value:key,label:formatMessage({id:"search_filter." +key})});
            }
        }

        var renderHtml = this.props.multiCriterias && this.props.multiCriterias.map(function (item) {
            var metaItem = adv_opts[item.value];
            
            if (item.value == "height") {
              if(!this.props.isMobile) {
                item.checked_values = convertToCentimeter(minHeight);
                item.checked_values1 = convertToCentimeter(maxHeight);
              }
                  return (
                    <div>
                      <li className="search_adv_item search_adv_item--range" key={item.value}
                        style={{ display: this.props.isMobile ? 'block' : 'none' }}>
                          <div className="search_adv_wrap">
                              <AdvanceSelect
                                  label={""}
                                  className='my-example-select-box'
                                  options={metaItem.options}
                                  value={ item.checked_values}
                                  onChange={ this.handleChange.bind(null,item)}
                                  item = {item}
                                  includeClose = {true}
                                  onRemoveItem={this.removeAdvanceCriteria.bind(null,item)}
                                  />
                              {formatMessage({id:"to"})}
                              <AdvanceSelect
                                  label={""}
                                  className='my-example-select-box right-select-box'
                                  options={metaItem.options}
                                  value={ item.checked_values1}
                                  onChange={ this.handleChange1.bind(null,item)}
                                  item = {item}
                                  includeLabel = {true}
                                  opt2 = "value1"
                                  onRemoveItem={this.removeAdvanceCriteria.bind(null,item)}
                              />
                          </div>
                      </li>
                      <li className="search_adv_item search_adv_height"
                        style={{ display: this.props.isMobile ? 'none' : 'block' }}>
                        <SpinnerSelect onRemoveItem={this.removeAdvanceCriteria.bind(null,item)} spinnerLabel="Height"
                          minValue={this.convertToImperial(minHeight)} maxValue={this.convertToImperial(maxHeight)}
                          increaseMin={this.handleHeight.bind(null, item, "increaseMin")} decreaseMin={this.handleHeight.bind(null, item, "decreaseMin") }
                          increaseMax={this.handleHeight.bind(null, item, "increaseMax")} decreaseMax={this.handleHeight.bind(null, item, "decreaseMax") }
                          />
                      </li>
                      </div>
                    )
            }
            else if (item.value == "minimum_income" || item.value == "have_children" || item.value == "education" || item.value == "age_arrived") {
                var cls = (item.value == "age_arrived") ? "search_adv_item search_adv_item--age" : "search_adv_item";

                return (
                    <li className={cls} key={item.value}>
                        <div className="search_adv_wrap">
                            <AdvanceSelect
                                label={""}
                                className='my-example-select-box'
                                options={metaItem.options}
                                value={ item.checked_values}
                                onChange={ this.handleChange.bind(null,item)}
                                item = {item}
                                onRemoveItem={this.removeAdvanceCriteria.bind(null,item)}
                                /></div>
                    </li>
                )
              }
            else
                item.checked_values = metaItem.values[0];
                return (
                  <li className="search_adv_item" key={item.value}>
                    <div className="search_adv_wrap">
                        <AdvanceSelect
                            label={"All"}
                            className='my-example-select-box'
                            options={metaItem.options}
                            onChange={ this.handleMultiChange.bind(null,item)}
                            multiple={true}
                            value={item.checked_values }
                            item = {item}
                            onRemoveItem={this.removeAdvanceCriteria.bind(null,item)}
                            /></div>
                </li>)
        }.bind(this));
        return (
            <ul className="search_adv_opts search_item_row">
                <li className="search_item_label search_item_label--advance">{formatMessage({id:"advanced" }) }</li>
                <div className="search_field_row">
                    {renderHtml}
                    <li className="search_adv_item"><div className="search_wrap"><Select name="form-field-name" placeholder={formatMessage({id:"search_page.advanced_filters" })} defaultValue={formatMessage({id:"search_page.advanced_filters" })} clearable={false} label="Advanced filters" options={adv_criteria} searchable={false} onChange={this.handleSelectChange}/></div></li>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{clear:"both"}}></div>
            </ul>
        )
    }
});
function mapStateToProps(state){
    return {
        multiCriterias:state.search.multiCriterias
    }
}
SearchAdvanceItems = connect(mapStateToProps,{usedMulitCriterias})(SearchAdvanceItems)
export default injectIntl(SearchAdvanceItems);
