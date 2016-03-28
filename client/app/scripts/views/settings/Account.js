var React = require('react');
var ReactDOM = require('react-dom');
var RBService = require('../../services/RBService');
import {connect} from 'react-redux';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import RBNotify from '../../common/notification/RBNotify';

var Account = React.createClass({
    getInitialState:function(){
        return {
            email:'',
            changedPwdError:'',
            changedEmailError:''
        }
    },
    updateEmail: function(){
        const {formatMessage} = this.props.intl;
        var t_email = this.refs.email.value.trim();
        this.setState({
            changedEmailError:''
        });
        RBService.updateMeWithSSL("user[email]="+ t_email).then(function(response){
            var items = response.data;  //JSON.stringify
            this.props.overview.email = t_email;
            RBNotify.notify('simple',{title:formatMessage({id:'update_success_msg'})});
        }.bind(this))
        .catch(function(response){
            this.setState({
                changedEmailError: formatMessage({id:'update_error_msg'})
            });
            //console.log("updateMe error:",response);
        }.bind(this));

    },
    updatePassword: function () {
        const {formatMessage} = this.props.intl;
        var oldPwd = this.refs.oldPwd.value.trim();
        var newPwd = this.refs.newPwd.value.trim();
        var confirmPwd = this.refs.confirmPwd.value.trim();
        this.setState({
            changedPwdError: ''
        });
        if(newPwd != confirmPwd){
            this.setState({
                changedPwdError: formatMessage({id:'no_match_pwd'})
            });
            return;
        }

        RBService.updateMeWithSSL("user[password]="+ newPwd).then(function(response){
            RBNotify.notify('simple',{title:formatMessage({id:'update_success_msg'})});
        }.bind(this))
            .catch(function(response){
                const errMsg = response.data.message;
                if(errMsg !== ""){
                    this.setState({
                        changedPwdError: formatMessage({id:'update_error_msg'})
                    })
                }else{
                    this.setState({
                        changedPwdError: formatMessage({id:'update_error_msg'})
                    })
                }
                console.log("updateMe error:",response);
            }.bind(this));

    },
    disableAccount: function(){
        const {formatMessage} = this.props.intl;

        RBService.disableAccount().then(function(response){
            var items = response.data;  //JSON.stringify

            RBNotify.notify('simple',{title:'Disable Successfully!'});
            var url = `/${this.props.overview.locale}/app/signup`;
            console.log(url);
        }.bind(this))
            .catch(function(response){
                RBNotify.notify('simple',{title:formatMessage({id:'disable_error_msg'})});
                console.log("updateMe error:",response);
            });
    },
    deleteAccount: function(){
        const {formatMessage} = this.props.intl;
        RBService.deleteAccount().then(function(response){
        var items = response.data;  //JSON.stringify
        RBNotify.notify('simple',{title:'Delete Successfully!'});
        var url = `/${this.props.overview.locale}/app/signup`;
        var e = "window.location.href = url;";
            eval(e);
        console.log(url);
    }.bind(this))
        .catch(function(response){
            RBNotify.notify('simple',{title:formatMessage({id:'delete_error_msg'})});
            console.log("updateMe error:",response);
        });
    },
    getVIP:function(){
        this.props.changeMenu('vip_status');
    },
    componentDidMount:function() {
        this.setState({email:this.props.overview.email})
    },
    changeEmail:function(e){
        this.setState({email:e.target.value})
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        return (
            <div className="account">
                {!this.props.overview.isVIP &&
                    <ul>
                        <li className="account_label">{formatMessage({id:"you_not_vip" })}</li>
                        <li>
                            <div className="account_content-group">
                                <span className="account_sub-label">{formatMessage({id:"not_vip_tip" })}</span>
                                <span className="account_getVIP-button account_button" onClick={this.getVIP}>{formatMessage({id:"what_i_get_vip" })}</span>

                            </div>
                        </li>
                    </ul>
                }
                {!this.props.overview.isVIP &&
                    <ul className="account_divider"></ul>
                }
                <ul>
                    <li className="rb-settings_label">{formatMessage({id:"update_email" })}</li>
                    <li>
                        <div className="account_content-group">
                            <span className="account_input-wrapper">
                              <input className="account_input" type="text" ref="email" value={this.state.email} onChange={this.changeEmail} placeholder={formatMessage({id:"update_email_placeholder" })} />
                              <span className="error_warning" style={{ display: this.state.changedEmailError ? "block" : "none" }}>{this.state.changedEmailError}</span>
                            </span>
                            <span className="account_update-button account_button" onClick={this.updateEmail}>{formatMessage({id:"update" })}</span>
                        </div>
                    </li>
                </ul>
                <ul className="account_divider"></ul>
                <ul>
                    <li className="rb-settings_label">{formatMessage({id:"reset_password" })}</li>
                    <li className="account_sub-label">{formatMessage({id:"current_password" })}</li>
                    <li className="account_input-wrapper"><input className="account_input" type="password" ref="oldPwd" placeholder={formatMessage({id:"enter_old_password" })} />{this.state.changedPwdError}</li>
                    <li className="account_sub-label">{formatMessage({id:"new_password" })}</li>
                    <li className="account_input-wrapper">
                      <input className="account_input" type="password" ref="newPwd" placeholder={formatMessage({id:"enter_new_password" })} />
                      <span className="error_warning" style={{ display: this.state.changedPwdError ? "block" : "none" }}>{this.state.changedPwdError}</span></li>
                    <li className="account_sub-label">{formatMessage({id:"confirm_new_password" })}</li>
                    <li>
                        <div className="account_content-group">
                            <span className="account_input-wrapper"><input className="account_input" type="password" ref="confirmPwd" placeholder={formatMessage({id:"confirm_new_password" })}/></span>
                            <span className="account_update-button account_button" onClick={this.updatePassword}>{formatMessage({id:"save_password" })}</span>
                        </div>
                    </li>
                </ul>
                <ul className="account_divider"></ul>
                <ul>
                    <li className="rb-settings_label">{formatMessage({id:"disable_account" })}</li>
                    <li>
                        <div className="account_content-group">
                            <span className="account_sub-label">{formatMessage({id:"disable_account_tip" })}</span>
                            <span className="account_disabled-button account_button" onClick={this.disableAccount}>{formatMessage({id:"disable_account" })}</span>
                        </div>
                    </li>
                </ul>
                <ul className="account_divider"></ul>
                <ul>
                    <li className="rb-settings_label" style={{color:"rgba(255, 0, 0, 0.9)"}}>{formatMessage({id:"delete_account" })}</li>
                    <li>
                        <div className="account_content-group">
                            <span className="account_sub-label ">
                                {formatMessage({id:"delete_account_tip" })}
                            </span>
                            <span className="account_delete-button account_button" onClick={this.deleteAccount}>{formatMessage({id:"delete_account" })}</span>
                        </div>
                    </li>
                </ul>

            </div>
        )
    }

});
function mapStateToProps(state){
    return {
        overview:state.me.overview
    }
}

Account = connect(mapStateToProps)(Account)
export default Account;
