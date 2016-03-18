import React from 'react';
import classNames from 'classnames';
//asdf
export class MessagesOptions extends React.Component {

	render() {
		const isMobileView = this.props.isMobileView
		return (
		    <div className="btn-group chat_options">
		      	<button
		 	     	type="button"
		 	     	className={classNames({
			      		"btn": true,
			      		"btn-default": true,
			      		"dropdown-toggle": true,
			      		"msg_options": true,
			      		"icon-nav-more": false
		 	     	})}
		   		   	data-toggle="dropdown"
		    	  	aria-haspopup="true"
		    	  	aria-expanded="false"
  				>
		        	Options
		      	</button>
		      	<ul className="dropdown-menu pull-right msg_options_menu">
		        	<li
		        		id="block-user"
		        		onClick={this.props.openBlockUserModal}
		        	>
		        		<a className="msg_options_link red-text" href="javascript:void(0)">{this.props.blocked?"Unblock":"Block"} user</a>
	        		</li>
		        	<li role="separator" className="msg_options_divider"></li>
		        	<li id="report-user" onClick={this.props.openReportModal} type="button">
		        		<a href="javascript:void(0)" className="msg_options_link">Report user</a>
	        		</li>
		        	<li role="separator" className="msg_options_divider"></li>
		        	<li id="delete-current" onClick={this.props.deleteCurrentConversation}>
		        		<a href="javascript:void(0)" className="msg_options_link">Delete conversation</a>
	        		</li>
		      	</ul>
	    	</div>
		)
	}
}
