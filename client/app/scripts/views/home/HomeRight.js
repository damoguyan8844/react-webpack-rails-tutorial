
import React from 'react';
import ReactDOM from 'react-dom';
import UpcomingEvents from './UpcomingEvents';
import Challenges from './Challenges';
class HomeRight extends React.Component {

    render() {
        return (
            <div className="rb-home-right">
                <UpcomingEvents/>
                <Challenges/>
            </div>
        )

    }
}



export default HomeRight;