"use strict"

var React = require('react')

var div = React.createElement.bind(null, 'div')
var button = React.createElement.bind(null, 'button')
var a = React.createElement.bind(null, 'a')
var select = React.createElement.bind(null, 'select')
var option = React.createElement.bind(null ,'option')
var label = React.createElement.bind(null, 'label')
var span = React.createElement.bind(null, 'span')
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var idInc = 0

var keyHandlers = {
    38: 'handleUpKey',
    40: 'handleDownKey',
    32: 'handleSpaceKey',
    13: 'handleEnterKey',
    27: 'handleEscKey',
    74: 'handleDownKey',
    75: 'handleUpKey'
}

function interceptEvent(event) {
    if (event) {
        event.preventDefault()
        event.stopPropagation()
    }
}

var MultiSelect = React.createClass({displayName: 'exports',
    getInitialState: function () {
        return {
            id: 'react-select-box-' + (++idInc),
            open: false,
            focusedIndex: -1,
            pendingValue: [],
            isClose:false
        }
    },

    getDefaultProps: function () {
        return {
            closeText: 'Close'
        }
    },

    changeOnClose: function () {
        return this.isMultiple() && String(this.props.changeOnClose) === 'true'
    },

    updatePendingValue: function (value, cb) {
        if (this.changeOnClose()) {
            this.setState({pendingValue: value}, cb)
            return true
        }
        return false
    },

    componentWillMount: function () {
        this.updatePendingValue(this.props.value)
    },

    componentWillReceiveProps: function (next) {
        this.updatePendingValue(next.value)
    },

    clickingOption: false,

    blurTimeout: null,

    handleFocus: function () {
        clearTimeout(this.blurTimeout)
    },

    handleBlur: function (p) {
        clearTimeout(this.blurTimeout);
        this.blurTimeout = setTimeout(this.handleClose, 0);
        if(this.state.open)
            this.setState({
                isClose:true
            });
    },
    onBlur: function () {
        //clearTimeout(this.blurTimeout);
        //this.blurTimeout = setTimeout(this.handleClose, 0);
        if(this.state.open)
            this.setState({
                open:false
            });
    },

    handleMouseDown: function() {
        this.clickingOption = true
    },

    handleChange: function (val, cb) {

        return function (event) {
            this.clickingOption = false
            interceptEvent(event)
            if (this.isMultiple()) {
                var selected = []
                if (val != null) {
                    selected = this.value().slice(0)
                    var index = selected.indexOf(val)
                    if (index !== -1) {
                        selected.splice(index, 1)
                    } else {
                        selected.push(val)
                    }
                }
                this.updatePendingValue(selected, cb) || this.props.onChange(selected)
            } else {
                console.log("handleChange");
                this.updatePendingValue(val, cb) || this.props.onChange(val)
                this.handleClose()
                this.refs.button.focus()
            }
        }.bind(this)
    },

    handleNativeChange: function (event) {
        var val = event.target.value
        if (this.isMultiple()) {
            var children = [].slice.call(event.target.childNodes, 0)
            val = children.reduce(function (memo, child) {
                if (child.selected) {
                    memo.push(child.value)
                }
                return memo
            }, [])
        }
        this.props.onChange(val)
    },

    handleClear: function (event) {
        interceptEvent(event)
        this.handleChange(null, function () {
            // only called when change="true"
            this.props.onChange(this.state.pendingValue)
        })(event)
    },

    toggleOpenClose: function (event) {
        interceptEvent(event)
        this.setState({open: !this.state.open});
        if(this.state.open) {
            return this.setState({open: false})
        }

        this.handleOpen()
    },

    handleOpen: function (event) {
        interceptEvent(event)
        this.setState({open: true}, function () {
            //this.refs.menu.getDOMNode().focus()
        })
    },

    handleClose: function (event) {
        interceptEvent(event)
        console.log("handleClose");
        if(!this.clickingOption) {
            this.setState({open: false, focusedIndex: -1})
        }
        if (this.changeOnClose()) {
            this.props.onChange(this.state.pendingValue)
        }
    },


    moveFocus: function (move) {
        var len = React.Children.count(this.props.children)
        var idx = (this.state.focusedIndex + move + len) % len
        this.setState({focusedIndex: idx})
    },

    handleKeyDown: function (event) {
        if (keyHandlers[event.which]) {
            this[keyHandlers[event.which]](event)
        }
    },

    handleUpKey: function (event) {
        interceptEvent(event)
        this.moveFocus(-1)
    },

    handleDownKey: function (event) {
        interceptEvent(event)
        if (!this.state.open) {
            this.handleOpen(event)
        }
        this.moveFocus(1)
    },

    handleSpaceKey: function (event) {
        interceptEvent(event)
        if (!this.state.open) {
            this.handleOpen(event)
        } else if (this.state.focusedIndex !== -1) {
            this.handleEnterKey()
        }
    },

    handleEnterKey: function (event) {
        if (this.state.focusedIndex !== -1) {
            this.handleChange(this.options()[this.state.focusedIndex].value)(event)
        }
    },

    handleEscKey: function (event) {
        console.log("handleEscKey");
        if (this.state.open) {
            this.handleClose(event)
        } else {
            this.handleClear(event)
        }
    },

    label: function () {
        const {formatMessage} = this.props.intl;
        var selected = this.options()
            .filter(function (option) {
                return this.isSelected(option.value)
            }.bind(this))
            .map(function (option) {
                return option.label
            })
        return selected.length > 0 ? (selected.length ==this.props.options.length ? formatMessage({id:"all"}) : selected.join(', ')) : this.props.label
    },

    isMultiple: function () {
        return String(this.props.multiple) === 'true'
    },
    isNotInculdeLabel: function(){
        return String(this.props.includeLabel) === 'true'
    },
    isNotIncludeClose: function () {
        return String(this.props.includeClose) === 'true'
    },

    options: function () {
        /*var options = []
        React.Children.forEach(this.props.children, function (option) {
            options.push({
                value: option.props.value,
                label: option.props.children
            })
        })
        return options */
        return this.props.options;
    },

    value: function () {
        var value = this.changeOnClose() ?
            this.state.pendingValue :
            this.props.value

        if (!this.isMultiple() || Array.isArray(value)) {
            return value
        } if (value != null) {
            return [value]
        }
        return []
    },

    hasValue: function () {
        if (this.isMultiple()) {
            return this.value().length > 0
        }
        return this.value() != null
    },

    isSelected: function (value) {
        if (this.isMultiple()) {
            return this.value().indexOf(value) !== -1
        }
        return this.value() === value
    },
    removeItem:function(){

        this.props.onRemoveItem(this.props.item);
    },
    render: function () {
        var className = 'react-select-box-container'
        if (this.props.className) {
            className += ' ' + this.props.className
        }
        if (this.isMultiple()) {
            className += ' react-select-box-multi'
        }
        if (!this.hasValue()) {
            className += ' react-select-box-empty'
        }

        return (
            div(
                {
                    onKeyDown: this.handleKeyDown,
                    className: className
                },
                div(
                    {
                        id: this.state.id,
                        ref: 'button',
                        className: 'react-select-box',
                        onClick: this.toggleOpenClose,
                        onBlur: this.handleBlur.bind(null,"1"),
                        tabIndex: '0',
                        'aria-hidden': true
                    },
                    this.renderLabel(),
                    div({className: 'react-select-box-label'},  this.label())
                ),
                (this.isNotIncludeClose() ? '' : div({className: 'adv_close',
                     onClick: this.removeItem
                }, <svg width="12px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="-Search" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                <g id="main-paged-nav" transform="translate(-237.000000, -248.000000)" strokeLinecap="square" stroke="#A9A9A9" strokeWidth="2">
                    <g id="filters-copy" transform="translate(17.000000, 74.000000)">
                        <g id="advanced" transform="translate(90.000000, 163.000000)">
                            <g id="filter:-sign">
                                <g id="close-dark" transform="translate(131.000000, 13.000000)">
                                    <path d="M0.587061466,0.278838042 L9.49839033,9.20165538" id="Line"></path>
                                    <path d="M9.49839033,0.278838042 L0.587061466,9.20165538" id="Line-2"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            </svg>)),
                this.renderOptionMenu(),
                this.renderNativeSelect()
            )
        )
    },
    renderLabel:function(){
        if(!this.isNotInculdeLabel() && this.props.item !== undefined)
            return div({className: 'react-select-box-item-label'}, this.props.item.label +":")
    },
    renderNativeSelect: function () {
        var id = this.state.id + '-native-select'
        var multiple = this.isMultiple()
        var empty = multiple ? null : option({key: '', value: ''}, 'No Selection')
        var options = [empty].concat(this.props.children)
        return div(
            {className: 'react-select-box-native'},
            label({htmlFor: id}, this.props.label),
            select({
                id: id,
                multiple: multiple,
                onKeyDown: function (e) { e.stopPropagation() },
                value: this.props.value || (multiple ? [] : ''),
                onChange: this.handleNativeChange
            }, options)

        )

    },

    renderOptionMenu: function () {
        var className = 'react-select-box-options'
        if (!this.state.open) {
            className += ' react-select-box-hidden'
        }
        /*
         var active = null
         if (this.state.focusedIndex !== -1) {
         active = this.state.id + '-' + this.state.focusedIndex
         }
         */
        return div(
            {
                className: className,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                'aria-hidden': true,
                ref: 'menu',
                tabIndex: 0
            },
            div(
                {
                    className: 'react-select-box-off-screen'
                },
                this.options().map(this.renderOption)
            )//,
            //this.renderCloseButton()
        )
    },

    renderOption: function (option, i) {
        var className = 'react-select-box-option'
        if (i === this.state.focusedIndex) {
            className += ' react-select-box-option-focused'
        }
        if (this.isSelected(option.value)) {
            className += ' react-select-box-option-selected'
        }
        return a(
            {
                id: this.state.id + '-' + i,
                href: '#',
                onClick: this.handleChange(option.value),
                onMouseDown: this.handleMouseDown,
                className: className,
                tabIndex: -1,
                key: option.value,
                onBlur: this.handleBlur.bind(null,"3"),
                onFocus: this.handleFocus
            },
            option.label
        )
    },

    renderClearButton: function () {
        if (this.hasValue()) {
            return button({
                className: 'react-select-box-clear',
                'aria-hidden': true,
                onClick: this.handleClear
            })
        }
    },

    renderCloseButton: function () {
        if (this.isMultiple() && this.props.closeText) {
            return button(
                {
                    onClick: this.handleClose,
                    className: 'react-select-box-close',
                    onBlur: this.handleBlur.bind(null,"4"),
                    onFocus: this.handleFocus
                },
                this.props.closeText
            )
        }
    }
});

export default injectIntl(MultiSelect);
