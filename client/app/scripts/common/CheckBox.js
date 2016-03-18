var React = require('react');
var ReactDOM = require('react-dom');

var CheckBox = React.createClass({
    getInitialState:function(){
        return {
            isChecked: this.props.checked
        }
    },
    onChange:function(){
        this.props.onChange(this.props.name,this.props.value,!this.state.isChecked);
        this.setState({isChecked:!this.state.isChecked});
    },
    render:function(){

        return(
            this.props.disabled ?
            <input type="checkbox" checked={this.state.isChecked} title={this.props.name} disabled={this.props.disabled} value={this.props.value} onChange={this.onChange} /> :
             <input type="checkbox" checked={this.state.isChecked} title={this.props.name} value={this.props.value} onChange={this.onChange} />
        )
    }
});

export default CheckBox;
