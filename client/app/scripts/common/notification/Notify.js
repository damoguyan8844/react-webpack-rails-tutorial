import React from 'react';

var Notify = React.createClass({
    getDefaultProps :function(){
        return {

        }
    },
    getInitialState:function(){
        return {

        }
    },
    onClickAction: function(e) {
        if (this.props.options.onClickAction) {
            this.props.options.onClickAction();
            this.props.onClose(this.props.index, e);
        }
    },
    close: function(e){
        e.stopPropagation();
        this.props.onClose && this.props.onClose(this.props.index, e);
    },
    render: function() {
        var cls = 'rb-notify-item animated';
        if(this.props.deleting){
            cls +=' fadeOut';
        }else{
            cls += ' fadeInDown'
        }
        return (
                <div onClick={this.onClickAction} className={cls}>
                    <button type="button" onClick={this.close} className="close icon-button-close" ></button>

                    {this.props.children}

                </div>

        )
    }
});

export default Notify;