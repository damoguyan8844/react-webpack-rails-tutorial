var React = require('react');
var ReactDOM = require('react-dom');
import Select from 'react-select';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {gender,age_opts,gender_opts,country_opts,zodiac_opts,cons_opts,birthplace_opts,country_other_opts,
    faith_opts,height_opts,age_arrived_opts,sort_opts,adv_opts,states,cons_opt_vals,timeZone_opts} from "../../common/CommonItems.js";
import CheckBox from "../../common/CheckBox.js";
import RBCheckBox from "../../common/RBCheckBox.js";
import SelectWrap from './SelectWrap.js';
import RBNotify from '../../common/notification/RBNotify';
var RBService = require('../../services/RBService');

var layout_item_map = {
    "gender":"select",
    "ages":"MinMax",
    "height":"MinMax",
    "bodyType":"checkbox",
    "drinking":"checkbox",
    "smoking":"checkbox",
    "faith":"checkbox",
    "birthplace":"checkbox",
    "ethnicity":"checkbox",
    "languages":"checkbox",
    "immigration":"checkbox",
    "maritalStatus":"checkbox",
    "haveChildren":"checkbox",
    "occupation":"checkbox",
    "income":"checkbox"
};
//birthplace_opts
var opts_item_map = {
    "gender":gender_opts[RB.locale],
    "bodyType":cons_opts['body_type'],
    "maritalStatus":cons_opts['marital_status'],
    "haveChildren":cons_opts['have_children'],
    "birthplace":country_other_opts[RB.locale] ,
    "ethnicity":cons_opts['ethnicity'],
    "occupation":cons_opts['occupation'],
    "income":cons_opts['income'],
    "immigration":cons_opts['immigration'],
    "faith":cons_opts['religion'],
    "smoking":cons_opts['smoking'],
    "drinking":cons_opts['drinking'],
    "languages":cons_opts['languages'],
    ages:age_opts,
    height:height_opts[RB.locale]
};

var mapMatchParams = {
    "gender":"user[seeking]",
    "ages":"user[looking_for_details][age]",
    "height":"user[looking_for_details][height]",
    "bodyType":"user[looking_for_details][body_type]",
    "drinking":"user[looking_for_details][drinking]",
    "smoking":"user[looking_for_details][smoking]",
    "faith":"user[looking_for_details][religion]",
    "birthplace":"user[looking_for_details][birth_country]",
    "ethnicity":"user[looking_for_details][ethnicity]",
    "languages":"user[looking_for_details][languages]",
    "immigration":"user[looking_for_details][immigration]",
    "maritalStatus":"user[looking_for_details][marital_status]",
    "haveChildren":"user[looking_for_details][has_children]",
    "occupation":"user[looking_for_details][occupation]",
    "income":"user[looking_for_details][income]"
};

var MatchView = React.createClass({
    onEdit:function() {
        this.props.onEdit();
    },
    render: function() {
        const messages = defineMessages({
            gender: {
                id: 'gender',
                defaultMessage: 'Gender'
            },
            male: {
                id: 'male',
                defaultMessage: 'Male'
            },
            female: {
                id: 'female',
                defaultMessage: 'Female'
            }
        });
        const {formatMessage} = this.props.intl;
        var items = [];
         this.props.matchItems.map(function(i,index){
            var matchItems = objToArray(i.value);
             matchItems.map(function(item){
                if(item.name=="gender" ){
                    items.push({name:formatMessage(messages.gender), value: formatMessage(messages[getGender(parseInt(item.value))])});
                }
                else if(layout_item_map[item.name] == "MinMax"){
                    items.push({
                        name:item.value.label, value: item.value.text ? item.value.text : (item.value.top ? item.value.top : item.value.bottom ? item.value.bottom : "")
                    });
                }
                else if(item.value.importance != undefined){
                    items.push({name:item.value.label, value: item.value.importance.text});
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
                        {formatMessage({id:'edit_match'})}
                    </a>
                </span>
              </div>
                {itemHtml}
            </div>
        )
    }
});
MatchView = injectIntl(MatchView);

var ChbItem = React.createClass({
    getInitialState:function(){
        return {
            isNoPreference: this.props.mcItem.nop
        }
    },
    messages:defineMessages({
        b_gt_top:{id:'b_gt_top',defaultMessage:'Min value greater than max value'},
        no_preference:{id:'no_preference',defaultMessage:'No preference'}
    }),
    onChbChange:function(cur_vals,sel_vals,name,text,item_name,value,checked){
        this.props.onModifiedItem(this.props.iterms.name,name,sel_vals,value,cur_vals,item_name, text ,2,checked);
    },
    setNoPreference:function(cur_vals,sel_vals,name,text,item_name,value,checked){
        console.log("NoPreference:"+name + " " + item_name + " " + value)
        if(checked){
            // $("#" +name).find(":checkbox").removeAttr('checked');
            $("#" +name).find(":checkbox").attr('disabled', 'disabled');//
            this.setState({isNoPreference:true});
        }
        else{
            this.setState({isNoPreference:false});
            $("#" +name).find(":checkbox").removeAttr('disabled');
        }
        this.props.onModifiedItem(this.props.iterms.name,name,sel_vals,value,cur_vals,item_name,text,3,checked);
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var subItems = this.props.mcItem.opts;
        var h = subItems.map(function(sub_i){
                var checked = false;
                if($.inArray(sub_i.value.toString(), this.props.mcItem.value)>-1 && !this.state.isNoPreference)
                    checked = true;
                return(
                    <div className="mymatch-checkbox-wrapper">
                        <RBCheckBox checkboxId={this.props.mcItem.type + "-" + sub_i.value} checkboxLabel={sub_i.label} isNoPreference={this.state.isNoPreference} value={sub_i.value} name={sub_i.label} disabled={this.state.isNoPreference} checked={checked} onChange={this.onChbChange.bind(null,this.props.mcItem.value,this.props.mcItem.old_val,this.props.mcItem.type,this.props.mcItem.text)}/>
                    </div>
                )}.bind(this)
        );
        return(
            <div style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}} key={this.props.mcItem.type}>
                <ul className="mymatch-detail_match-edit-item " key={"ul"+this.props.mcItem.type}>
                    <li className="mymatch-detail_edit-item_name mymatch-detail_match-edit-item_name">{this.props.mcItem.name}</li>
                    <li className="mymatch-detail_match-edit-item--preference">
                        <div className="mymatch-detail_no-preference-wrapper">
                            <RBCheckBox checkboxId={this.props.mcItem.name + "-" + formatMessage(this.messages['no_preference'])} checkboxLabel={formatMessage(this.messages['no_preference'])} isBold={true} value="0" name={formatMessage(this.messages['no_preference'])} checked={this.props.mcItem.nop} onChange={this.setNoPreference.bind(null,this.props.mcItem.value,this.props.mcItem.old_val,this.props.mcItem.type,this.props.mcItem.text)} />
                        </div>
                    </li>
                </ul>
                <ul>
                    <li className="mymatch-detail_match-edit-item_values" id={this.props.mcItem.type}>{h}</li>
                    <li style={{clear:"both"}}></li>
                </ul>
            </div>
        )
    }
})
ChbItem = injectIntl(ChbItem);

var MatchItems = React.createClass({
    messages:defineMessages({
        b_gt_top:{id:'b_gt_top',defaultMessage:'Min value greater than max value'},
        no_preference:{id:'no_preference',defaultMessage:'No preference'}
    }),
    getInitialState:function(){
        return {
        }
    },
    onChbChange:function(cur_vals,sel_vals,name,text,item_name,value,checked){
        this.props.onModifiedItem(this.props.iterms.name,name,sel_vals,value,cur_vals,item_name, text ,2,checked);
    },
    setNoPreference:function(cur_vals,sel_vals,name,text,item_name,value,checked){
        console.log("NoPreference:"+name + " " + item_name + " " + value)
        if(checked){
           // $("#" +name).find(":checkbox").removeAttr('checked');
            $("#" +name).find(":checkbox").attr('disabled', 'disabled');//
        }
        else{
            $("#" +name).find(":checkbox").removeAttr('disabled');
        }
        this.props.onModifiedItem(this.props.iterms.name,name,sel_vals,value,cur_vals,item_name,text,3,checked);
    },
    onSelectChange:function(name,oldVal,value,label){
        this.props.onModifiedItem(this.props.iterms.name,name,oldVal,value,[], label,[], 1,false);
    },
    onMinMaxChange:function(bound,name,oldVal,vals,texts,value,label){
        const {formatMessage} = this.props.intl;
        vals[bound] = value;
        texts[bound] = label;
        if(vals.bottom && vals.top && vals.bottom > vals.top){
            RBNotify.notify('simple',{title:formatMessage(this.messages.b_gt_top)});
            return;
        }
        this.props.onModifiedItem(this.props.iterms.name,name,oldVal,value,vals, bound,texts, 4,false);
    },
    layoutItem:function(mcItem){
        const {formatMessage} = this.props.intl;
        var label = mcItem.name;
        if(label == "gender"){
            label = formatMessage({id:mcItem.name});
        }
        switch(layout_item_map[mcItem.type])
        {
            case "checkbox":
                return(
                    <ChbItem mcItem={mcItem} iterms={this.props.iterms} onModifiedItem={this.props.onModifiedItem} activeSection={this.props.activeSection} />
                )
                break;
            case "select":
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}} key={mcItem.type}>
                      <li className="mymatch-detail_edit-item_name">{label}</li>
                      <li className={"mymatch-detail_edit-item_value " + "mymatch-detail_edit-item_value--" + mcItem.value}>
                        <SelectWrap onChange={this.onSelectChange.bind(null,mcItem.type,mcItem.old_val)} value={mcItem.value.toString()} options={mcItem.opts} />
                      </li>
                    </ul>
                );break;
            case "MinMax":
                return(
                    <ul className="mymatch-detail_edit-item" style={{display:(this.props.iterms.name ==this.props.activeSection)?"":"none"}} key={mcItem.type}><li className="mymatch-detail_edit-item_name">{mcItem.name}</li>
                        <li className="mymatch-detail_min-max">
                            <span className="mymatch-detail_min-max_item">{formatMessage({id:"min"})}<SelectWrap value={mcItem.value.bottom}  options={mcItem.opts} onChange={this.onMinMaxChange.bind(null,"bottom",mcItem.type,mcItem.old_val,mcItem.value,mcItem.text)} /></span>
                            <span className="mymatch-detail_min-max_item">{formatMessage({id:"max"})}<SelectWrap value={mcItem.value.top} onChange={this.onMinMaxChange.bind(null,"top",mcItem.type,mcItem.old_val,mcItem.value,mcItem.text)} options={mcItem.opts} /></span>
                        </li>
                    </ul>
                );break;
            default:
               return( "" )
        }
    },
    matchObjToArray:function(obj){
        var items = [];
        for(var item in obj) {

            if(layout_item_map[item]=="select") {
                var noP = false;
                if(obj[item].importance != undefined)
                    noP = true;

                items.push({name: item, text: '', value: obj[item], type: item,nop:noP,opts:opts_item_map[item],old_val:obj[item]});
            }
            else if(layout_item_map[item]=="MinMax") {
                var noP = false;
                if(obj[item].importance != undefined)
                    noP = true;
                var vals = {bottom: obj[item].bottom == undefined ? "" : obj[item].bottom, top: obj[item].top==undefined? "" : obj[item].top};
                var old_vals = {bottom: obj[item].bottom == undefined ? "" : obj[item].bottom, top: obj[item].top==undefined? "" : obj[item].top};
                var txts = {bottom:obj[item].bottom == undefined ? "" : obj[item].bottom + "cm", top:obj[item].top==undefined? "" : obj[item].top + "cm"}
                if(obj[item].text != undefined)
                {
                    var arr = obj[item].text.split('-');
                    if(arr.length>0) txts.bottom = arr[0];
                    if(arr.length>1) txts.top = arr[1];
                }
                items.push({
                    name: obj[item].label,
                    text: txts,
                    value: vals,
                    type: item,
                    nop:noP,
                    opts:opts_item_map[item],
                    old_val:old_vals
                });
            }
            else if(layout_item_map[item]=="checkbox") {
                var vals = [], txts = [],old_vals=[0];
                var noP = false;
                if(obj[item].importance != undefined)
                    noP = true;
                if (obj[item].values !== undefined) {
                    obj[item].values.map(function (v) {
                        vals.push(v.value);
                        txts.push(v.text);
                    });
                }
                if(vals.length>0)
                    old_vals = vals.concat();
                items.push({name: obj[item].label, text: txts, value: vals, type: item,nop:noP,opts:opts_item_map[item],old_val:old_vals});

            }
        }
        return items;
    },
    toggleItemClass:function(section){
        this.props.switchSection(section);
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var cls = this.props.iterms.name ==this.props.activeSection ? "class-expand": "class-expand active";
        var nav_cls = this.props.iterms.name ==this.props.activeSection ? "detail-nav active": "detail-nav";
        var items = this.matchObjToArray(this.props.iterms.value);
        var subhtml = items.map(function(sub_i){
            return(
                this.layoutItem(sub_i)
            )

        }.bind(this));

        return (
            <div>
                <ul className="mymatch-detail_class-item" onClick={this.toggleItemClass.bind(null,this.props.iterms.name)}>{formatMessage({id:this.props.iterms.name})}<div className={"mymatch-detail_" + nav_cls}><span className={ "mymatch-detail_" +cls}></span></div></ul>
                { subhtml  }
            </div>
        )
    }
});
MatchItems = injectIntl(MatchItems);

var MatchEdit = React.createClass({
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
    onModifiedItem:function(parent,name,oldVals,value,vals,text,texts,type,is_checked){
        this.props.onModifiedItem(parent,name,oldVals,value,vals,text,texts,type,is_checked);
    },
    layoutItemClass:function(){
        var itemHtml = this.props.matchItems.map(function(i,index){
            return(
                <MatchItems iterms={i} index={index} onModifiedItem={this.onModifiedItem} activeSection={this.state.activeSection} switchSection={this.switchSection} />
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
        const {formatMessage} = this.props.intl;
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
                    <span className="mymatch-detail_view-title_text">{formatMessage({id:"match"})}</span>
                  </span><span className="mymatch-detail_mb-edit-cancel_text" onClick={this.onCancel}>{formatMessage({id:"cancel"}) }</span>
                </div>
                {itemHtml}
                <ul className="mymatch-detail_edit-btns">
                    <span className="mymatch-detail_bn-cancel" onClick={this.onCancel}>{formatMessage({id:"cancel"}) }</span><span className="mymatch-detail_bn-save mb-save" onClick={this.onSave}>{formatMessage({id:"save"}) }</span>
                </ul>
            </div>
        )
    }

});
MatchEdit = injectIntl(MatchEdit);

var Match = React.createClass({
    getInitialState:function(){
        return {
            editMode:false,
            changedList:[]
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
                if(item.vals.sort().toString() != item.oldValue.sort().toString() || item.value!="0"){
                    var opts = this.props.match[item.parent][item.name];
                    var seled = [];
                    for(var i=0;i<item.vals.length;i++){
                        seled.push({value:item.vals[i],text:item.texts[i]});
                        params.push(mapMatchParams[item.name] + "[values][]="+ item.vals[i]);
                    }
                    this.props.match[item.parent][item.name].values = seled;
                }
            }
            else if(item.type==3){
                this.props.match[item.parent][item.name].importance ={value: 0, text: item.text};
                params.push(mapMatchParams[item.name] + "[importance]=" + item.value);
            }
            else if(item.type==4){
                if(item.vals.bottom != item.oldValue.bottom || item.vals.top != item.oldValue.top) {
                    this.props.match[item.parent][item.name].bottom = item.vals.bottom;
                    this.props.match[item.parent][item.name].top = item.vals.top;
                    this.props.match[item.parent][item.name].text = item.texts.bottom == "" ? "" : item.texts.bottom + " - " + item.texts.top;
                    params.push(mapMatchParams[item.name] + "[bottom]=" + item.vals.bottom);
                    params.push(mapMatchParams[item.name] + "[top]=" + item.vals.top);
                }
            }
            else{
                if(item.value != item.oldValue) {
                    params.push(mapMatchParams[item.name] + "=" + item.value);
                   this.props.match[item.parent][item.name] = item.value;

                }
            }
        }.bind(this));
        var strParams = params.join('&');
        console.log(strParams);
        RBService.updateMe(strParams).then(function(response){
            this.setState({
                changedList: [],
                editMode:false
            });
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
    onModifiedItem:function(parent,name,old_val,value,vals,cur_text,texts,type,is_checked){
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
                    key.vals[cur_text] = vals[cur_text];
                    key.texts[cur_text] = texts[cur_text];
                }
                else{
                    if(type==3 ){
                        if(!is_checked)
                            key.type=2;
                    }
                    key.value=value;
                    key.text = cur_text;
                }

            }
        });
        if (index == -1) {
            if(type==2){
                if(is_checked) {
                    texts.push(cur_text);
                    vals.push(value.toString());
                }else{
                    var ind = $.inArray(value.toString(), vals);
                    if(ind>=0){
                        vals.splice(index, 1);
                        texts.splice(index, 1);
                    }
                }
                list.push({name:name,value:value,oldValue:old_val,parent:parent,type:type,text:cur_text,texts:texts,vals:vals});
            }
            else if(type==4){
                list.push({name:name,value:value,oldValue:old_val,parent:parent,type:type,text:cur_text,texts:texts,vals:vals});
            }
            else{
                if(type==3 && !is_checked){
                    type = 2;
                }
                list.push({name:name,value:value,oldValue:old_val,parent:parent,type:type,text:cur_text,texts:texts,vals:vals});
            }
        }
        this.setState({
            changedList:list
        })
    },
    componentDidMount:function(){
    },
    render:function(){
        //var showItems =this.props.match; //{ "Name": "Laura Medina", "Birthday":"1/01/95", "Gender": "Female", "Location": "Raissez-Fazai, Paris, France" };
        //var editItems = this.props.match; // { General:{"Gender": "Laura Medina", "Ages":"1/01/95", "Height": ""},
           // Personal:{"Body type": ['Slender','Athletic','Average','A little heavy'],"Drinking":"","Smoking":"","Faith":["Non-religious"]},
           // Background:{ "Birthplace": ['Slender','Athletic','Average','A little heavy'],"Ethnicity":[""],"Languages":[""],"Immigration":[""]},
           // "Status":{"Marital status":[""],"Have children":[""],"Occupation":[""],"Income":["<$50k","$50-$75"]}};
        var matchItems = objToArray(this.props.match);
        return (
            <div className="rb-myprofile-match mymatch-detail">
                {
                    this.state.editMode ? <MatchEdit matchItems={matchItems} onSave={this.onSave} changedList={this.state.changedList} onModifiedItem={this.onModifiedItem} onCancel={this.onCancel}/> :
                        <MatchView matchItems={matchItems} onEdit={this.onEdit}/>
                }
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        match:state.me.match
    }
}
Match = connect(mapStateToProps)(Match)

export default injectIntl(Match);
