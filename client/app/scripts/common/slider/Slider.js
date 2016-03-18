

import React, { PropTypes, Component } from 'react';
var ReactDOM = require('react-dom');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function maxmin(pos, min, max) {
    if (pos < min) { return min; }
    if (pos > max) { return max; }
    return pos;
}

function joinClasses(className/*, ... */) {
    if (!className) {
        className = '';
    }
    var nextClass;
    var argLength = arguments.length;
    if (argLength > 1) {
        for (var ii = 1; ii < argLength; ii++) {
            nextClass = arguments[ii];
            if (nextClass) {
                className = (className ? className + ' ' : '') + nextClass;
            }
        }
    }
    return className;
}

const constants = {
    orientation: {
        horizontal: {
            dimension: 'width',
            direction: 'left',
            coordinate: 'x'
        },
        vertical: {
            dimension: 'height',
            direction: 'top',
            coordinate: 'y'
        }
    }
};

var Slider = React.createClass({
     propTypes : {
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        value: PropTypes.number,
        orientation: PropTypes.string,
        onChange: PropTypes.func,
        className: PropTypes.string
    },


    getDefaultProps:function(){
        return {
            min: 0,
            max: 100,
            step: 1,
            value: 0,
            orientation: 'horizontal'
        }
    },

    getInitialState:function(){
        console.log('disabled', this.props.disabled);
        return {
            limit: 0,
            grab: 0,
            value:this.props.value
        }
    },


    // Add window resize event listener here
    componentDidMount:function() {
        let { orientation } = this.props;
        let dimension = capitalize(constants.orientation[orientation].dimension);
        const sliderPos = ReactDOM.findDOMNode(this.refs.slider)['offset' + dimension];
        const handlePos = ReactDOM.findDOMNode(this.refs.handle)['offset' + dimension]
        this.setState({
            limit: sliderPos - handlePos,
            grab: handlePos / 2
        });
    },

    handleSliderMouseDown :function(e) {
        let value, { onChange } = this.props;
        if (!onChange) return;

        value = this.position(e);
        this.setState({value:value});
        onChange && onChange(value);
    },

    handleKnobMouseDown :function(){
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
    },

    handleDrag :function(e){
        let value, { onChange } = this.props;
        if (!onChange) return;

        value = this.position(e);
        this.setState({value:value});
        onChange && onChange(value);
        console.log(value);
    },

    handleDragEnd :function() {
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
    },

    handleNoop :function(e) {
        e.stopPropagation();
        e.preventDefault();
    },

    getPositionFromValue :function(value) {
        let percentage, pos;
        let { limit } = this.state;
        let { min, max } = this.props;
        percentage = (value - min) / (max - min);
        pos = Math.round(percentage * limit);

        return pos;
    },

    getValueFromPosition :function(pos) {
        let percentage, value;
        let { limit } = this.state;
        let { orientation, min, max, step } = this.props;
        percentage = (maxmin(pos, 0, limit) / (limit || 1));

        if (orientation === 'horizontal') {
            value = step * Math.round(percentage * (max - min) / step) + min;
        } else {
            value = max - (step * Math.round(percentage * (max - min) / step) + min);
        }

        return value;
    },

    position :function(e){
        let pos, value, { grab } = this.state;
        let { orientation } = this.props;
        const node = ReactDOM.findDOMNode(this.refs.slider);
        const coordinateStyle = constants.orientation[orientation].coordinate;
        const directionStyle = constants.orientation[orientation].direction;
        const coordinate = e['client' + capitalize(coordinateStyle)];
        const direction = node.getBoundingClientRect()[directionStyle];

        pos = coordinate - direction - grab;
        value = this.getValueFromPosition(pos);

        return value;
    },

    coordinates :function(pos) {
        let value, fillPos, handlePos;
        let { limit, grab } = this.state;
        let { orientation } = this.props;

        value = this.getValueFromPosition(pos);
        handlePos = this.getPositionFromValue(value);

        if (orientation === 'horizontal') {
            fillPos = handlePos + grab;
        } else {
            fillPos = limit - handlePos + grab;
        }

        return {
            fill: fillPos,
            handle: handlePos
        };
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({value:nextProps.value});
    },
    render:function() {
        let dimension, direction, position, coords, fillStyle, handleStyle;
        let { value, orientation, className } = this.props;

        value = this.state.value;


        dimension = constants.orientation[orientation].dimension;
        direction = constants.orientation[orientation].direction;

        position = this.getPositionFromValue(value);
        coords = this.coordinates(position);

        fillStyle = {[dimension]: `${coords.fill}px`};
        handleStyle = {[direction]: `${coords.handle}px`};

        var cls = joinClasses('rangeslider ', 'rangeslider-' + orientation, className);
        if(this.props.disabled){
            cls += ' disabled'
        }
        console.log('props ', this.props.disabled);
        return (
            <div
                ref="slider"
                className={cls}
                onMouseDown={this.handleSliderMouseDown}
                onClick={this.handleNoop}>
                <div
                    ref="fill"
                    className="rangeslider__fill"
                    style={fillStyle} />
                <div
                    ref="handle"
                    className="rangeslider__handle"
                    onMouseDown={this.handleKnobMouseDown}
                    onClick={this.handleNoop}
                    style={handleStyle} />
            </div>
        );
    }
});

export default Slider;
