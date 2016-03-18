var React = require('react');
var ReactDOM = require('react-dom');

var RBCheckBox = React.createClass({
    getInitialState:function(){
        return {
            isChecked: this.props.checked,
            isBold : false
        }
    },
    onChange:function(){
        this.props.onChange && this.props.onChange(this.props.name,this.props.value,!this.state.isChecked);
        this.setState({isChecked:!this.state.isChecked});
    },
    render:function(){
        return(
          <div className="rb-checkbox-wrapper">
            <input type="checkbox" className="rb-checkbox" id={this.props.checkboxId} checked={!this.props.isNoPreference && this.state.isChecked} title={this.props.name} disabled={this.props.disabled} value={this.props.value} onChange={this.onChange} />
            <label className="rb-checkbox-label" htmlFor={this.props.checkboxId} style={{ fontWeight: this.props.isBold ? "bold" : "normal" }}>
              {this.props.checkboxLabel}
            </label>
          </div>
        )
    }
});

export default RBCheckBox;
