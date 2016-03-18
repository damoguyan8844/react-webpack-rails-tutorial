import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import { ConversationList } from './ConversationList'
import { ConversationsHeader } from './ConversationsHeader'
import { ConversationsFooter } from './ConversationsFooter'
import classNames             from 'classnames';

export class ConversationsPanel extends React.Component {
  render () {
    const isLiteView = this.props.isLiteView
    return (
      <Col
      	md={10} sm={10} xs={24}
      	className={classNames({
          "convo_panel": true,
          "convo_panel--slim": isLiteView && this.props.shouldSlimConvPanel,
          "hidden": !this.props.shouldDisplayConversationsPanel
        })}
      	style={{
      		height: 'inherit'
      	}}>
          <ConversationsHeader {...this.props} />
          <ConversationList {...this.props} />
          <ConversationsFooter {...this.props} />
      </Col>
    );
  }
}
