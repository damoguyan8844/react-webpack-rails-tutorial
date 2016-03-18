import React, { Component } from 'react';

export default class CheckBox extends Component {
    render() {
        return (
            <div
                className="rb-checkbox-wrapper"
                onClick = {this.props.onClick}>
                <input
                    type="checkbox"
                    className="rb-checkbox"
                    id={this.props.key}
                    checked={this.props.checked}
                    title={this.props.key}
                    disabled={this.props.disabled} />
                  <label className="rb-checkbox-label" htmlFor={this.props.key}>
                  {this.props.label}
                </label>
            </div>
        )
    }
}
