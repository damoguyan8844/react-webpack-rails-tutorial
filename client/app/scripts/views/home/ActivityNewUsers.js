
import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';
import MatchSteps from './MatchSteps';
import Activity from './Activity';
import NewUsers from './NewUsers';
class ActivityNewUsers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab:'activity'
        }
    }
    onClickTab(tab){
        if(this.state.activeTab != tab){
            this.setState({activeTab:tab});
        }
    }
    render() {
        const tabs = {activity:<Activity/>,newUsers:<NewUsers/>};
        const tab = tabs[this.state.activeTab];
        return (
            <div className="home-activity-new-users">
                <div className="tab-header">
                    <a className={this.state.activeTab == 'activity'?'active':''}
                       onClick={this.onClickTab.bind(this,'activity')} >
                        <span><FormattedMessage id='activity'/></span>
                    </a>
                    <a className={this.state.activeTab == 'newUsers'?'active':''}
                       onClick={this.onClickTab.bind(this,'newUsers')}>
                        <span><FormattedMessage id='new_users'/></span>
                    </a>
                </div>
                {tab}
            </div>
        )

    }
}



export default ActivityNewUsers;
