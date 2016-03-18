var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
var RBService = require('../../services/RBService');
import {gender_opts,country_opts,sign_opts,zodiac_opts,cons_opts,birthplace_opts,
    faith_opts,height_opts,age_arrived_opts,sort_opts,adv_opts,states,cons_opt_vals,timeZone_opts,year_opts,day_opts,month_opts} from "../../common/CommonItems.js";
import CheckBox from "../../common/CheckBox.js";
import RBCheckBox from "../../common/RBCheckBox.js";
import SelectWrap from './SelectWrap.js';
import {saveDetail} from '../../actions/MeActionCreators.js';
import Location from './Location.js';

var layout_item_map = {
    "name":"text",
    "gender":"select",
    "height":"select",
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
    "gender":gender_opts[RB.locale],
    "currentCountry":country_opts[RB.locale],
    "currentRegion":country_opts[RB.locale],
    "timeZone":timeZone_opts,
    "bodyType":cons_opts['body_type'],
    "maritalStatus":cons_opts['marital_status'],
    "haveChildren":cons_opts['have_children'],
    "birthplace":country_opts[RB.locale],
    "ethnicity":cons_opts['ethnicity'],
    "education":cons_opts['education'],
    "occupation":cons_opts['occupation'],
    "income":cons_opts['income'],
    "immigration":cons_opts['immigration'],
    "firstArrived":age_arrived_opts,
    "faith":cons_opts['religion'],
    "smoke":cons_opts['smoking'],
    "drink":cons_opts['drinking'],
    "language":cons_opts['languages'],
    "interests":cons_opts['interests'],
    height:height_opts[RB.locale]
};

var mapDetailParams = {
    name:"user[first_name]",
    "gender":"user[sex]",
    "height":"user[profile_details][height]",
    "currentCountry":"user[country]",
    "zipCode":"user[location]",
    "currentRegion":"user[state]",
    "timeZone":"user[setting_attributes][preferred_timezone]",
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
function getLabelByValue(value,opts){
    for(var item in opts)
    {
        if(opts[item].value.toString() == value.toString()){
            return opts[item].label;
        }
    }
    return value;
}

var DetailView = React.createClass({
    onEdit:function() {
      this.props.onEdit();
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var items = [];
        var classItems = objToArray(this.props.detailItems);

        var itemHtml = classItems.map(function(i,index){
            var detailItems = objToArray(i.value);
            detailItems.map(function(item){
                if((i.name == "general" || i.name == "location")&&item.name!="height" ){
                    if(item.name=="birthday"){
                        var dt = new Date(item.value*1000);
                        dt = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
                        items.push({name:formatMessage({id:item.name}), value: dt });
                    }
                    if(item.name == "currentCountry" || item.name == "timeZone"){
                        items.push({name:formatMessage({id:item.name}), value: getLabelByValue(item.value,opts_item_map[item.name]) });
                    }
                    else if(item.name=="gender"){
                        items.push({
                            name:formatMessage({id:'gender'}),
                            value: formatMessage({id:getGender(item.value)})
                        });
                    }
                    else
                        items.push({name:formatMessage({id:item.name}), value: item.value});
                }
                else{
                    var val = "-";
                    if(item.value.text != undefined){
                        val = item.value.text;
                    }
                    else if(item.value.values != undefined){
                        var vals = [];
                        item.value.values.forEach(function(u){
                            vals.push(u.text);
                        });
                        val = vals.join(",");
                    }
                    items.push({name:item.value.label, value: val});
                }
            }.bind(this))
        }.bind(this));

        var itemHtml = items.map(function(i){
            return(
                <ul className="mymatch-detail_view-item" key={i.name}><li className="mymatch-detail_view-item_label">{i.name}</li><li>{i.value}</li></ul>
            )
        }.bind(this));
        return(
                <div className="mymatch-detail_view-items">
                  <div className="mymatch-detail_view-items_title-wrapper">
                    <span className="mymatch-detail_view-title">
                        <a href="javascript:void(0)" className="mymatch-detail_view-title_link" onClick={this.onEdit}>
                            <span className="mymatch-detail_view-title_img">
                                <svg width="33px" height="33px" >
                                    <g id="change-profile-photo-icon">
                                        <circle id="Oval-31" opacity="0.75" fill="#FFF" filter="url(#filter-1)" cx="16.5" cy="16.5" r="16.5" stroke="#D7d7d7"></circle>
                                        <path d="M20.9970874,15.5593325 L13.4550364,23.1012743 L9,23.9235073 L9.89872573,19.5449636 L17.4407767,12.002949 L20.9970874,15.5593325 L20.9970874,15.5593325 Z M22.0826578,14.4737257 L24,12.5563835 L20.4436165,9 L18.5262743,10.9173786 L22.0826578,14.4737257 L22.0826578,14.4737257 Z" id="edit-/-mobile" fill="#000000"></path>
                                    </g>
                                </svg>
                            </span>
                            {formatMessage({id:'edit_details'})}
                        </a>
                    </span>
                  </div>
                    {itemHtml}
                </div>
        )
    }
});

DetailView = injectIntl(DetailView);

var DetailItems = React.createClass({
    getInitialState:function(){
        return {
        }
    },
    getDefaultProps :function(){
        return {
            birthday: ""
        }
    },
    onSelectChange:function(name,old_val,value,label){
        this.props.onModifiedItem(this.props.iterms.name,name,old_val,value,[], label,[], 1,false);
    },
    onChbChange:function(cur_vals,sel_vals,name,text,item_name,value,checked){
        this.props.onModifiedItem(this.props.iterms.name,name,sel_vals,value,cur_vals,item_name, text ,2,checked);
    },
    onTxtChange: function (name,old_val,label, e) {
        this.props.onModifiedItem(this.props.iterms.name,name,old_val,e.target.value,[],label,[],3,false);
    },
    onFocus:function(e){
        e.target.focus();
    },
    onBirthChange: function(name,old_val,type,value,label){
        this.props.onModifiedItem(this.props.iterms.name,name,old_val,value,[],type,[],4,false);
    },
    layoutItem:function(detail_item){
        const {formatMessage} = this.props.intl;
        var label = detail_item.details.label;
        if(label == "name" || label == "birthday" ||label == "gender"){
            label = formatMessage({id:detail_item.details.label});
        }
        switch(layout_item_map[detail_item.details.type])
        {
            case "text":
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}} key={detail_item.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label}</li><li className={"mymatch-detail_edit-item_value " + "mymatch-detail_edit-item_value--" + detail_item.details.name}>
                        <input defaultValue={detail_item.details.value} type="text" onClick={this.onFocus} className={"mymatch-detail_edit-item_input detail-view_input " + "mymatch-detail_edit-item_input--" + detail_item.details.name} onChange={this.onTxtChange.bind(null,detail_item.details.name,detail_item.details.old_val,detail_item.details.label)} /></li>
                    </ul>
                );
                break;
            case "checkbox":
                var subItems = detail_item.opts;
                var h = subItems.map(function(sub_i){
                    var checked = false;
                    if($.inArray(sub_i.value.toString(), detail_item.details.value)>-1)
                        checked = true;
                    return(
                        //<span className="subItems" key={detail_item.details.name + sub_i.value}>
                            //<CheckBox value={sub_i.value} name={sub_i.label} checked={checked} onChange={this.onChbChange.bind(null,detail_item.details.value,detail_item.details.old_val,detail_item.details.name,detail_item.details.text)}/>{sub_i.label}
                            <div className="mydetail-checkbox-wrapper">
                              <RBCheckBox checkboxId={detail_item.details.label + "-" + sub_i.label} checkboxLabel={sub_i.label} value={sub_i.value} name={sub_i.label} checked={checked} onChange={this.onChbChange.bind(null,detail_item.details.value,detail_item.details.old_val,detail_item.details.name,detail_item.details.text)}/>
                            </div>
                        //</span>)
                      )
                }.bind(this));
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}}  key={detail_item.details.name}>
                        <li className="mymatch-detail_edit-item_name">{detail_item.details.label}</li>
                        <li className={ "mymatch-detail_edit-item_value mymatch-detail_edit-item_value--" + detail_item.details.label}>{h}</li>
                    </ul>
                );break;
            case "select":
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}}  key={detail_item.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label}</li>
                        <li className={"mymatch-detail_edit-item_value " + "mymatch-detail_edit-item_value--" + detail_item.details.name}>
                        <SelectWrap onChange={this.onSelectChange.bind(null,detail_item.details.name,detail_item.details.old_val)} value={detail_item.details.value.toString()} options={detail_item.opts} /></li>
                    </ul>
                );break;
            case  "multi-sel":
                var birth = new Date(detail_item.details.value*1000);
                return (
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}} key={detail_item.details.name}>
                        <li className="mymatch-detail_edit-item_name">{label}</li>
                        <li className="mymatch-detail_edit-item_birth">
                            <SelectWrap onChange={this.onBirthChange.bind(null,detail_item.details.name,birth,"y")} value={birth.getFullYear()} options={year_opts} key="detail-y"/>
                            <SelectWrap onChange={this.onBirthChange.bind(null,detail_item.details.name,birth,"m")} value={birth.getMonth()+1} options={month_opts} key="detail-m" />
                            <SelectWrap onChange={this.onBirthChange.bind(null,detail_item.details.name,birth,"d")} value={birth.getDate()} options={day_opts} key="detail-d" />
                        </li>
                    </ul>
                );
                break;
            default:
                    return (
                        ""
                    );
        }
    },
    toggleItemClass:function(section){
        this.props.switchSection(section);
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
    render: function() {
        const {formatMessage} = this.props.intl;
        var cls = this.props.iterms.name ==this.props.activeSection ? "class-expand": "class-expand active";
        var nav_cls = this.props.iterms.name ==this.props.activeSection ? "detail-nav active": "detail-nav";
        var items = this.detailObjToArray(this.props.iterms.value);
        var subhtml = items.map(function(sub_i){
            return(
                this.layoutItem(sub_i)
            )
        }.bind(this));
        return (
            <div>
                <ul className="mymatch-detail_class-item" key={this.props.iterms.name} onClick={this.toggleItemClass.bind(null,this.props.iterms.name)}>{formatMessage({id:this.props.iterms.name})}<div className={"mymatch-detail_" + nav_cls}><span className={"mymatch-detail_" +cls}></span></div></ul>
                  { subhtml  }
            </div>
        )
    }
});
DetailItems = injectIntl(DetailItems);

var DetailEdit = React.createClass({
    getInitialState:function(){
        return {
            activeSection: "general"
        }
    },
    onCancel:function() {
        this.props.onCancel();
    },
    onSave:function() {
        this.props.onSave();
    },
    addDetailItems:function(parent,name,old_val,value,vals,cur_text,txt,type,is_checked){
      this.props.onModifiedItem(parent,name,old_val,value,vals,cur_text,txt,type,is_checked);
    },
    layoutItemClass:function(){
        var classItem = objToArray(this.props.detailItems);
        var itemHtml = classItem.map(function(i,index){
            return(
                i.name == "location" ? <Location iterms={i} index={index} changedList={this.props.changedList} onModifiedItem={this.addDetailItems} activeSection={this.state.activeSection} switchSection={this.switchSection} /> :
                <DetailItems iterms={i} index={index} changedList={this.props.changedList} onModifiedItem={this.addDetailItems}  activeSection={this.state.activeSection} switchSection={this.switchSection} />
            )
        }.bind(this));
        return(
            <div className="mymatch-detail_view-items">{itemHtml}</div>
        )
    },
    switchSection:function(section){
        var currentSection = this.state.activeSection == section ? "" : section;
        this.setState({
            activeSection:currentSection
        })
    },
    render: function() {
        var items = [];
        const {formatMessage} = this.props.intl;
        for(var item in this.props.detailItems) {
            items.push({name: item, value: this.props.detailItems[item]});
        }
        var itemHtml = this.layoutItemClass();
        return(
            <div className="mymatch-detail_detail-view">
              <div className="mymatch-detail_mb-edit-cancel">
                <span className="mymatch-detail_view-title">
                  <span className="mymatch-detail_view-title_img">
                        <svg width="33px" height="33px" >
                            <g id="change-profile-photo-icon">
                                <circle id="Oval-31" opacity="0.75" fill="#FFF" filter="url(#filter-1)" cx="16.5" cy="16.5" r="16.5" stroke="#D7d7d7"></circle>
                                <path d="M20.9970874,15.5593325 L13.4550364,23.1012743 L9,23.9235073 L9.89872573,19.5449636 L17.4407767,12.002949 L20.9970874,15.5593325 L20.9970874,15.5593325 Z M22.0826578,14.4737257 L24,12.5563835 L20.4436165,9 L18.5262743,10.9173786 L22.0826578,14.4737257 L22.0826578,14.4737257 Z" id="edit-/-mobile" fill="#000000"></path>
                            </g>
                        </svg>
                    </span>
                    <span className="mymatch-detail_view-title_text">{formatMessage({id:"details"}) }</span>
                  </span><span className="mymatch-detail_mb-edit-cancel_text" onClick={this.onCancel}>{formatMessage({id:"cancel"}) }</span>
                </div>
                    {itemHtml}

                <ul className="mymatch-detail_edit-btns">
                    <span className="mymatch-detail_bn-cancel" onClick={this.onCancel}>{formatMessage({id:"cancel"}) }</span><span className="mymatch-detail_bn-save mymatch-detail_mb-save" onClick={this.onSave}>{formatMessage({id:"save"}) }</span>
                </ul>
            </div>
        )
    }

});
DetailEdit = injectIntl(DetailEdit);

var Detail = React.createClass({
    getInitialState:function(){
        return {
            editMode:false,
            changedList:[]
        }
    },
    componentDidMount:function(){
        const {query} = this.props.location;
        if(query && query.edit && query.edit=='true'){
            this.setState({editMode:true});
        }
    },
    onEdit:function() {
        this.setState({
            editMode:true
        })

    },
    onSave:function() {
        var params = [];
        this.state.changedList.map(function(item){
            //remove no changes
            if(item.type == 2){
                if(item.vals.sort().toString() != item.oldValue.sort().toString()){
                    var opts = this.props.detail[item.parent][item.name];
                    var seled = [];
                    for(var i=0;i<item.vals.length;i++){
                        seled.push({value:item.vals[i],text:item.texts[i]});
                        params.push(mapDetailParams[item.name] + "[]="+ item.vals[i]);
                    }
                    //params.push(mapDetailParams[item.name] + "=[" + item.vals + "]");

                    this.props.detail[item.parent][item.name].values = seled;
                }
            }
            else if(item.type == 4){
                //var birth = item.oldValue.getFullYear() + "-" + (item.oldValue.getMonth() + 1) + "-" + item.oldValue.getDate();
                if(item.oldValue != item.value){
                    params.push(mapDetailParams[item.name] + "=" + item.value);
                    this.props.detail[item.parent][item.name] = Date.parse(new Date(item.value))/1000;
                }
            }
            else{
                if(item.value != item.oldValue) {
                    params.push(mapDetailParams[item.name] + "=" + item.value);
                    if(item.name == "height"){
                        this.props.detail[item.parent][item.name].value = item.value;
                        this.props.detail[item.parent][item.name].text = item.value + "cm";
                    }
                    else if(item.parent =="general" || item.parent =="location" ) {
                        this.props.detail[item.parent][item.name] = item.value;
                    }
                    else{
                        this.props.detail[item.parent][item.name].value = item.value;
                        this.props.detail[item.parent][item.name].text = item.text;
                    }
                }
            }
        }.bind(this));
        var strParams = params.join('&');
        //var params = "user[profile_details][religion] = 4";
        console.log(strParams);
        RBService.updateMe(strParams).then(function(response){
            //this.props.detail[general][name] = "www123";
            this.setState({
                changedList: [],
                editMode:false
            });
            this.props.saveDetail(this.props.detail);
        }.bind(this))
        .catch(function(response){
            console.log("updateMe error:",response);
        });
    },
    onCancel:function() {
        this.setState({
            editMode:false
        })
    },
    addDetailItems:function(parent,name,old_val,value,vals,cur_text,txts,type,is_checked){
        var list = this.state.changedList;
        var index = -1;
        list.map(function (key ,i) {
            if(name == key.name)
            {
                index = i;
                if(type==2){
                    if(is_checked) {
                        if($.inArray(value.toString(), key.vals)<0){
                            key.vals.push(value.toString());
                            key.texts.push(cur_text);
                        }
                    }
                    else{
                        var ind = $.inArray(value.toString(), key.vals);
                        if(ind>=0){
                            key.vals.splice(index, 1);
                            key.texts.splice(index, 1);
                        }
                    }
                }
                else if(type==4){
                    var d = new Date(key.value);
                    if(cur_text =="y"){
                        d.setFullYear(value);
                    }
                    else if(cur_text =="m"){
                        d.setMonth(value-1);
                    }
                    else if(cur_text =="d"){
                        d.setDate(value);
                    }
                    key.value = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
                }
                else{
                    key.value=value;
                    key.text = cur_text;
                }
            }
        });
        if (index == -1) {
            if(type==2){
                if(is_checked) {
                    txts.push(cur_text);
                    vals.push(value.toString());
                }else{
                    var ind = $.inArray(value.toString(), vals);
                    if(ind>=0){
                        vals.splice(index, 1);
                        txts.splice(index, 1);
                    }
                }
                list.push({name:name,value:value,oldValue:old_val,parent:parent,type:type,text:cur_text,texts:txts,vals:vals});
            }
            else if(type==4){
                var d = old_val;
                var oldDate = old_val.getFullYear() + "-" + (old_val.getMonth()+1) + "-" + old_val.getDate();
                if(cur_text =="y"){
                    d.setFullYear(value);
                }
                else if(cur_text =="m"){
                    d.setMonth(value-1);
                }
                else if(cur_text =="d"){
                    d.setDate(value);
                }
                value = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
                list.push({name:name,value:value,oldValue:oldDate,parent:parent,type:type,text:cur_text,texts:txts,vals:vals});
            }
            else{
                list.push({name:name,value:value,oldValue:old_val,parent:parent,type:type,text:cur_text,texts:txts,vals:vals});
            }
        }
        this.setState({
            changedList:list
        })
    },
    render: function() {
        var showItems = this.props.detail;

        var editItems = this.props.detail;  // { General:{"Name": "Laura Medina", "Birthday":"1/01/95", "Gender": "Female","Height":""},location:{ "Current country": "France","Zip code":"","Time zone":""},Details:{ "Body type": ['Slender','Athletic','Average','A little heavy'],"Marital status":[""],"Have children":[""],"Birthplace":[""],"Ethnicity":""},
                         //"Background":{"Education":[""],"Occupation":[""],"Income":[""],"Immigration":"","First arrived":[""]},"Qualities":{"Faith":[""],"Smoke":[""],"Drink":[""],"Languages":["Madarin","Cantonese","English","Other"],"Interests":['Aerobics','Basketball','Bowling','Camping','Card games','Cycling','Dancing']}};
        return(
            <div className="rb-myprofile-detail mymatch-detail">
                {
                    this.state.editMode ? <DetailEdit detailItems={editItems} onSave={this.onSave} onCancel={this.onCancel} changedList={this.state.changedList} onModifiedItem={this.addDetailItems}/> :
                        <DetailView detailItems={showItems} onEdit={this.onEdit} changedList={this.state.changedList} />
                }
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        detail:state.me.detail
    }
}

Detail = connect(mapStateToProps,{saveDetail})(Detail);


export default injectIntl(Detail);
