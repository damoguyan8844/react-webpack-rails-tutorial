
import React from 'react';
import ReactDOM from 'react-dom';
import MessageNotify from './MessageNotify.js';
import SimpleNotify from './SimpleNotify.js';

var NotifyContainer = React.createClass({
    getDefaultProps :function(){
        return {

        }
    },
    getInitialState:function(){
        return {

        }
    },
    onClose:function(index,e){
        console.log('close notify' + index +e);
        deleteNotify(index);
    },
    render: function() {
        var list = this.props.notifies.map(function(n, index){
            switch (n.type){
                case 'message':
                    return <MessageNotify deleting={index == this.props.deletingIndex} onClose={this.onClose} index={index} key={index} options={n.options}/>;
                default:
                    return <SimpleNotify deleting={index == this.props.deletingIndex} onClose={this.onClose} index={index} key={index} options={n.options}/>
            }
        }.bind(this));
        return (
            <ul className="rb-notify-wrapper ">
            {list.reverse()}
            </ul>
        )
    }
});
var totalNum = 0;
var notifies = [];
function deletingNotify(index){
    ReactDOM.render(<NotifyContainer deletingIndex={index} notifies={notifies}/>, document.getElementById('rb-notifications'))
}
function deleteNotify(index){
    if(index>=0 && index <notifies.length){
        deletingNotify(index);
        var tid = setTimeout(function(index){
            delete notifies[index];
            ReactDOM.render(<NotifyContainer notifies={notifies}/>, document.getElementById('rb-notifications'))
        },700,index);

    }
}
function addNotify(type, options){
    var item = {
        type:type,
        options:options,
        key:totalNum++
    };
    var tid = setTimeout(function(item){
        if(notifies.indexOf(item)!= -1){
            deleteNotify(notifies.indexOf(item));
            clearTimeout(tid);
        }
    },6000,item)
    notifies.push(item);
    ReactDOM.render(<NotifyContainer notifies={notifies}/>, document.getElementById('rb-notifications'))
}
module.exports = {
    notify: function(type, options) {

        addNotify(type,options);
    },
    addNotify: function(type, options) {
        return "Hola";
    }
};