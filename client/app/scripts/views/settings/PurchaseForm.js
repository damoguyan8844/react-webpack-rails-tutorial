var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage,FormattedHTMLMessage} from 'react-intl';
import Modal from 'react-bootstrap/lib/Modal';
import RBService from '../../services/RBService';
import CardInfo from "./CardInfo.js";
import PaidInfo from "./PaidInfo.js";
import PlanInfo from "./PlanInfo.js";

var PurchaseForm = React.createClass({
    getInitialState:function(){
        return {
            show:false,
            isPaySus:false,
            stripeError:'',
            isAutoRenew:true,
            cardNo:'4444444444444444',
            cvv:'',
            expirationDate:'',
            VIPExpiration:''
        }
    },
    show:function(){
        this.setState({show:true});
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
                    VIPExpiration:dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate()
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
                    stripeError:''
                })
                this.props.onUpdateDiamond(this.props.selectedPlan.reward_points_count);
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
    stripeResponseHandler:function(status, response){
        if (response.error) {
            if(response.error.type == "card_error" && response.error.code.length >0)
                this.setState({stripeError:response.error.code});
            else
                this.setState({stripeError:'network_error'});
            $("#error-icon").css('display','');
        } else {
            this.setState({
                stripeError:''
            })
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
        }, this.stripeResponseHandler);

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
        let close = () => this.setState({ show: false});
        return (
            <Modal dialogClassName="rb-vip-purchase vip-purchase animated fadeIn" animation={false} show={this.state.show} onHide={close} container={this} >
                <Modal.Body>
                    <div className="vip-purchase_form">
                        <div className="vip-purchase_close close icon-button-close" onClick={close}></div>
                        <CardInfo buyType={this.props.buyType} isPaySus={this.state.isPaySus} onSetCardInfo={this.setCardInfo} onSetAutoRenew={this.setAutoRenew} isAutoRenew={this.state.isAutoRenew} stripeError={this.state.stripeError} />
                        <PaidInfo VIPExpiration={this.state.VIPExpiration} isPaySus={this.state.isPaySus} buyType={this.props.buyType} />
                        <div className="vip-purchase_divider"></div>
                        <PlanInfo selectedPlan={this.props.selectedPlan} buyType={this.props.buyType} isPaySus={this.state.isPaySus} onPurchase={this.onPurchase} isAutoRenew={this.state.isAutoRenew} />
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

})


export default PurchaseForm;
