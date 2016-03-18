import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames';
import Autosize from 'autosize';

export class MessagesFooter extends React.Component {
  componentDidMount() {
    const msgInput = this.refs.msgInput;
    $('.chat_input_wrapper').css('min-height', msgInput.clientHeight + 1)
    Autosize(msgInput);
    msgInput.addEventListener('autosize:resized', () => {
      $('.chat_input_wrapper').css('min-height', msgInput.clientHeight + 1)
    })
    if (this.props.isMobileView) {
      $('.chat_input').css('max-height', 100);
    }
  }

  handleSendButtonClick() {
    const input =  this.refs.msgInput
    const message = input.value
    const peerToken = this.props.currentPeerToken
    this.props.sendMessage(message, peerToken).then(() => {
      input.value = '';
      Autosize.update(input);
    });

  }

  render () {
    let messageInput = (
      <textarea
        rows={1}
        className='wrap chat_input'
        ref='msgInput'
        autocomplete='off'
        placeholder="Say something..."
      />
    )

    return (
      <div className='chat_input_wrapper'>
          {messageInput}
          <Button onClick={this.handleSendButtonClick.bind(this)} className="msg_button_send">
            <i className={classNames({
              'icon-msg-send': true
            })}/>
          </Button>
          <div style={{clear: "both"}}></div>
      </div>
    )
  }
}
