var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var RBService = require('../../services/RBService');
import {injectIntl,defineMessages,FormattedMessage,FormattedHTMLMessage} from 'react-intl';
import {connect} from 'react-redux';
import PurchaseForm from "./PurchaseForm.js";
import {updateUserStatus} from '../../actions/MeActionCreators.js';
import MBPurchase from "./MBPurchase.js";

var pricePer = 1;
var MyDiamonds = React.createClass({
    mixins: [IntlMixin],
    getInitialState:function(){
        return {
            dia_count: 0,
            diamontPlanList: [],
            selectedPlan:null

        }
    },
    getDefaultProps :function(){
        return{
            buyType:'diamonds',
            planRights:[
                {
                    svg:'vip-01.png',
                    title:'diamond_rights_desc.chat',
                    content:'diamond_rights_desc.chat_desc'
                },
                {
                    svg:'vip-02.png',
                    title:'diamond_rights_desc.visited',
                    content:'diamond_rights_desc.visited_desc'
                },
                {
                    svg:'vip-03.png',
                    title:'diamond_rights_desc.search',
                    content:'diamond_rights_desc.search_desc'
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
        RBService.getDiamondPlan().then(function (response) {
            var items = response.data.available_reward_point_plans;
            var plan = null;
            for(var i = 0;i<items.length;i++){
                if(i ==0 ){
                    pricePer = items[i].price / items[i].reward_points_count;
                }
                if(i == 1){
                    plan = items[i];
                    break;
                }
            }
            this.setState({
                diamontPlanList:items,
                selectedPlan: plan
            });
        }.bind(this))
            .catch(function (response) {
                console.log("getVIPPlans error:", response);
            });

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
        this.refs.PurchaseForm.getWrappedInstance().show();
    },
    changePlan:function(plan){
        this.setState({
            selectedPlan:plan
        })
    },
    updateDiamondCount:function(purchaseCount){
        var userStatus = jQuery.extend(true,{}, this.props.userStatus);
        userStatus.rewardPointsCount = userStatus.rewardPointsCount + purchaseCount;
        this.props.updateUserStatus(userStatus);
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        var planList = this.state.diamontPlanList.map(function(plan, index){
            var cls="plan_item";
            if(this.state.selectedPlan){
                if(this.state.selectedPlan.iap_product_name == plan.iap_product_name)
                    cls = "plan_item better-plan";
            }
            var percent = Math.round((pricePer-(plan.price / plan.reward_points_count))/pricePer*100);
            return (
                <li className={ "vip-diamonds_" + cls} key={plan.iap_product_name} onClick={this.changePlan.bind(null,plan)}>
                    <span className="vip-diamonds_most-popular">
                        {index > 0 && (formatMessage({id:"saved_percent"},{percent:percent}) + (index==1 ? (" - " + formatMessage({id:'most_popular'})) : "")) }
                    </span>
                    <span className="vip-diamonds_plan_name">{plan.iap_product_name}</span>
                    <span className="vip-diamonds_plan_monthly-price">{plan.price}</span>
                </li>
            )
        }.bind(this));
        var vipRights = this.props.planRights.map(function(item,index){
            return (
                <div key={"vip-right-" + index} className="vip-diamonds_right_items">
                    <div className="vip-diamonds_right_pic">{item.svg.length>0 && <image src={'/app/images/' + item.svg}/> } <div ctyle={{clear:"both"}}></div></div>
                    <div className="vip-diamonds_right_content"><p className="vip-diamonds_right_title">{formatMessage({id:item.title})}</p><p className="vip-diamonds_right_text">{formatMessage({id:item.content})}</p></div>
                </div>
            )
        });
        return(
            <div className="setting-diamonds vip-diamonds">
                { (!this.state.isPurchase) &&
                    <div className="vip-diamonds_rights">
                        <div className="vip-diamonds_title"><FormattedHTMLMessage id="diamond_count_tip" values={{count:this.props.userStatus.rewardPointsCount}} /></div>
                        <div className="vip-diamonds_tip">{formatMessage({id:"guide_to_vip" })} </div>
                    </div>
                }
                { (!this.state.isPurchase) &&
                <div className="vip-diamonds_plans">
                    <ul>
                        <li className="vip-diamonds_plan_header">{formatMessage({id: "get_more_diamonds"})}</li>
                        {planList}
                    </ul>
                    <div className="vip-diamonds_purchase"
                         onClick={this.onPurchase}>{formatMessage({id: "purchase"})}</div>
                </div>
                }
                { (!this.state.isPurchase) &&
                <div className="vip-diamonds_rights">
                    {vipRights}
                </div>
                }
                { (!this.state.isPurchase && !this.state.isMobile && !this.props.isVIP) &&
                    <PurchaseForm ref="PurchaseForm" selectedPlan={this.state.selectedPlan} buyType={this.props.buyType} onUpdateDiamond={this.updateDiamondCount} />
                }
                { (!this.state.isPurchase) &&
                    <div className="vip-diamonds_mb-plans">
                        <ul>
                            <li className="plan-header">{formatMessage({id: "select_diamond_plan"})}</li>
                            {planList}
                        </ul>
                        <div className="vip-diamonds_purchase"
                             onClick={this.onPurchase}>{formatMessage({id: "purchase"})}</div>
                    </div>
                }
                { (this.state.isPurchase && this.state.isMobile) &&
                    <MBPurchase selectedPlan={this.state.selectedPlan} buyType={this.props.buyType} />
                }
             </div>
        )
    }

});
function mapStateToProps(state){
    return {
        userStatus:state.me.userStatus
    }
}

MyDiamonds = connect(mapStateToProps,{updateUserStatus})(MyDiamonds);
export default injectIntl(MyDiamonds);
