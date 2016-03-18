var React = require('react');
var ReactDOM = require('react-dom');
import {injectIntl,defineMessages,FormattedMessage} from 'react-intl';

var Paginator = React.createClass({
    propTypes: {
        //max: React.PropTypes.number.isRequired,
        //maxVisible: React.PropTypes.number,
        //onChange: React.PropTypes.func.isRequired
    },
    componentDidUpdate: function(prevProps, prevState) {
        //if (prevState.currentPage !== this.state.currentPage) {
        //    this.props.onChange(this.state.currentPage);
        //}
    },
    getDefaultProps: function() {
        return {
            maxVisible: 5
        };
    },
    getInitialState: function() {
        return {
            currentPage: 1,
            items: []
        };
    },
    goTo: function(page) {
        this.setState({currentPage: page});
    },

    onClickNext: function() {
        this.props.onClickNext();
        //var page = this.state.currentPage;

        //if (page < this.props.max) {
        //    this.goTo(page + 1);
        //}
    },
    onClickPrev: function() {
        this.props.onClickPrev();
        //if (this.state.currentPage > 1) {
        //    this.goTo(this.state.currentPage - 1);
        //}
    },
    render: function() {
        const {formatMessage} = this.props.intl;
        var className = this.props.className || '',
            p = this.props,
            s = this.state,
            skip = 0;

        if (s.currentPage > p.maxVisible - 1 && s.currentPage < p.max) {
            skip = s.currentPage - p.maxVisible + 1;
        } else if (s.currentPage === p.max) {
            skip = s.currentPage - p.maxVisible;
        }

        var iterator = Array.apply(null, Array(p.maxVisible)).map(function(v, i) {
            return skip + i + 1;
        });
        console.log(s.currentPage)
        console.log(p.max)
        return (
            <div>
                <ul className={'pagination' + className}>
                    {this.props.currentPage === 1 ? "":
                    <li className="pagination_item">
                        <a href="#" onClick={this.onClickPrev} className="pagination_link">
                            <span className="pagination_span" aria-hidden="true">&lt;</span>
                            <span className="sr-only-w pagination_span">{formatMessage({id:'pre_page'}) }</span>
                        </a>
                    </li>}
                    {
                        this.props.isShowNum &&
                        iterator.map(function(page) {
                        return (
                            <li key={page}
                                onClick={this.goTo.bind(this, page)}>
                                <a href="#" className={s.currentPage === page ? 'current_page' : ''}>{page}</a>
                            </li>
                        );
                    }, this)}
                    {
                        p.currentPage === p.max ? "" :
                            <li className="pagination_item">
                                <a href="#" onClick={this.onClickNext} className="pagination_link">
                                    <span className="sr-only-w pagination_span">{formatMessage({id:'next_page'}) }</span>
                                    <span className="pagination_span" aria-hidden="true">&gt;</span>
                                </a>
                            </li>
                    }
                </ul>
            </div>
        );
    }
});

export default injectIntl(Paginator);
