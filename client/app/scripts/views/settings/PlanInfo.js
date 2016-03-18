var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage,FormattedHTMLMessage} from 'react-intl';
var RBService = require('../../services/RBService');

var PlanInfo = React.createClass({
    getInitialState:function(){
        return {
            paypalUrl:''
        }
    },
    onPurchase:function(){
      this.props.onPurchase();
    },
    componentDidMount:function() {
        if(this.props.buyType == "diamonds")
        {
            RBService.getDiamondPayPalUrl(this.props.selectedPlan.id).then(function (response) {
                var url = response.data.redirect_url;
                this.setState({paypalUrl:url});
            }.bind(this))
                .catch(function (response) {
                    console.log("getVIPPayPalUrl error:", response);
                });
        }
        else{
            RBService.getVIPPayPalUrl(this.props.selectedPlan.id).then(function (response) {
                var url = response.data.redirect_url;
                this.setState({paypalUrl:url});
            }.bind(this))
                .catch(function (response) {
                    console.log("getVIPPayPalUrl error:", response);
                });
        }
    },
    purchaseByPayPal:function(){

    },
    purchaseByCheck:function(){

    },
    getPaypalUrl:function(planId){

    },
    render:function(){
        const {formatMessage} = this.props.intl;
        return(
            <div className="plan-info">
                {
                    this.props.buyType == "VIP" &&
                    <div className="plan-info_item">{formatMessage({id:"selected_plan" })}:<p className="plan-info_text">{this.props.selectedPlan && formatMessage({id:this.props.selectedPlan.product_name})}</p></div>
                }
                {
                    this.props.buyType == "VIP" &&
                    <div className="plan-info_item">{formatMessage({id:"auto_renew" })}:<p className="plan-info_text">{this.props.isAutoRenew ? formatMessage({id:"yes" }) : formatMessage({id:"no" })}</p></div>
                }
                {
                    this.props.buyType == "VIP" &&
                    <div className="plan-info_auto-renew-warning">{formatMessage({id:"auto_renew_warning" })}</div>
                }
                {
                    this.props.buyType == "diamonds" &&
                    <div className="plan-info_item">{formatMessage({id:"diamonds_count" })}:<p className="plan-info_text">{this.props.selectedPlan && this.props.selectedPlan.reward_points_count}</p></div>
                }
                <div className="plan-info_item">{formatMessage({id:"promotion" })}:<p className="plan-info_text">{formatMessage({id:"no" })}</p></div>
                {
                    this.props.buyType == "diamonds" &&
                    <div className="plan-info_diamonds-space">&nbsp;</div>
                }
                <div className="plan-info_pay-total">{formatMessage({id:"payment_total" })}:<p className="plan-info_pay-total_text">${this.props.selectedPlan && this.props.selectedPlan.price}</p></div>
                <div className="plan-info_bottom-button">
                    <div className="plan-info_pay-button" style={{display:!this.props.isPaySus ? "": "none"}} onClick={this.onPurchase}>{formatMessage({id:"pay_now" })}<span className="lock"><svg width="13px" height="17px" viewBox="0 0 13 17" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="settings----vip-checkout" transform="translate(-806.000000, -485.000000)" fill="#FFFFFF">
                                <g id="checkout">
                                    <g id="Group" transform="translate(146.000000, 208.000000)">
                                        <g id="check-out-info" transform="translate(376.500000, 22.000000)">
                                            <g id="pay" transform="translate(0.000000, 238.000000)">
                                                <path d="M285.5135,24.1520898 L285.5135,21.5663568 C285.5135,19.0484587 287.526176,17 290,17 C292.473865,17 294.4865,19.0484587 294.4865,21.5663568 L294.4865,24.1520898 L292.459473,24.1520898 L292.459473,21.5663568 C292.459473,20.1860558 291.356162,19.0631068 290,19.0631068 C288.643838,19.0631068 287.540527,20.1860558 287.540527,21.5663568 L287.540527,24.1520898 L285.5135,24.1520898 L285.5135,24.1520898 Z M284,25.3899539 L284,34 L296,34 L296,25.3899539 L284,25.3899539 L284,25.3899539 Z" id="lock-icon"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg></span></div>
                </div>
                <div className="plan-info_success-button" style={{display:this.props.isPaySus ? "": "none"}}>{formatMessage({id:"success" })}</div>
                <div className="plan-info_other-pay" style={{display:!this.props.isPaySus ? "": "none"}}>{formatMessage({id:"pay_with" })} <a href={this.state.paypalUrl} target='_blank'>PayPal</a> {formatMessage({id:"downcase_or" })} <FormattedHTMLMessage id="by_check" /></div>
            </div>
        )
    }
});

export default injectIntl(PlanInfo);
