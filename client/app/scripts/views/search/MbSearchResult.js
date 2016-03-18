var React = require('react');
var ReactDOM = require('react-dom');

var UserList = React.createClass({

    render: function() {
        var items = this.props.users.map(function (user) {
            const photo = user.mainPhoto.small_image_url;
            const isVIP = user.isVIP;
            const isStaff = user.userType==2;
            return (
                <li className="mb-search_item" id={user.id}>
                    <div className="mb-search_img-container">
                        <img src={photo} width="90px" height="90px" />
                    </div>
                    <div className="mb-search_info">
                        <p className="truncate mb-search_text mb-search_text--username">{user.name} {user.age == ""? "":user.age}
                            {isVIP && !isStaff && <span className="vip-badge search_result_badge">VIP</span>}
                            { isStaff && <span className="staff-badge search_result_badge"><FormattedMessage id="staff"/></span> }
                        </p>
                        <p className="mb-search_text truncate mb-search_text--user-location">{user.address}</p>
                        <p className="mb-search_text mb-search_text--user-introduce">{user.aboutMe}</p>
                    </div>
                </li>
            )
        });
        return (
            <a>
                {items}
            </a>
        )
    }

});


var MbSearchResult = React.createClass({
    render: function() {
        return (
            <div className="search_result">
                <UserList users={this.props.users} />
            </div>
        )
    }
});

exports.MbSearchResult = MbSearchResult;
