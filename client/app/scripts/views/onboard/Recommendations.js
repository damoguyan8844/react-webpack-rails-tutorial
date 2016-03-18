var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var Recommendations = React.createClass({
    mixins: [IntlMixin],


    render: function(){
        return (
            <div className="recommendations">
                <div className="title">Recommendations</div>
                <div className="content">We need to know more about you to give good recommendations. The more you answer, the more recommendations you’ll be able to get.</div>
                <div className="bn-begin">Let’s begin</div>
            </div>
        )
    }
});

export default Recommendations;
