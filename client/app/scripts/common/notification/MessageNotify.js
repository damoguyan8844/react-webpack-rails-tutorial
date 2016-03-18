import React from 'react';
import Notify from './Notify.js';

var MessageNotify = React.createClass({
    getDefaultProps :function(){
        return {

        }
    },
    getInitialState:function(){
        return {

        }
    },

    close: function(e){
    },
    render: function() {
       return (

            <Notify {...this.props}>
                <a className="message">
                    <img className="pull-left" src={this.props.options.avatarUrl}></img>
                    <div className="pull-left">
                        <div className="title ellipsis">{this.props.options.title}</div>
                        {
                            !this.props.options.locked && 
                            <div className="message-body ellipsis-2line">
                                <span className="name">{this.props.options.userName}&nbsp;:&nbsp;</span>
                                <span className="body ">{this.props.options.message}</span>
                            </div>
                        }
                    </div>
                </a>
            </Notify>

        )
    }
});

export default MessageNotify;