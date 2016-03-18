var React = require('react');
var ReactDOM = require('react-dom');
import Select from 'react-select';

var SelectWrap = React.createClass({
    getInitialState:function(){
        return {
            value: this.props.value
        }
    },
    onChange:function(value,opt){
        this.props.onChange(value,opt[0].label);
        this.setState({value:value})
    },
    render:function(){
        var isInclude = false,value=this.state.value;
        (this.props.options!==undefined) && this.props.options.map(function(opt,i){
            if(i==0){
                value = opt.value;
            }
            if(this.state.value.toString() == opt.value){
                isInclude = true;
                return;
            }
        }.bind(this));
        if(isInclude){
            value=this.state.value;
        }
        return(
            <Select value={value} placeholder="" matchProp="value" allowCreate={false} clearable={false} searchable={false} onChange={this.onChange} options={this.props.options} />
        )
    }
});

export default SelectWrap;
