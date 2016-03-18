var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
import { Link } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var Contact = React.createClass({
    render:function(){
        const {formatMessage} = this.props.intl;
        return(<div className="contact">
            <ul>
                <li className="contact_label">{formatMessage({id:"how_help" })}</li>
                <li>
                    <div className="contact_content-group">
                        <span className="contact_sub-label">{formatMessage({id:"how_help_content" })}</span>
                        <span className="contact_help-button contact_button"><Link to="#">{formatMessage({id:"help_center" })}</Link></span>
                    </div>
                </li>
            </ul>
            <ul>
                <li className="contact_label">{formatMessage({id:"is_it_urgent" })}</li>
                <li>
                    <div className="contact_content-group">
                        <span className="account_sub-label">{formatMessage({id:"is_it_urgent_content" })}</span>
                    </div>
                </li>
            </ul>
        </div>)
    }
});

export default injectIntl(Contact);