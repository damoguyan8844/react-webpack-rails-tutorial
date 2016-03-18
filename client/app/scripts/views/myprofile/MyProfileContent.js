
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';

import NavTab from '../../common/navTab/NavTab.js';
import Overview from './Overview.js';
import Insight from './Insight.js';
import Detail from './Detail.js';
import Photos from './Photos.js';
import Match from './Match.js';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var MyProfileContent = React.createClass({
    getDefaultProps :function(){
        return {
            tabs: {
                "overview":Overview,
                "insight":Insight,
                "detail":Detail,
                "match":Match,
                "photos":Photos
            }
        }
    },
    getInitialState:function(){
        if(RB.isMobileLayout()){
            return {activeItem:'overview',showOverview:true};
        }else{
            return {activeItem:'insight',showOverview:false};
        }
    },
    componentWillMount() {
        const {tab} = this.props.params;
        if(this.props.tabs[tab] ){
            this.setState({activeItem:tab,showOverview:tab=='overview'});
        }
    },
    componentDidMount: function() {
        RB.addChangeLayoutListener(this.layoutChanged);
    },

    componentWillUnmount: function() {
        RB.removeChangeLayoutListener(this.layoutChanged);
    },

    layoutChanged:function(isMobile){
        if(isMobile){
            this.setState({activeItem:'overview',showOverview:true});
        }
        else{
            var av = this.state.activeItem;
            if(av =='overview'){
                av = 'insight';
            }
            this.setState({activeItem:av,showOverview:false});
        }
    },

    switchTab:function(tab){
        if(tab){
            this.setState({activeItem:tab});
        }
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        //console.log('render content')
        var menus = [{key:'insight',label:formatMessage({id:'insight'})},
            {key:'detail',label:formatMessage({id:'details'})},
            {key:'match',label:formatMessage({id:'match'})},
            {key:'photos',label:formatMessage({id:'photos'})}];
        if(this.state.showOverview){
            menus.unshift({key:'overview',label:formatMessage({id:'overview'})});
        }
        var SelectedTab = this.state.activeItem?this.props.tabs[this.state.activeItem]: Insight;
        //console.log('===in content====');
        // console.log(this.props.user);
        return(
            <div className="rb-myprofile-content">
                <NavTab className="rb-my-profile-nav-tab" activeItem={this.state.activeItem} menuItems={menus} onSwitchTab={this.switchTab} />
                <SelectedTab {...this.props}/>
            </div>
        )
    }
});


export default injectIntl(MyProfileContent);
