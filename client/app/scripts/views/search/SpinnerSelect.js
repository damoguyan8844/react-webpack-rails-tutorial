var React = require('react');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var SpinnerSelect = React.createClass({displayName: 'exports',

  getInitialState:function(){
    return {
        showHeight: false
    }
  },
  toggleHeightDropdown:function(){
      this.setState({ showHeight: !this.state.showHeight });
  },
  render: function () {

    return (
      <div className={"search_wrapper-dropdown js-dropdown" + (this.state.showHeight ? " active":"")}>
        <div className="search_span_wrapper" onClick={this.toggleHeightDropdown}>
          <span className="search_span search_span_adv"> {this.props.spinnerLabel} </span>
            <div style={{display: this.props.onRemoveItem ? "block" : "none" }} className = 'adv_close' onClick = {this.props.onRemoveItem}>
            <svg width="12px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
            </svg>
          </div>
        </div>
          <ul className="search_panel_list dropdown" >
              <div className="input-group spinner">
                  <input type="text" className="form-control search_ages_input" value={this.props.minValue} />
                  <div className="search_input-group_btn-vertical">
                      <button className="btn btn-default search_btn-vertical" type="button" onClick={this.props.increaseMin}>
                      <svg className="arrow-up" width="8px" height="5px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <g id="-Search" stroke="none" fill="none" fill-rule="evenodd">
                              <g id="search----main-paged-nav" transform="translate(-194.000000, -205.000000)" fill="#FFFFFF">
                                  <g id="filters-copy"  transform="translate(17.000000, 74.000000)">
                                      <g id="svg-20" transform="translate(88.000000, 85.000000)">
                                          <g id="max" transform="translate(62.000000, 40.000000)">
                                              <g id="up-down" transform="translate(27.000000, 6.000000)">
                                                  <path d="M0,0.222222222 L7.91674074,0.222222222 L3.95837037,4.4631746 L0,0.222222222 Z" id="arrow-2" transform="translate(4.000000, 2.444444) scale(1, -1) translate(-4.000000, -2.444444) "></path>
                                              </g>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </svg>
                      </button>
                      <button className="btn btn-default search_btn-vertical" type="button" onClick={this.props.decreaseMin}>
                          <svg className="arrow-down" width="8px" height="5px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <g id="-Search" stroke="none" fill="none" fill-rule="evenodd">
                                  <g id="search----main-paged-nav" transform="translate(-194.000000, -215.000000)" fill="#FFFFFF">
                                      <g id="filters-copy" transform="translate(17.000000, 74.000000)">
                                          <g id="svg-21" transform="translate(88.000000, 85.000000)">
                                              <g id="max" transform="translate(62.000000, 40.000000)">
                                                  <g id="up-down" transform="translate(27.000000, 6.000000)">
                                                      <path d="M0,10.2222222 L7.91674074,10.2222222 L3.95837037,14.4631746 L0,10.2222222 Z" id="arrow486"></path>
                                                  </g>
                                              </g>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </svg>
                      </button>
                  </div>
              </div>
              <div className="search_ages_divider">-</div>
              <div className="input-group spinner">
                  <input type="text" className="form-control search_ages_input" value={this.props.maxValue}/>
                  <div className="search_input-group_btn-vertical">
                      <button className="btn btn-default search_btn-vertical" type="button" id="bn-i-ageend" onClick={this.props.increaseMax }>
                          <svg className="arrow-up" width="8px" height="5px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <g id="-Search" stroke="none" fill="none" fill-rule="evenodd">
                                  <g id="search----main-paged-nav" transform="translate(-194.000000, -205.000000)" fill="#FFFFFF">
                                      <g id="filters-copy"  transform="translate(17.000000, 74.000000)">
                                          <g id="svg-20" transform="translate(88.000000, 85.000000)">
                                              <g id="max" transform="translate(62.000000, 40.000000)">
                                                  <g id="up-down" transform="translate(27.000000, 6.000000)">
                                                      <path d="M0,0.222222222 L7.91674074,0.222222222 L3.95837037,4.4631746 L0,0.222222222 Z" id="arrow-2" transform="translate(4.000000, 2.444444) scale(1, -1) translate(-4.000000, -2.444444) "></path>
                                                  </g>
                                              </g>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </svg>
                      </button>
                      <button className="btn btn-default search_btn-vertical" type="button" id="bn-d-ageend" onClick={this.props.decreaseMax}>
                          <svg className="arrow-down" width="8px" height="5px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <g id="-Search" stroke="none" fill="none" fill-rule="evenodd">
                                  <g id="search----main-paged-nav" transform="translate(-194.000000, -215.000000)" fill="#FFFFFF">
                                      <g id="filters-copy" transform="translate(17.000000, 74.000000)">
                                          <g id="svg-21" transform="translate(88.000000, 85.000000)">
                                              <g id="max" transform="translate(62.000000, 40.000000)">
                                                  <g id="up-down" transform="translate(27.000000, 6.000000)">
                                                      <path d="M0,10.2222222 L7.91674074,10.2222222 L3.95837037,14.4631746 L0,10.2222222 Z" id="arrow486"></path>
                                                  </g>
                                              </g>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </svg>
                      </button>
                  </div>
              </div>
          </ul>
      </div>
    )
  }
});

export default injectIntl(SpinnerSelect);
