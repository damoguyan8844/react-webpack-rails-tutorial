
import React from 'react';
import ReactDOM from 'react-dom';
import MatchSteps from './MatchSteps';
import ActivityNewUsers from './ActivityNewUsers';
class HomeLeft extends React.Component {

    render() {
        return (
            <div className="rb-home-left">
                <MatchSteps />
                <ActivityNewUsers/>
            </div>
        )

    }
}



export default HomeLeft;
