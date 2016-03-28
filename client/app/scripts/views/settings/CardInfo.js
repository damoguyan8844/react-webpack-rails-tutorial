var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage,FormattedHTMLMessage} from 'react-intl';

var CardInfo = React.createClass({
    focusInput:function(id){
        $('#' + id).focus();
    },
    setCardInfo:function(type,e){
        this.props.onSetCardInfo(type,e.target.value);
    },
    setAutoRenew:function(){
        this.props.onSetAutoRenew();
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        return(
            <div className="card card-info" style={{display:!this.props.isPaySus ? "": "none"}}>
                <div>{formatMessage({id:"card_number" })}
                    <span className="card_icons">
                        <span className="card-span">
                        <svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="settings----vip-checkout" transform="translate(-320.000000, -221.000000)">
                                    <g id="checkout">
                                        <g id="Group" transform="translate(146.000000, 208.000000)">
                                            <g transform="translate(174.000000, 13.000000)">
                                                <rect id="Background" fill="#FAFAFA" x="0" y="0" width="20" height="16" rx="2"></rect>
                                                <rect id="Bottom-Bar" fill="#303F9F" x="0" y="12" width="20" height="4"></rect>
                                                <rect id="Logo" fill="#303F9F" x="6" y="7" width="8" height="2" rx="2"></rect>
                                                <rect id="Top-Bar" fill="#FFAB00" x="0" y="0" width="20" height="4"></rect>
                                                <rect id="Border" stroke-opacity="0.12" stroke="#000000" x="0" y="0" width="20" height="16" rx="2"></rect>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </span>
                        <span className="card_span">
                        <svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="settings----vip-checkout" transform="translate(-352.000000, -221.000000)">
                                    <g id="checkout">
                                        <g id="Group" transform="translate(146.000000, 208.000000)">
                                            <g id="card-4" transform="translate(206.000000, 13.000000)">
                                                <rect id="Background" stroke-opacity="0.12" stroke="#000000" fill="#FAFAFA" x="0" y="0" width="20" height="16" rx="2"></rect>
                                                <path d="M11,8 C11,8.885 10.61,9.672 10,10.221 C10.532,10.7 11.228,11 12,11 C13.657,11 15,9.657 15,8 C15,6.343 13.657,5 12,5 C11.228,5 10.532,5.3 10,5.779 C10.61,6.328 11,7.115 11,8" id="Right-Oval" fill="#FF9900"></path>
                                                <path d="M9,8 C9,7.115 9.39,6.328 10,5.779 C9.468,5.3 8.772,5 8,5 C6.343,5 5,6.343 5,8 C5,9.657 6.343,11 8,11 C8.772,11 9.468,10.7 10,10.221 C9.39,9.672 9,8.885 9,8" id="Left-Oval" fill="#CC0000"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </span>
                        <span className="card_span">
                        <svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="vip-checkout" transform="translate(-386.000000, -221.000000)">
                                    <g id="checkout">
                                        <g id="Group" transform="translate(146.000000, 208.000000)">
                                            <g transform="translate(240.000000, 13.000000)">
                                                <rect id="Background" fill="#FAFAFA" x="0" y="0" width="20" height="16" rx="2"></rect>
                                                <path d="M20,9 L20,13.9940809 C20,15.1019194 19.1064574,16 17.9972399,16 L7,16 C7,16 16,16 20,9 Z" id="Wave" fill="#F57C00"></path>
                                                <rect id="Logo" fill="#424242" x="6" y="7" width="8" height="2" rx="2"></rect>
                                                <rect id="Border" stroke-opacity="0.12" stroke="#000000" x="0" y="0" width="20" height="16" rx="2"></rect>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </span>
                        <span className="card_span">
                        <svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="settings----vip-checkout" transform="translate(-418.000000, -221.000000)">
                                    <g id="checkout">
                                        <g id="Group" transform="translate(146.000000, 208.000000)">
                                            <g id="Background-+-Outer-Shape-+-Inner-Shape" transform="translate(272.000000, 13.000000)">
                                                <rect id="Background" stroke-opacity="0.12" stroke="#000000" fill="#FAFAFA" x="0" y="0" width="20" height="16" rx="2"></rect>
                                                <path d="M8,11 C6.34314575,11 5,9.65685425 5,8 C5,6.34314575 6.34314575,5 8,5 L12,5 C13.6568542,5 15,6.34314575 15,8 C15,9.65685425 13.6568542,11 12,11 L8,11 Z M8,10 C9.1045695,10 10,9.1045695 10,8 C10,6.8954305 9.1045695,6 8,6 C6.8954305,6 6,6.8954305 6,8 C6,9.1045695 6.8954305,10 8,10 Z" id="Outer-Shape" fill="#303F9F"></path>
                                                <path d="M8.42857143,9.2125547 C8.92793959,9.03605338 9.28571429,8.55980807 9.28571429,8 C9.28571429,7.44019193 8.92793959,6.96394662 8.42857143,6.7874453 L8.42857143,9.2125547 Z M7.57142857,6.7874453 C7.07206041,6.96394662 6.71428571,7.44019193 6.71428571,8 C6.71428571,8.55980807 7.07206041,9.03605338 7.57142857,9.2125547 L7.57142857,6.7874453 Z" id="Inner-Shape" fill="#303F9F"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </span>
                        <span className="card_span">
                        <svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="linearGradient-1">
                                    <stop stop-color="#6EC7F1" offset="0%"></stop>
                                    <stop stop-color="#006FAF" offset="100%"></stop>
                                </linearGradient>
                            </defs>
                            <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="settings----vip-checkout" transform="translate(-450.000000, -221.000000)">
                                    <g id="checkout">
                                        <g id="Group" transform="translate(146.000000, 208.000000)">
                                            <g id="Background-+-Logo" transform="translate(304.000000, 13.000000)">
                                                <rect id="Background" stroke-opacity="0.12" stroke="#000000" fill="url(#linearGradient-1)" x="0" y="0" width="20" height="16" rx="2"></rect>
                                                <rect id="Logo" fill="#FAFAFA" x="6" y="7" width="8" height="2" rx="2"></rect>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </span>
                    </span>
                </div>
                <div className="card_input" id="cardNo">
                    <input className="card_input_textbox" type="text" value={this.props.cardNo} onClick={this.focusInput.bind(null,'cardNo')} id="cardNo" onBlur={this.setCardInfo.bind(null,'cardNo')} placeholder="4444 4444 4444 4444" maxLength="16" ref="cardNo" />
                    <span className="card_input_span" id="error-icon" style={{display:'none'}}>
                    <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <g id="-Settings" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="settings----vip-checkout" transform="translate(-441.000000, -261.000000)" fill="#E3102A">
                                <g id="checkout">
                                    <g id="Group" transform="translate(146.000000, 208.000000)">
                                        <g id="card" transform="translate(3.000000, 13.000000)">
                                            <path d="M299.500073,40 C295.357888,40 292,43.3578519 292,47.5000364 C292,51.6421481 295.357888,55 299.500073,55 C303.642148,55 307,51.6421481 307,47.5000364 C307,43.3578519 303.642148,40 299.500073,40 L299.500073,40 Z M299.516748,52.6887621 C298.926687,52.6887621 298.448362,52.2104005 298.448362,51.6203398 C298.448362,51.0303519 298.926687,50.5520631 299.516748,50.5520631 C300.106735,50.5520631 300.585024,51.0303519 300.585024,51.6203398 C300.585024,52.2104005 300.106735,52.6887621 299.516748,52.6887621 L299.516748,52.6887621 Z M300.928386,43.9407403 C300.838058,44.6608859 300.174745,48.1669539 299.955461,49.3190413 C299.914939,49.5320995 299.728677,49.6867597 299.51176,49.6867597 L299.503058,49.6867597 C299.278459,49.6867597 299.086626,49.5273301 299.044757,49.3067354 C298.82267,48.1372816 298.160303,44.6281917 298.071396,43.9194417 C297.964357,43.0660073 298.6304,42.3112743 299.490461,42.3112743 C300.361917,42.3112743 301.036881,43.0760194 300.928386,43.9407403 L300.928386,43.9407403 Z" id="warning-3-icon"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    </span>
                </div>
                <div className="card_more-info card_more">
                    <div className="card_more_items">
                        <span className="">{formatMessage({id:"expiration_date" })}</span>
                        <div className="card_more_input">
                            <input className="card_more_textbox" type="text" value={this.props.expirationDate} onClick={this.focusInput.bind(null,'cardExpiration')} id="cardExpiration" onBlur={this.setCardInfo.bind(null,'cardExpiration')} placeholder="11/2017" ref="cardExpiration" /></div>
                    </div>
                    <div className="card_more_items">
                        <span>{formatMessage({id:"security_cvv" })}</span>
                        <div className="card_more_input"><input className="card_more_textbox" type="text" onClick={this.focusInput.bind(null,'cvv')} id="cvv" onBlur={this.setCardInfo.bind(null,'cvv')} value={this.props.cvv} placeholder="123" ref="cvv" /></div>
                    </div>
                    <div className="card_security"><img src="/app/images/security_cvv.png" /></div>
                </div>
                { this.props.buyType == "VIP" &&
                    <div className="card_auto-renew">
                        <input type="checkbox" className="auto_renew_checkbox" checked={this.props.isAutoRenew } id="chb_auto_renew" onChange={this.setAutoRenew} />
                        <label className="auto_renew_checkbox_label" htmlFor="chb_auto_renew">{formatMessage({id:"want_auto_renew" })}</label>
                    </div>
                }
                <div className="card_stripe_error">{this.props.stripeError.length>0 ? formatMessage({id:this.props.stripeError }) : ""}</div>
                {
                    this.props.buyType == "diamonds" &&
                    <div className="card_diamonds-space">&nbsp;</div>
                }
                <div className="card_terms">
                    <label className="card_terms_label">{formatMessage({id:"terms" })}</label>
                    <div><FormattedHTMLMessage id="terms_tip" /></div>
                </div>
                {
                    this.props.buyType == "diamonds" &&
                    <div className="card_diamonds-space">&nbsp;</div>
                }
            </div>
        )
    }
});

export default CardInfo;
