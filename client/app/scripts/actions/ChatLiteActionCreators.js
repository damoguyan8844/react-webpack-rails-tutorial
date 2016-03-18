import Constants from './Constants.js'

export default {
  loadLiteView: (chatView) => ({ type: Constants.CHAT_LITE.LOAD_LITE_VIEW, chatView: chatView }),
  showLiteView: () => ({ type: Constants.CHAT_LITE.SHOW_LITE_VIEW }),
  hideLiteView: () => ({ type: Constants.CHAT_LITE.HIDE_LITE_VIEW })
};