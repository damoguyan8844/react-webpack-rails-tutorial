
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import RBService from '../../services/RBService';
import {getFeeds} from '../../actions/HomeActionCreators';
import User from '../../models/User';
class Activity extends React.Component {
    componentWillMount() {

    }
    onClickNext(){
        RBService.getFeeds(this.props.nextPage,this.props.nextPageToken)
        .then(function(response){
            const feedsData = {
                feeds:response.data.feeds,
                nextPage:response.data.next_page,
                nextPageToken:response.data.pagination_token
            }
            this.props.getFeeds(feedsData);
        }.bind(this));
    }
    render() {
        const list = this.props.feeds && this.props.feeds.map(function(f){
            const feed = f.feed;
            const avatarUrl = feed.actor_main_photo?feed.actor_main_photo.mobile_image_url:User.defaultMainPhoto().small_image_url;
            return (
                <div className="activity-item">
                    <div className="avatar">
                        <img src={avatarUrl}></img>
                    </div>
                    <div className="feed">
                        <Link to={"/profile/"+feed.actor_token}>{feed.actor_name}</Link> {feed.headline}
                    </div>

                    {(feed.type_id == 6 || feed.type_id == 4) &&
                    <div className="photos">
                        <img src={feed.url}></img>
                    </div>
                    }
                </div>
            )

        }.bind(this))
        return (
            <div className="home-activity">
                <div className="activity-list">
                    {list}
                </div>
                {this.props.feeds && this.props.nextPage &&
                <div className="next-page">
                    <span className="link" onClick={this.onClickNext.bind(this)}>
                        <FormattedMessage id='more'/>
                    </span>
                </div>
                }
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        feeds:state.home.feeds,
        nextPage:state.home.nextPage,
        nextPageToken:state.home.nextPageToken
    }
}

export default connect(mapStateToProps,{getFeeds})(Activity);
