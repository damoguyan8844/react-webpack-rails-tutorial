var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';
import { Link } from 'react-router';

var SearchResult = React.createClass({
    mixins: [History],
    viewProfile:function(searchUser,e){
        var token =searchUser.token;
        if(token && e.nativeEvent.which == 1 && !e.metaKey ){
            this.props.viewProfile && this.props.viewProfile(token);
            e.preventDefault();
        }
        if(this.props.is_quick_view )
        {
            this.props.onQuickView && this.props.onQuickView(searchUser);
        }
        else{
            e.preventDefault();
            this.history.pushState(null,'/profile/'+token);
        }
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var items = this.props.users.map(function (user) {
            const photo = user.mainPhoto.small_image_url;
            const isVIP = user.isVIP;
            const isStaff = user.userType==2;
            return (
                <Link className="search_result_item" to={'/profile/'+ user.token} onClick={this.viewProfile.bind(null,user)} id={user.token} key={this.props.platform + "_" + user.token}>
                    <div className="search_result_img-container">
                        <img src={photo} width="100px" height="100px" />
                    </div>
                    <div className="search_result_info">
                        <p className="truncate search_result_user-name search_result_text">{user.name} {user.age == ""? "": ",  " + user.age}
                            {isVIP && !isStaff && <span className="vip-badge search_result_badge">VIP</span>}
                            { isStaff && <span className="staff-badge search_result_badge"><FormattedMessage id="staff"/></span> }
                        </p>
                        <p className="truncate search_result_user_location search_result_text">{user.address}</p>
                        <p className="search_result_user_introduce search_result_text">{user.aboutMe}</p>
                    </div>
                </Link>
            )
        }.bind(this));
        return (
            <div className="search_result">
                {(this.props.users.length == 0 && this.props.sourceFrom == "search") ?
                    <li className="search_result_no-user">{formatMessage({id:"no_result"}) }</li>
                    : items
                }
                <div className="search-footer"></div>
            </div>
        )
    }
});

export default injectIntl(SearchResult);
