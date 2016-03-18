import React from 'react';
import classNames from 'classnames';
import { checkAndReplaceUrlIfNeeded } from '../../../../utils/chat_utils'


export class Message extends React.Component {
  rawMarkup(content) {
    return { __html: content}
  }

  render() {
    const myToken = this.props.myToken
    const myPhotoURL = this.props.myPhotoURL
    const msg = this.props.msg
    const isSenderMe = msg.senderToken === myToken
    let imgUrl = isSenderMe ? myPhotoURL : this.props.currentPeer.photoURL

    const content = (msg.locked && !isSenderMe) ? 'Message is locked' : msg.msg
    const isMsgSeen = isSenderMe && this.props.myVIPStatus && (!msg.readAt == 0)
    const isPeeriOS = this.props.isPeeriOS

    return (


      <div className="msg_container_outer" >
          <div className="chat_divider_date"
            style={{
                display: this.props.addDateDivider ? 'block' : 'none'
              }}>
              <p className="chat_divider_date_text">{moment(msg.time).format('MMM DD, YYYY')}</p>
         </div>
         <div
            className={classNames({
              'msg_container_inner': true,
              'msg_me': isSenderMe,
              'msg_you': !isSenderMe
            })}>
             <div className="sender_photo">
              <img src={checkAndReplaceUrlIfNeeded(imgUrl)} className='img-circle' />
             </div>
             <div className="bubble_container">
               <div
                  className={classNames({
                    'msg_bubble': true,
                    'msg_bubble--me': isSenderMe,
                    'msg_bubble--you': !isSenderMe,
                    'wrap': true
                  })}
                  dangerouslySetInnerHTML={this.rawMarkup(content)}
                />

             </div>
             <div className="filler"></div>
         </div>
         <div className="bubble-footer"></div>
         <div className="message-extra-infos">
           <p className="message-seen" style={{
               display: isMsgSeen ? "block" : "none"
             }}>Seen {moment(msg.readAt).format('h:mm A')}</p>
           <a className="message-ios" style={{
               display: (isPeeriOS && !isSenderMe) ? "block" : "none"
             }}
             href="https://ad.apps.fm/__3fcaR9t4WAzFD5kLIQjfE7og6fuV2oOMeOQdRqrE3V9C3qLmEA3G4oc9r6jjExD6O_IzUTz79xCnBuDx3fpIaDQdCykANmAPYMwO1kT6A"
             >Sent from 2RedBeans iOS App</a>
         </div>

         <div className="clear_both"></div>
         <fieldset className="chat_divider" style={{
             display: this.props.addVipDivider ? 'block' : 'none'
           }}>
             <legend className="chat_divider_legend">VIP EXPIRED. FUTURE MESSAGES WILL BE LOCKED.</legend>
         </fieldset>

      </div>
    )
  }
}
