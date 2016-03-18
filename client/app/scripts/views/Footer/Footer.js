require('../../styles/views/Footer.scss');

var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
var Footer = React.createClass({
    getDefaultProps :function(){
        return{
            footer:[
                {
                    name:'footer.aobut_us',
                    list:[
                        {
                            name:'footer.brief_intro',
                            url:'/en/site/about'
                        },
                        {
                            name:'footer.team',
                            url:'/en/site/team'
                        },
                        {
                            name:'footer.in_the_news',
                            url:'/en/site/in_the_news'
                        },
                        {
                            name:'footer.collaborators',
                            url:'/zh-CN/site/collaborators'
                        },
                        {
                            name:'footer.career',
                            url:'/en/site/career'
                        }
                    ]
                },
                {
                    name:'footer.events',
                    list:[
                        {
                            name:'footer.event_list',
                            url:'/en/events'
                        },
                        {
                            name:'footer.fcwr_2014_us_edition',
                            url:'http://fcwr.2redbeans.com'
                        },
                        {
                            name:'footer.blty_2014_us_edition',
                            url:'http://blty.2redbeans.com'
                        },
                        {
                            name:'footer.take_me_out',
                            url:'http://www.2redbeans.com/tmo_registrations'
                        },
                        {
                            name:'footer.campus_fcwr',
                            url:'http://feichengwurao.2redbeans.com/'
                        }
                    ]
                },
                {
                    name:'footer.help_and_support',
                    list:[
                        {
                            name:'footer.faq',
                            url:'http://support.2redbeans.com'
                        },
                        {
                            name:'footer.contact',
                            url:'/en/site/contact'
                        },
                        {
                            name:'footer.online_dating_safety',
                            url:'/en/site/safety'
                        },
                        {
                            name:'footer.terms_of_use',
                            url:'/en/site/term'
                        },
                        {
                            name:'footer.privacy_policy',
                            url:'/en/site/privacy'
                        }
                    ]
                },
                {
                    name:'footer.learn_more',
                    list:[
                        {
                            name:'footer.blog',
                            url:'http://blog.sina.com.cn/2redbeans'
                        },
                        {
                            name:'footer.facebook',
                            url:'http://facebook.com/2redbeans'
                        },
                        {
                            name:'footer.sina_weibo',
                            url:'http://weibo.com/tworedbeans'
                        },
                        {
                            name:'footer.spotlights',
                            url:'/en/chinese-singles'
                        },
                        {
                            name:'footer.fun_merchandise',
                            url:'/en/site/tshirt'
                        }
                    ]
                }
            ]
        }
    },
    render:function(){
        const {formatMessage} = this.props.intl;
        var html = this.props.footer.map(function(i,index){
            const subItem = i.list.map(function(subI){
                return(<li><a href={subI.url}>{formatMessage({id:subI.name})}</a></li>)
            });
            console.log(subItem);
            return (<ul><li>{formatMessage({id:i.name})}</li>{ subItem }</ul>)
        }.bind(this));
        var tooltip = <Tooltip>{"$MASQUE_VERSION"}</Tooltip>;
        return(
            <div className="rb-footer">
                <div className="footer-content">
                    {html}
                    <div style={{clear:'both'}}></div>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <div id="copyright">
                            © 2016 2RedBeans.com
                        </div>
                    </OverlayTrigger>
                    <div className="powered_by">
                        With Love, from Cupertino, California, USA.
                    </div>
                </div>
            </div>
        )
    }
});

export default injectIntl(Footer);