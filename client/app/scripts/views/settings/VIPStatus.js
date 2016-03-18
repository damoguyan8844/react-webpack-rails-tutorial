var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var RBService = require('../../services/RBService');
var User = require('../../models/User');
import ImageResources from '../../utils/ImageResources';
import PurchaseForm from "./PurchaseForm.js";
import {injectIntl,defineMessages,FormattedMessage,FormattedHTMLMessage} from 'react-intl';
import MBPurchase from "./MBPurchase.js";

var VIPState = React.createClass({
    mixins: [IntlMixin],
    getInitialState:function(){
        return {
            planList: [
               // {name:'3 Months',price:'$99.99',price_per_mo:'$33.33 / mo'},
                //{name:'6 Months',price:'$119.99',price_per_mo:'$19.99 / mo'},
                //{name:'1 Year',price:'$199.99',price_per_mo:'$15.99 / mo'}
            ],
            selectedPlan:null,
            vipExpirationDate:''
        }
    },
    getDefaultProps :function(){
        return{
            buyType:'VIP',
            isMobile:false,
            isPurchase:false,
            planRights:[
                {
                    svg:'vip-01.png',
                    title:'vip_rights_desc.chat',
                    content:'vip_rights_desc.chat_desc'
                },
                {
                    svg:'vip-02.png',
                    title:'vip_rights_desc.visited',
                    content:'vip_rights_desc.visited_desc'
                },
                {
                    svg:'vip-03.png',
                    title:'vip_rights_desc.search',
                    content:'vip_rights_desc.search_desc'
                },
                {
                    svg:'vip-04.png',
                    title:'vip_rights_desc.events',
                    content:'vip_rights_desc.events_desc'
                },
                {
                    svg:'',
                    title:'vip_rights_desc.read_receipts',
                    content:'vip_rights_desc.read_receipts_desc'
                }
            ]
        }
    },
    componentDidMount:function() {
        if(RB.isMobileLayout()){
            this.setState({
                isMobile:true
            });
        }
        if(this.props.isVIP){
            RBService.getSubscriptions().then(function (response) {
                if(response.data.date_to_expire != undefined || response.data.date_to_expire != '') {
                    this.setState({
                        vipExpirationDate: response.data.date_to_expire
                    });
                }
            }.bind(this))
                .catch(function (response) {
                    console.log("getVIPPlans error:", response);
                });
        }
        else{
            RBService.getVIPPlans().then(function (response) {
                var items = response.data.available_vip_plans;
                var plan = null;
                for(var i = 0;i<items.length;i++){
                    if(items[i].product_name == "vip_plan_6month"){
                        plan = items[i];
                        break;
                    }
                }
                this.setState({
                    planList:items,
                    selectedPlan: plan
                });
            }.bind(this))
                .catch(function (response) {
                    console.log("getVIPPlans error:", response);
                });
        }

        RB.addChangeLayoutListener(this.layoutChanged);
    },
    componentWillUnmount: function() {
        RB.removeChangeLayoutListener(this.layoutChanged);
    },
    layoutChanged:function(isMobile){
        this.setState({isMobile:isMobile});
    },
    onPurchase:function(){
        if(!this.state.selectedPlan){
            return;
        }
        if(this.state.isMobile){
            this.setState({isPurchase:true})
        }
        else{
            this.refs.PurchaseForm.getWrappedInstance().show();
        }
    },
    changePlan:function(plan){
        this.setState({
            selectedPlan:plan
        })
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        var planList = this.state.planList.map(function(plan,index){
            var cls="plan_item";
            if(this.state.selectedPlan){
                if(this.state.selectedPlan.id == plan.id)
                    cls = "plan_item better-plan";
            }
            else {
                if (index == 1)
                    cls = "plan_item better-plan";
            }
            var planFooter = "plan_footer_monthly";
            if(plan.product_name == "vip_plan_6month"){
                planFooter = "plan_footer_6month";
            }
            else if(plan.product_name == "vip_plan_yearly"){
                planFooter = "plan_footer_1year";
            }
            return (
                <li className={ "vip-diamonds_" + cls} key={plan.product_name} onClick={this.changePlan.bind(null,plan)}>
                    <span className="vip-diamonds_most-popular">
                        {plan.product_name == "vip_plan_6month" && (formatMessage({id:"saved_percent"},{percent:'43'}) + " - " + formatMessage({id:'most_popular'})) }</span>
                      <span className="vip-diamonds_plan_name">{formatMessage({id:plan.product_name})}</span>
                    <span className="vip-diamonds_plan_price">{formatMessage({id:"price_per_mo"},{price: plan.price})}</span>
                    <span className="vip-diamonds_plan_monthly-price">{plan.duration_in_months > 1 && formatMessage({id:'total_price_warning'},{price:plan.price})}<br />{formatMessage({id:planFooter})}</span>
                </li>
            )
        }.bind(this));
        var vipRights = this.props.planRights.map(function(item,index){
            return (
                <div key={"vip-right-" + index} className="vip-diamonds_right_items">
                    <div className="vip-diamonds_right_pic">{item.svg.length>0 && <image src={'/app/images/' + item.svg}/> } <div style={{clear:"both"}}></div></div>
                    <div className="vip-diamonds_right_content"><p className="vip-diamonds_right_title">{formatMessage({id:item.title})}</p><p className="vip-diamonds_right_text">{formatMessage({id:item.content})}</p></div>
                </div>
            )
        });
        return(
            <div className="setting-vip-status vip-diamonds">
                { ((!this.state.isPurchase || !this.state.isMobile) && !this.props.isVIP) &&
                    <div className="vip-diamonds_plans">
                        <ul>
                            <li className="vip-diamonds_plan_header">{formatMessage({id:"select_plan" })}</li>
                            {planList}
                        </ul>
                        <div className="vip-diamonds_purchase" onClick={this.onPurchase}>{formatMessage({id:"purchase" })}</div>
                    </div>
                }
                { (!this.state.isPurchase || !this.state.isMobile) &&
                    <div className="vip-diamonds_rights">
                        { this.props.isVIP && <div className="vip-diamonds_title">{formatMessage({id: "vip_warning"})}</div>}
                        { (this.props.isVIP && this.state.vipExpirationDate !="") && <div className="vip-diamonds_tip"><FormattedHTMLMessage id="expirationDate" values={{date:this.state.vipExpirationDate}} /> </div>}
                        { !this.props.isVIP && <div className="vip-diamonds_title">{formatMessage({id: "vip_tip"})}</div>}
                        {vipRights}
                    </div>
                }
                { (!this.state.isPurchase && !this.state.isMobile && !this.props.isVIP) &&
                    <PurchaseForm ref="PurchaseForm" selectedPlan={this.state.selectedPlan} buyType={this.props.buyType}/>
                }
                { (!this.state.isPurchase && this.state.isMobile && !this.props.isVIP) &&
                    <div className="vip-diamonds_mb-plans">
                        <ul>
                            <li className="vip-diamonds_plan_header">{formatMessage({id:"select_plan" })}</li>
                            {planList}
                        </ul>
                        <div className="vip-diamonds_purchase" onClick={this.onPurchase}>{formatMessage({id:"purchase" })}</div>
                    </div>
                }
                { (this.state.isPurchase && this.state.isMobile && !this.props.isVIP) &&
                    <MBPurchase selectedPlan={this.state.selectedPlan} buyType={this.props.buyType} />
                }
            </div>
        )
    }
});


export default injectIntl(VIPState);
