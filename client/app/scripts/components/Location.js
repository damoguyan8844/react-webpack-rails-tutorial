var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var Login = React.createClass({
    mixins: [IntlMixin],
    getInitialState:function(){
        return {
            isShowZip: true,
            isExpand:false,
            isShowCity:false
        }
    },
    changeCountry:function(value){
        if(value == "158")
        {

        }
    },
    getCityByZip:function(){

    },
    render:function(){
        var cls = this.state.isExpand ? "class-expand": "class-expand active";
        var nav_cls = this.state.isExpand ? "detail-nav active": "detail-nav";
        var items = objToArray(this.props.iterms.value);
        var subhtml = items.map(function(sub_i){
            return(
                this.layoutItem(sub_i.name,sub_i.value,layout_item_map[sub_i.name])
            )

        }.bind(this));

        return (
            <div>
                <ul className="class-item">{this.getIntlMessage(this.props.iterms.name)}<div className={nav_cls}><span className={cls} onClick={this.toggleItemClass}></span></div></ul>
                <ul className="edit-item" style={{display:this.state.isExpand?"":"none"}}>
                    <li className="item-name">Current country</li><li className="item-value"><Select defaultValue={itemValue} clearable={false} searchable={false} onChange={this.changeCountry}/></li>
                </ul>
                <ul className="edit-item" style={{display:this.state.isExpand && this.state.isShowZip ?"":"none"}}>
                    <li className="item-name">Zip code</li><li className="item-value"><input defaultValue={itemValue} onBlue={this.getCityByZip} /></li>
                    <li style={{display:this.state.isShowCity ? "":"none" }}></li>
                </ul>
                <ul className="edit-item" style={{display:this.state.isExpand && !this.state.isShowZip ? "":"none"}}>
                    <li className="item-name">Current Region</li><li className="item-value"><Select defaultValue={itemValue} clearable={false} searchable={false} /></li>
                </ul>
                <ul className="edit-item" style={{display:this.state.isExpand?"":"none"}}><li className="item-name">Time zone</li><li className="item-value"><Select defaultValue={itemValue} clearable={false} searchable={false} /></li></ul>

            </div>
        )
    }
});
