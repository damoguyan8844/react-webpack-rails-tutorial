import React from 'react';
import classNames from 'classnames';

export class MinimalistScrollbar extends React.Component {
  constructor (props) {
    super(props)
    this.handleScrollWheel = this.handleScrollWheel.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.isUpdating = this.isUpdating.bind(this)
    this.state = {
      deltaY: 0
    }
    this.isScrolling = false
  }
  handleScrollWheel(e) {
    this.setState({deltaY: e.deltaY})
    this.isScrolling = true 
  }

  handleMouseEnter(e) {
    console.log("handleMouseOver")
    this.setState({deltaY: 0})
    this.isScrolling = true
  }

  handleMouseLeave(e) {
    console.log('handleMouseLeave')
    const scrollbar = document.getElementsByClassName('scrollbar')[0]
    scrollbar.style.display = 'none'
  }

  isUpdating() {
    return this.isScrolling
  }

  componentDidUpdate() {
    // TODO: position scrollbar on top by default (done)
    // TODO: prevent scrollbar from disappearing if user programmatically sets scrollTop
    // TODO: don't update upon scroll if scrollbar is not visible (done)
    // console.log("componentDidUpdate")
    const container = document.getElementsByClassName('min-scrollbar-container')[0]
    const scrollbar = document.getElementsByClassName('scrollbar')[0]

    scrollbar.style.top = '0px'
    const deltaY = this.isScrolling ? this.state.deltaY : 0
    const ratio = container.clientHeight / container.scrollHeight 
    const containerOffset = container.scrollHeight - container.clientHeight

    
    scrollbar.style.display = 'block'
    if (containerOffset === 0) {
      scrollbar.style.display = 'none'
    }
    const scrollbarHeight = ratio * container.clientHeight
    const scrollbarOffset = ((1-ratio) * container.clientHeight)

    // update scrollbar
    container.scrollTop += deltaY 
    const offsetFraction = container.scrollTop / containerOffset
    scrollbar.style.height = (scrollbarHeight) + "px"
    scrollbar.style.top = (this.isScrolling ? (container.scrollTop + (scrollbarOffset * offsetFraction)) : 0) + "px"

    this.isScrolling = false
  }
  render () {
    return (
      <div 
        {...this.props}
        className={ this.props.className + ' min-scrollbar-container' }
        onWheel={this.handleScrollWheel}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          position: 'relative',
          overflowY: 'hidden'
        }}>
        <div 
          style={{
            position: 'absolute',
            width: 6,
            backgroundColor: 'red',
            top: 0,
            right: 2,
            cursor: 'pointer',
            borderRadius: 5,
            opacity: 0.5
          }} 
          className='scrollbar min-scrollbar' />
        {this.props.children}
      </div>
    )
  }
}