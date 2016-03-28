var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage,FormattedHTMLMessage} from 'react-intl';
import CardInfo from "./CardInfo.js";
import PaidInfo from "./PaidInfo.js";
import PlanInfo from "./PlanInfo.js";
var RBService = require('../../services/RBService');

var MBPurchase = React.createClass({
    getInitialState:function(){
        return {
            show:false,
            isPaySus:false,
            stripeError:'',
            isAutoRenew:true,
            cardNo:'4444444444444444',
            cvv:'',
            expirationDate:'',
            VIPExpiration:'',
            purchaseStep:1
        }
    },
    onContinue:function(){
        var cardExp = this.state.expirationDate;
        var expVals = cardExp.split('/');
        Stripe.card.createToken({
            number: this.state.cardNo,
            cvc: this.state.cvv.value,
            exp_month: expVals[0],
            exp_year: expVals[1]
        }, this.stripeResponseHandler.bind(null,2));
    },
    purchaseVIP:function(stripe_card_token){
        var params = [];
        params.push('subscription[plan_id]='+this.props.selectedPlan.id);
        params.push('subscription[stripe_card_token]=' + stripe_card_token);
        var param = params.join('&');
        RBService.purchaseVIP(param).then(function (response) {
            var dt=new Date();
            dt.setMonth(dt.getMonth() + 1);
            if(response.data.success){
                this.setState({isPaySus:true,
                    stripeError:'',
                    VIPExpiration:dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate(),
                    purchaseStep:3
                })
            }
            else{
                this.setState({
                    stripeError:'purchase_failed'
                })
            }

        }.bind(this))
            .catch(function (response) {
                this.setState({
                    stripeError:'purchase_failed'
                })
                console.log("getVIPPlans error:", response);
            });
    },
    purchaseDiamonds:function(stripe_card_token){
        var params = [];
        params.push('product_offer_id='+this.props.selectedPlan.id);
        params.push('stripe_card_token=' + stripe_card_token);
        var param = params.join('&');
        RBService.purchaseDiamonds(param).then(function (response) {
            if(response.data.status.succeed == 1){
                this.setState({isPaySus:true,
                    stripeError:'',
                    purchaseStep:3
                })
            }
            else{
                this.setState({
                    stripeError:'purchase_failed'
                })
            }
        }.bind(this))
            .catch(function (response) {
                this.setState({
                    stripeError:'purchase_failed'
                })
                console.log("purchaseDiamonds error:", response);
            });
    },
    stripeResponseHandler:function(step,status, response){
        if (response.error) {
            if(response.error.type == "card_error" && response.error.code.length >0)
                this.setState({stripeError:response.error.code});
            else
                this.setState({stripeError:'network_error'});
            $("#error-icon").css('display','');
        } else {
            if(step ==2){
                this.setState({purchaseStep:2});
                return;
            }
            $("#error-icon").css('display','none');
            var ok_token = response.id;
            if(this.props.buyType == "VIP"){
                this.purchaseVIP(ok_token);
            }
            else if(this.props.buyType == "diamonds"){
                this.purchaseDiamonds(ok_token);
            }
        }
    },
    onPurchase:function(){
        if(this.state.cardNo.length ==0){
            return;
        }
        var cardExp = this.state.expirationDate;
        var expVals = cardExp.split('/');
        Stripe.card.createToken({
            number: this.state.cardNo,
            cvc: this.state.cvv.value,
            exp_month: expVals[0],
            exp_year: expVals[1]
        }, this.stripeResponseHandler.bind(null,3));

    },
    setAutoRenew:function(){
        this.setState({isAutoRenew:!this.state.isAutoRenew});
    },
    componentDidMount:function(){
        var setPublishableKey = "pk_8vf72KaNfNsWkyBZOkReU3XxT3Vrv";//pk_LU1jQfjmT3e3X18bAMydHpuKlOT2p  test:pk_test_6pRNASCoBOKtIshFeQd4XMUh
        Stripe.setPublishableKey(setPublishableKey);
    },
    setCardInfo:function(type,txt){
        if(type=='cvv')
            this.setState({cvv:txt});
        else if(type=='cardNo')
            this.setState({cardNo:txt});
        else if(type=='cardExpiration')
            this.setState({expirationDate:txt});
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        return(
            <div>
                { this.state.purchaseStep == 1 &&
                <div>
                    <CardInfo buyType={this.props.buyType} isPaySus={this.state.isPaySus} onSetCardInfo={this.setCardInfo}
                        onSetAutoRenew={this.setAutoRenew} isAutoRenew={this.state.isAutoRenew}
                        stripeError={this.state.stripeError}/>
                      <div className="plan-info_bottom-button">
                        <div className="purchase_continue-button" onClick={this.onContinue}>{formatMessage({id:"continue" })}
                            <span className="lock"><svg width="13px" height="17px" viewBox="0 0 13 17" version="1.1" xmlns="http://www.w3.org/2000/svg" >
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
                        </svg></span>
                        </div>
                        <div className="other_pay" style={{display:!this.props.isPaySus ? "": "none"}}>{formatMessage({id:"pay_with" })} <a href={this.state.paypalUrl} target='_blank'>PayPal</a> {formatMessage({id:"downcase_or" })} <FormattedHTMLMessage id="by_check" /></div>
                    </div>
                </div>
                }
                { this.state.purchaseStep == 2 &&
                    <PlanInfo selectedPlan={this.props.selectedPlan} buyType={this.props.buyType}
                      isPaySus={this.state.isPaySus} onPurchase={this.onPurchase}
                      isAutoRenew={this.state.isAutoRenew}/>
                }
                { this.state.purchaseStep == 3 &&
                    <PaidInfo VIPExpiration={this.state.VIPExpiration} isPaySus={this.state.isPaySus} buyType={this.props.buyType}/>
                }
            </div>
        )
    }
});

export default MBPurchase;
