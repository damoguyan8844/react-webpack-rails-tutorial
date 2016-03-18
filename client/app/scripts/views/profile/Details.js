var React = require('react');
var ReactDOM = require('react-dom');

import {connect} from 'react-redux';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Overlay from 'react-bootstrap/lib/Overlay';

var DetailItem = React.createClass({
    render:function(){
        var data = this.props.data;
        var valueStr;
        if(data && data.value && data.value != ''){
            valueStr = data.text?data.text:data.value;
        }
        else if(data && data.values && data.values.length>0){
            var vs = data.values.map(function(v){
                return v.text?v.text:v.value;
            })
            valueStr = vs.join(',');
        }
        if(valueStr){
            return (
                <li className="details-more_item" key={data.label}><span>{data.label}</span> <span className="detail-content pull-right">{valueStr}</span></li>
            )
        }else{
            return null;
        }
    }
})

var Details = React.createClass({
    render: function() {
        var title = "Sort: Normal";
        var items = [];
        for(var p in this.props.detail){
            var block = this.props.detail[p];
            for(var q in block){
                items.push(
                    <DetailItem data={block[q]} />

                )
                console.log(block[q]);
            }
        }
        return(

            <div className="details-more more">
                <div className="details-more_sort">
                    <DropdownButton bsStyle="default"   title={title} id="dropdown-profile-details-sort" >
                        <MenuItem key="1" eventKey="1">Normal</MenuItem>
                        <MenuItem key="2" eventKey="2">Star</MenuItem>
                        <MenuItem key="3" divider />
                        <MenuItem key="4" eventKey="3">Name</MenuItem>
                    </DropdownButton>
                </div>

                <div className="details-more_info">
                    <ul>
                        {items}
                    </ul>
                </div>
            </div>

        )
    }
});

function mapStateToProps(state){
    return {
        detail:state.user.detail
    }
}

Details = connect(mapStateToProps)(Details);

export default Details;
