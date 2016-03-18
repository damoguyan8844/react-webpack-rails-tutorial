require('../../styles/home.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import RBService from '../../services/RBService';
import {createFeeds,getEvents} from '../../actions/HomeActionCreators';

class Home extends React.Component {
    componentWillMount() {
        if(this.props.home.feeds.length == 0){
            RBService.getFeeds(0,null)
            .then(function(response){
                const feedsData = {
                    feeds:response.data.feeds,
                    nextPage:response.data.next_page,
                    nextPageToken:response.data.pagination_token
                }
                this.props.createFeeds(feedsData);
            }.bind(this))
        }
        if(!this.props.home.events || this.props.home.events.length == 0){
            RBService.getEvents()
            .then(function(response){
                this.props.getEvents(response.data.events);
            }.bind(this))
        }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="rb-home">
                <HomeLeft />
                <HomeRight />
            </div>
        )

    }
}
function mapStateToProps(state){
    return {
        home:state.home
    }
}



export default connect(mapStateToProps,{createFeeds,getEvents})(Home);
