import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {injectIntl,FormattedMessage} from 'react-intl';
import NavTab from '../../common/navTab/NavTab.js';
import Photos from './Photos.js';
import Overview from './Overview.js';
import Details from './Details.js';
import Insight from './Insight.js';
import BottomBar from './BottomBar.js';
import ProfileMessages from './ProfileMessages.js';

var ProfileContent = React.createClass({
    getDefaultProps: function() {
        return {
            tabs: {
                "Overview": <Overview/>,
                "Insight": <Insight />,
                "Details": <Details/>,
                "Photos": <Photos/>
            }
        }
    },

    getInitialState: function() {
        if(RB.isMobileLayout()) {
            return {activeItem:'Overview',showOverview:true};
        } else {
            return {activeItem:'Insight',showOverview:false};
        }
    },

    componentDidMount: function() {
        RB.addChangeLayoutListener(this.layoutChanged);
    },

    componentWillUnmount: function() {
        RB.removeChangeLayoutListener(this.layoutChanged);
    },

    layoutChanged: function(isMobile) {
        if (isMobile) {
            this.setState({activeItem:'Overview',showOverview:true});
        } else {
            var av = this.state.activeItem;
            if(av =='Overview') {
                av = 'Insight';
            }
            this.setState({activeItem:av,showOverview:false});
        }
    },

    switchTab: function(tab){
        if (tab) {
            this.setState({activeItem:tab});
        }
    },
    render: function() {
        var menus = [
            {key:'Insight',label:this.props.intl.formatMessage({id:'insight'})},
            {key:'Details',label:this.props.intl.formatMessage({id:'details'})},
            {key:'Photos',label:this.props.intl.formatMessage({id:'photos'})}];
        if(this.state.showOverview){
            menus.unshift({key:'Overview',label:this.props.intl.formatMessage({id:'overview'})});
        }
        var tab = this.state.activeItem?this.props.tabs[this.state.activeItem]: <Insight/>;

        return(
            <div className="rb-profile-content">
                <NavTab className="rb-profile-nav-tab"
                    activeItem={this.state.activeItem}
                    menuItems={menus}
                    onSwitchTab={this.switchTab}
                />
                <ProfileMessages />
                {tab}
                <BottomBar/>
            </div>
        )
    }
});

function mapStateToProps(state){
    return { user:state.user }
}
ProfileContent = injectIntl(ProfileContent);
ProfileContent = connect(mapStateToProps)(ProfileContent)

exports.ProfileContent = ProfileContent;
