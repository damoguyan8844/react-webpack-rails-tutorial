

var React = require('react');
var ReactDOM = require('react-dom');
import queryString from 'query-string';


import { History } from 'react-router';



var Login = React.createClass({
    mixins: [History],

    render: function() {
        return(
            <div className="rb-notfound">
                <div>
                    <h1>
                    Your request can't be found!
                    </h1>
                </div>

            </div>
        )
    }
});

export default Login;
