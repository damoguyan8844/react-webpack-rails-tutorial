var React = require('react');
var ReactDOM = require('react-dom');
var RBService = require('../../services/RBService');
import {connect} from 'react-redux';
import {injectIntl,FormattedMessage} from 'react-intl';

var Insight = React.createClass({
    getInitialState:function(){
        return {
            recommendUsers:[]
        }
    },
    componentWillMount:function(){
        RBService.getRecommendUsers()
            .then(function(response){
                var users = this.mapUsers(response.data.users);
                this.setState({
                    recommendUsers:users
                })
            }.bind(this))
            .catch(function(response){
                console.log("getRecommendUsers error:",response);
            });
    },
    mapUsers:function(source){
        if (source.length<1)
            return [];
        var users = [];
        var today = new Date();
        source.forEach(function(u){
            var user = (new SearchUser(u.user)).data;
            users.push(user);
        });
        return users;
    },
    render: function() {
        var questions = this.props.insight.questions.map(function(q){
            return (
                <div>
                    <div className="insight_title">{q.description}</div>
                    <hr className="insight_divider"></hr>
                    <div className="detail insight_detail">{q.answer}</div>
                </div>
            )
        }.bind(this));
        var recommends = this.state.recommendUsers.map(function(r){
            return (
                <Link to={'/profile/' + r.token} className="insight_like-item" key={'/profile/' + r.token}>
                    <div className="insight_name">{r.name} {r.age == ""? "": " , " + r.age}</div>
                    <div className="insight_avatar"><img className="insight_avatar_img" src={r.mainPhoto.small_image_url}></img></div>
                    <div className="insight_address">{r.address}</div>
                </Link>
            )
        }.bind(this));
        return(

            <div className="insight more">
                {questions}
                {this.state.recommendUsers.length >0 &&
                <div className="also-like-title insight_title"><FormattedMessage id="you_may_also_like"/></div>
                }
                <div className="insight_also-like">
                    {recommends}
                </div>

            </div>


        )
    }
});

function mapStateToProps(state){
    return {
        insight:state.user.insight
    }
}

Insight = connect(mapStateToProps)(Insight)

export default  Insight;
