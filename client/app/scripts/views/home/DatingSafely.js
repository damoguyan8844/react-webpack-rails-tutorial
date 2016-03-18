require('../../styles/datingsafely.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import HomeRight from './HomeRight';
import {connect} from 'react-redux';

class DatingSafely extends React.Component {
    componentWillUnmount() {

    }

    render() {
        var lang = this.props.overview.locale == "en" ? "en" : this.props.overview.locale == "zh-CN" ? "cn" : "tw";
        return (
            <div className="rb-dating-safety">
                <div className="dating-safety">
                    <div className={"type_1_" + lang }></div>
                    <div className={"type_2_" + lang }></div>
                    <div className={"type_3_" + lang }></div>
                </div>
                <HomeRight />
                <div style={{clear:"both"}}></div>
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        overview:state.me.overview
    }
}
DatingSafely = connect(mapStateToProps)(DatingSafely)
export default DatingSafely;