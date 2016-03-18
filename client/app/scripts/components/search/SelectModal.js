import React, { Component, PropTypes } from 'react'
var ReactDOM = require('react-dom');
import Select from 'react-select';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';


var ListItemWrapper = React.createClass({

  render: function() {
    return <li
      onClick = {this.props.onClick}
      >{this.props.data.label}</li>;
  }
});

var SelectModal = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      current_value: "undefined"
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleClick(index){
    this.setState({current_value : this.props.options[index].label});
    this.props.onChange(this.state.current_value);
    this.close()
  },

  render() {

    return (
      <div>
        <a className="select-button" onClick={this.open}>
          { (this.state.current_value === "undefined") ? this.props.placeholder : this.state.current_value }<span className="select-button-arrow">▼</span>
        </a>
        <Modal dialogClassName="select-modal" show={this.state.showModal} onHide={this.close} container={this}>
          <Modal.Body>
            <div className="select-modal-container">
            <ul>
              {this.props.options.map(function(option, index) {
                return <ListItemWrapper
                  key={index}
                  data={option}
                  onClick={this.handleClick.bind(this,index)}
                  />;
              }, this)}
            </ul>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
});

export default SelectModal;
