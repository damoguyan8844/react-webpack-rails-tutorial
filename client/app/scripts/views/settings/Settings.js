
require('../../styles/views/Settings.scss');

var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Account from './Account.js';
import Notifications from './Notifications.js';
import VIPStatus from './VIPStatus.js';
import MyDiamounts from './MyDiamonds.js';
import Contact from './Contact.js';

var Settings = React.createClass({
    getDefaultProps :function(){
        return {

        }
    },
    getInitialState:function(){
        return {
            menuItems:[],
            activeItem:'account',
            expand:false,
        }
    },
    handleSelect(selectedKey) {
        console.log(selectedKey);
        this.setState({activeItem:selectedKey});
    },
    changeMenu:function(item){
        this.setState({
            activeItem:item,
            expand:false
        });
    },
    expandMenu:function(){
        this.setState({expand:!this.state.expand});
    },
    componentWillReceiveProps:function(nextProps){
        var setting_item = nextProps.params.id?nextProps.params.id:'account';
        this.setState({ activeItem: setting_item });
    },
    componentDidMount:function(){
        this.setState({menuItems :this.props.overview.isVIP ? ['account','notification','vip_status','contact'] :
            ['account','notification','vip_status','my_diamonds','contact']});
        var setting_item = this.props.params.id?this.props.params.id:'account';
        console.log("setting_item:" + setting_item);
        if(setting_item !== undefined)
            this.setState({ activeItem: setting_item });
    },
    render: function() {

        var menus = this.state.menuItems.map(function(item){
            if(item == this.state.activeItem){
                return (
                    <NavItem eventKey={item} key={item} className="rb-settings_item active">{"setting_menus." +item}</NavItem>
                )
            }else{
                return (
                    <NavItem eventKey={item} key={item} className="rb-settings_item">{"setting_menus." +item}</NavItem>
                )
            }

        }.bind(this));
        var mb_menus = this.state.menuItems.map(function(item){
            if(item !== this.state.activeItem){
                return (
                    <li className="rb-settings_mbitem" eventKey={item} key={item} onClick={this.changeMenu.bind(null,item)}>{"setting_menus." +item}</li>
                )
            }
        }.bind(this));

        var cls=this.state.expand ? "hideMenu" : "hideMenu display_none";
        var nav_cls=this.state.expand ? "mb_nav active" : "mb_nav";
        var tttt = this.state.$$comments;
        return(
            <div className="rb-settings">
                <div className="rb-settings_header">
                    <h2>settings</h2>
                    <p>change_all_your_settings</p>
                </div>
                <div>
                    <Nav className="rb-settings_nav" bsStyle="tabs"  onSelect={this.handleSelect} >
                        {menus}
                    </Nav>

                    <div className={ "rb-settings_" + nav_cls} onClick={this.expandMenu}>
                        <span>setting_menus</span>
                    </div>
                    <ul className={ "rb-settings_" + cls}>
                        {mb_menus}
                    </ul>

                </div>
            </div>
        )
    }
});

function mapStateToProps(state,ownProps){
    return {
        overview:state.me.overview
    }
}

Settings = connect(mapStateToProps)(Settings);
export default Settings;