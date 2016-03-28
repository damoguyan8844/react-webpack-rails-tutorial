var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var PaidInfo = React.createClass({
    render:function(){
        const {formatMessage} = this.props.intl;
        return(
            <div className="paid paid-info" style={{display:this.props.isPaySus ? "": "none"}}>
                {
                    this.props.buyType == "VIP" &&
                    <div className="paid_vip-indication">{formatMessage({id: "you_now_vip"})}</div>
                }
                {
                    this.props.buyType == "diamonds" &&
                    <div className="paid_vip-indication">{formatMessage({id: "purchase_successfully"})}</div>
                }
                <span className="paid_span">{formatMessage({id:"buy_vip_email_tip" })}</span>
                {
                    this.props.buyType == "VIP" &&
                    <span className="paid_span expire-warning">{formatMessage({id: "expire_warning"})}</span>
                }
                {
                    this.props.buyType == "VIP" &&
                    < div className="paid_vip-expire-tip">{formatMessage({id:"expire_tip" })}<span className="paid_span paid_vip-expire-value">{this.props.VIPExpiration}</span></div>
                }
                <div className="paid_management-info">
                    <ul>
                        <li className="paid_management-info_item"><Link className="paid_management-info_link" to="/myprofile">{formatMessage({id:"go_to_profile" })}</Link></li>
                        <li className="paid_management-info_item"><Link className="paid_management-info_link" to="/myprofile">{formatMessage({id:"go_to_account" })}</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        overview:state.me.overview
    }
}

PaidInfo = connect(mapStateToProps)(PaidInfo);
export default PaidInfo;
