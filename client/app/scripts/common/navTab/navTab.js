var React = require('react');

var NavTab = React.createClass({
    propTypes: {
        onSwitchTab:React.PropTypes.func.isRequired
    },
    getDefaultProps :function(){
        return {
            menuItems :[]
        }
    },
    getInitialState:function(){
        return {
            activeItem:this.props.activeItem?this.props.activeItem:this.props.menuItems[0].key
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            activeItem: nextProps.activeItem
        });
    },
    switchTab: function(item, e){
        if(e){
            e.preventDefault();
        }
        if(item.key != this.state.activeItem){
            this.setState({activeItem:item.key});
            this.props.onSwitchTab && this.props.onSwitchTab(item.key);
        }
    },
    render: function() {
        var menus = this.props.menuItems.map(function(item){
            if(item.key == this.state.activeItem){

                return (
                    <li key={item.key} className="nav-tab_item active"><a className="nav-tab_item_link" onClick={this.switchTab.bind(null,item)} >{item.label}</a></li>
                )
            }else{
                return (
                    <li key={item.key} className="nav-tab_item"><a className="nav-tab_item_link" onClick={this.switchTab.bind(null,item)} >{item.label}</a></li>
                )
            }

        }.bind(this));
        return(
            <div className="rb-nav-tab">
                <ul className="nav-tab_items">
                    {menus}
                </ul>
            </div>
        )
    }
});

export default NavTab;
