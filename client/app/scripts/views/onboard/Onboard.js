require('../../styles/views/Onboard');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
import Recommendations from './Recommendations.js';

var Onboard = React.createClass({
    mixins: [IntlMixin],


    render: function(){
        return (
            <div className="rb-onboard">
                <Recommendations />
            </div>
        )
    }
});

export default Onboard;