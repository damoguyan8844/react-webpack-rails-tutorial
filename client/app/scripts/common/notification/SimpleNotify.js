import React from 'react';
import Notify from './Notify.js';

var SimpleNotify = React.createClass({
    getDefaultProps :function(){
        return {

        }
    },
    getInitialState:function(){
        return {

        }
    },
    render: function() {
        return (

            <Notify {...this.props}>
                <div className="simple">
                    <div className="title ellipsis">{this.props.options.title}</div>
                    <div className="description ellipsis-2line">{this.props.options.description}</div>

                </div>
            </Notify>

        )
    }
});

export default SimpleNotify;