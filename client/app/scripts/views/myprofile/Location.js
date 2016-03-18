var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
var RBService = require('../../services/RBService');
import Select from 'react-select';
import SelectWrap from './SelectWrap.js';
import {gender_opts,region_opts,country_opts,sign_opts,zodiac_opts,cons_opts,birthplace_opts,
    faith_opts,height_opts,age_arrived_opts,states,cons_opt_vals,timeZone_opts,year_opts,day_opts,month_opts} from "../../common/CommonItems.js";

var layout_item_map = {
    "name":"text",
    "gender":"select",
    "height":"text",
    "currentCountry":"select",
    "zipCode":"text",
    "currentRegion":"select",
    "timeZone":"select",
    "bodyType":"select",
    "maritalStatus":"select",
    "haveChildren":"select",
    "birthplace":"select",
    "ethnicity":"select",
    "education":"select",
    "occupation":"select",
    "income":"select",
    "immigration":"select",
    "firstArrived":"select",
    "faith":"select",
    "smoke":"select",
    "drink":"select",
    "language":"checkbox",
    "interests":"checkbox",
    "birthday": "multi-sel"
};
var opts_item_map = {
    "gender":gender_opts,
    "currentCountry":country_opts[RB.locale],
    "currentRegion":country_opts[RB.locale],
    "timeZone":timeZone_opts,
    "bodyType":cons_opts['body_type'],
    "maritalStatus":cons_opts['marital_status'],
    "haveChildren":cons_opts['have_children'],
    "birthplace":cons_opts['birthplace_opts'],
    "ethnicity":cons_opts['ethnicity'],
    "education":cons_opts['education'],
    "occupation":cons_opts['occupation'],
    "income":cons_opts['income'],
    "immigration":cons_opts['immigration'],
    "firstArrived":age_arrived_opts,
    "faith":faith_opts,
    "smoke":cons_opts['smoking'],
    "drink":cons_opts['drinking'],
    "language":cons_opts['languages'],
    "interests":cons_opts['interests']
};

var mapDetailParams = {
    name:"user[first_name]",
    "gender":"user[sex]",
    "height":"user[profile_details][height]",
    "currentCountry":"user[country]",
    "zipCode":"user[location]",
    "currentRegion":"select",
    "timeZone":"select",
    "bodyType":"user[profile_details][body_type]",
    "maritalStatus":"user[profile_details][marital_status]",
    "haveChildren":"user[profile_details][has_children]",
    "birthplace":"user[profile_details][birth_country]",
    "ethnicity":"user[profile_details][ethnicity]",
    "education":"user[profile_details][education]",
    "occupation":"user[profile_details][occupation]",
    "income":"user[profile_details][income]",
    "immigration":"user[profile_details][immigration]",
    "firstArrived":"user[profile_details][first_arrive]",
    "faith":"user[profile_details][religion]",
    "smoke":"user[profile_details][smoking]",
    "drink":"user[profile_details][drinking]",
    "language":"user[profile_details][languages]",
    "interests":"user[profile_details][interests]",
    "birthday": "user[birthday]"
};

var Text = React.createClass({
    getInitialState :function(){
        return {
            isChange: false
        }
    },
    onTxtChange: function (name,old_val,label, e) {
        this.props.onTxtChange(name,old_val,label, e);
    },
    onFocus:function(e){
        e.target.focus();
        $("#zipCode").focus();
    },
    componentDidMount:function(){
      console.log("fsdfsdfsdf");
    },
    onChange:function(e){
        this.setState({
            isChange:true,
            value:e.target.value
        });
    },
    render:function(){
        var value= this.state.isChange ? this.state.value : this.props.value;
        return(
            <input ref="zip" className="mymatch-detail_edit-item_value--zip-code_input" value={value } id="zipCode" type="text" onChange={this.onChange} onClick={this.onFocus} onBlur={this.onTxtChange.bind(null,this.props.item.name,this.props.item.old_val,this.props.item.label)} />
        )
    }
});

var Location = React.createClass({
    getInitialState :function(){
        return {
            city:"",
            timeZoneOpts:timeZone_opts,
            regionOpts:[],
            showZipCode : true,
            isExpand: this.props.iterms.name ==this.props.activeSection ? true: false,
            isChangeCountry:false
        }
    },
    onTxtChange: function (name,old_val,label, e) {
        this.setState({
            isChangeCountry: false
        });
        RBService.resolveZipCode(this.refs.country.state.value,e.target.value).then(function(response){
            var r = response.data;
            this.setState({
                city: r.city + ", " + r.state
            });
        }.bind(this))
        .catch(function(response){
            const {formatMessage} = this.props.intl;
            this.setState({
                city: formatMessage({id:"not_zipcode"})
            });
            console.log("resolveZipCode error:",response);
        }.bind(this));
        this.props.onModifiedItem(this.props.iterms.name,name,old_val,e.target.value,[],label,[],3,false);
    },
    detailObjToArray:function(obj){
        var items = [];
        for(var item in obj) {
            if(typeof(obj[item]) !== "object" || obj[item]==null)
                items.push({
                    details:{
                        name: item,
                        label:item,
                        text:'',
                        value: obj[item] ? obj[item] : "",
                        type:item,
                        old_val:obj[item] ? obj[item] : ""
                    },
                    opts:opts_item_map[item]
                });
            else {
                if (obj[item].values === undefined && layout_item_map[item]!="checkbox")
                    items.push({
                        details:{
                            name: item,
                            label:obj[item].label,
                            text: obj[item].text == undefined ? "" : obj[item].text,
                            value: obj[item].value == undefined ? "" : obj[item].value,
                            type:item,
                            old_val:obj[item].value == undefined ? "" : obj[item].value
                        },
                        opts:opts_item_map[item]
                    });
                else {
                    var vals = [], txts = [];
                    if(obj[item].values !== undefined){
                        obj[item].values.map(function (v) {
                            vals.push(v.value);
                            txts.push(v.text);
                        });
                    };
                    items.push({
                        details:{
                            name:item,
                            label: obj[item].label,
                            text: txts,
                            value: vals,
                            type:item,
                            old_val:vals.slice(0)
                        },
                        opts:opts_item_map[item]
                    });
                }
            }
        }
        return items;
    },
    toggleItemClass:function(section){
        this.props.switchSection(section);
        this.setState({
            isExpand:!this.state.isExpand
        });
    },
    componentDidMount:function(){
        var countryCode = RB.getMe().detail.location.currentCountry;
        if(timeZone_opts.length<1){
            RBService.getTimezone(countryCode).then(function(response){
                var timezones = response.data.timezones;
                timeZone_opts.splice(0,timeZone_opts.length);
                timezones.forEach(function(timezone,index){
                    timeZone_opts.push({label:timezone[0],value:timezone[1]})
                });
                this.setState({timeZoneOpts:arrtimezone})
            }.bind(this))
                .catch(function(response){
                    console.log("getTimezone error:",response);
                });
        }
        if(countryCode == "158" || countryCode == "128")
            this.setState({
                showZipCode:false,
                regionOpts:region_opts[countryCode.toString()][RB.locale]
            });
    },
    onSelectChange:function(name,old_val,value,label){
        if(name == "currentCountry"){
            this.setState({
                isChangeCountry: true,
                city:""
            });
            if(value.toString() == "158" || value.toString() == "128")
                this.setState({
                    showZipCode:false,
                    regionOpts:region_opts[value.toString()][RB.locale]
                });
            else{
                this.setState({
                    showZipCode:true
                });
            }

            RBService.getTimezone(value).then(function(response){
                var timezones = response.data.timezones;
                timeZone_opts.splice(0,timeZone_opts.length);
                timezones.forEach(function(timezone,index){
                    timeZone_opts.push({label:timezone[0],value:timezone[1]})
                });
                this.setState({timeZoneOpts:timeZone_opts})

            }.bind(this))
                .catch(function(response){
                    console.log("getTimezone error:",response);
                });
        }
        this.props.onModifiedItem(this.props.iterms.name,name,old_val,value,[], label,[], 1,false);
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var cls = this.props.iterms.name ==this.props.activeSection ? "class-expand": "class-expand active";
        var nav_cls = this.props.iterms.name ==this.props.activeSection ? "detail-nav active": "detail-nav";
        var items = this.detailObjToArray(this.props.iterms.value);
        var subhtml = items.map(function(sub_i){
            var label = formatMessage({id:sub_i.details.label});
            if(sub_i.details.label == "currentCountry"){
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}} key={sub_i.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label}</li><li className="mymatch-detail_edit-item_value edit-item_value--country">
                        <SelectWrap ref="country" onChange={this.onSelectChange.bind(null,sub_i.details.name,sub_i.details.old_val)} value={sub_i.details.value.toString()} options={sub_i.opts} /></li>
                    </ul>
                )
            }
            else if(sub_i.details.label == "zipCode" && this.state.showZipCode){
                console.log("this.state.isChangeCountry::" + this.state.isChangeCountry );
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)? "": "none" }} key={sub_i.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label }</li><li className="mymatch-detail_edit-item_value edit-item_value--zip-code">
                        <Text item={sub_i.details} onTxtChange={this.onTxtChange} value={this.state.isChangeCountry ? "" : sub_i.details.value } />
                        <span className="mymatch-detail_edit-item_value--zip-code_result">{this.state.city}</span>
                    </li>
                    </ul>
                );
            }
            else if(sub_i.details.label == "currentRegion" && !this.state.showZipCode){
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection) ?"":"none"}}  key={sub_i.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label}</li><li className="mymatch-detail_edit-item_value edit-item_value--state">
                        <SelectWrap onChange={this.onSelectChange.bind(null,sub_i.details.name,sub_i.details.old_val)} value={sub_i.details.value.toString()} options={this.state.regionOpts} /></li>
                    </ul>
                )
            }
            else if(sub_i.details.label == "timeZone"){
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}}  key={sub_i.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label}</li><li className="mymatch-detail_edit-item_value mymatch-detail_edit-item_value--time-zone">
                        <SelectWrap onChange={this.onSelectChange.bind(null,sub_i.details.name,sub_i.details.old_val)} value={sub_i.details.value.toString()} options={this.state.timeZoneOpts} /></li>
                    </ul>
                )
            }
        }.bind(this));
        return (
            <div>
                <ul className="mymatch-detail_class-item" key={this.props.iterms.name} onClick={this.toggleItemClass.bind(null,this.props.iterms.name)}>{formatMessage({id:this.props.iterms.name})}<div className={"mymatch-detail_" + nav_cls}><span className={"mymatch-detail_" + cls}></span></div></ul>
                    { subhtml  }
            </div>
        )
    }
});

export default injectIntl(Location);
