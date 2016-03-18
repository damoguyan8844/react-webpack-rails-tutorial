var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import CheckBox from "../../common/CheckBox.js";
import RBCheckBox from "../../common/RBCheckBox.js";
import RBNotify from '../../common/notification/RBNotify.js';
var RBService = require('../../services/RBService');

var map_notification_items={
    wink:"em_wink",
    add_friend:"em_friend",
    admires:"em_admire",
    receive:"em_msg ",
    tag_photo:"em_photo_tag",
    have_viewer:"em_visitor",
    recommendation:"em_rec",
    redbeans_event:"em_newsletter"

};
var Notifications = React.createClass({
    getDefaultProps :function(){
        return {

        }
    },
    getInitialState:function(){
        return {
            checked_notification: [],
            wink:false,
            add_friend:false,
            admires:false,
            receive:false,
            tag_photo:false,
            have_viewer:false,
            recommendation:false,
            redbeans_event:false,
            notificationList:[]

        }
    },
    changeNotificationItem: function(oldVal,notification,value,checked){
        console.log(notification);
        var checked_list = this.state.checked_notification;
        var index = -1;
        for(var i = 0;i<checked_list.length;i++){
            if(checked_list[i].name == notification){
                checked_list[i].value = checked;
                index = i;
                break;
            }
        }
        if(index == -1)
        {
            checked_list.push({name:notification,value:checked,oldValue:oldVal});
        }
        this.setState({
            checked_notification: checked_list
        })
    },
    componentDidMount:function(){
        RBService.getSettings().then(function(response){
            var res = response.data;  //JSON.stringify
            this.setState({
                 wink:res.setting.em_wink,
                add_friend: res.setting.em_friend,
                admires: res.setting.em_admire,
                receive: res.setting.em_msg,
                tag_photo: res.setting.em_photo_tag,
                have_viewer: res.setting.em_visitor,
                recommendation: res.setting.em_rec,
                redbeans_event: res.setting.em_newsletter,
                notificationList :['wink','add_friend','admires','receive','tag_photo','have_viewer','recommendation','redbeans_event']

            })
        }.bind(this))
            .catch(function(response){
                console.log("updateMe error:",response);
            });
    },
    updateSettings:function(){
        var params=[];
        this.state.checked_notification.map(function(nots){
            params.push("setting[" +map_notification_items[nots.name]+ "]="+nots.value)
        })
        console.log(params.join('&'))
        RBService.updateSettings(params.join('&')).then(function(response){
            RBNotify.notify('simple',{title:'Update Successfully!'});
        }.bind(this))
        .catch(function(response){
            console.log("updateSettings error:",response);
        });
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        var checked = false;
        var notificationHtml = this.state.notificationList.map(function(notification){
            if(notification== "wink")
                checked = this.state.wink
            else if(notification== "add_friend")
                checked = this.state.add_friend
            else if(notification== "admires")
                checked = this.state.admires
            else if(notification== "receive")
                checked = this.state.receive
            else if(notification== "tag_photo")
                checked = this.state.tag_photo
            else if(notification== "have_viewer")
                checked = this.state.have_viewer
            else if(notification== "recommendation")
                checked = this.state.recommendation
            else if(notification== "redbeans_event")
                checked = this.state.redbeans_event
            return (
                <li className="notifications_item" key={notification}>
                  <RBCheckBox checkboxId={"notification_" + notification} checkboxLabel={formatMessage({id:"notification." +notification}) } checked={checked} name={notification} value={notification} onChange={ this.changeNotificationItem.bind(this,checked) } />
                </li>

            )
        }.bind(this));
        return (
            <div className="notifications">
                <div>
                    <ul>
                        <li className="rb-settings_label rb-settings_label--notification">{formatMessage({id:"email_notifications"}) }</li>
                        <li className="notifications_sub-label">{formatMessage({id:"choose_to_notifications"}) }</li>
                        {notificationHtml}
                    </ul>
                </div>
                <div className="notifications_button" onClick={this.updateSettings}>Update</div>
            </div>
        )
    }

});

export default injectIntl(Notifications);
