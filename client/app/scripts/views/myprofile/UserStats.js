
var React = require('react');
var ReactDOM = require('react-dom');
import {Link} from 'react-router';
import {injectIntl,FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

var UserStats = React.createClass({
    render: function() {
        /*
         <a className="rb-user-stats_item">
         <div className="rb-user-stats_title"><FormattedMessage id="new_matches"/></div>
         <div className="rb-user-stats_stat">{this.props.userStatus.unreadMatchedCount}</div>
         </a>
         */
        return(
            <div className="rb-user-stats">
                <Link to="/connections/favorited" className="rb-user-stats_item">
                    <div className="rb-user-stats_title"><FormattedMessage id="favorited_me"/></div>
                    <div className="rb-user-stats_stat">{this.props.userStatus.unreadFavoredCount}</div>
                </Link>

                <Link to="/connections/visitors" className="rb-user-stats_item">
                    <div className="rb-user-stats_title"><FormattedMessage id="new_visitors"/></div>
                    <div className="rb-user-stats_stat">{this.props.userStatus.unreadVisitedCount}</div>
                </Link>
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        userStatus:state.me.userStatus
    }
}

UserStats = connect(mapStateToProps)(UserStats);
export default UserStats;
