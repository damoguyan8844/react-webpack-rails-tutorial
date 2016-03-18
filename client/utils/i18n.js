var EN = {
    "no_peer":"User doesn't exist!",
    "no_conv":"It's so quiet here ...",
    "block_failed":"Block failed! Please try again.",
    "con_del_check":"Please select a conversation to delete!",
    "msg_is_locked": "This message is locked.",
    "conversation_locked": "Conversation locked.",
    "feedback_error":"Error occurred, please try.",
    "me":"Me: ",
    "deleted": "Conversation(s) deleted.",
    "delete_fialed":"Delete failed!",
    "getMessages": "Get messages failed!",
    "getPeer": "Get conversation failed!",
    "getPeers":"Get conversations failed!",
    "authenticate":"Authentication failed!",
    "message": "Send message failed!",
    "read":"Mark as read failed!",
    "unlock_success": "Unlocked successfully.",
    "unlock_fail": "Unlock failed.",
    "unlock_error": "Error during unlocking.",
    "buy_diamonds": "Buy diamonds",
};
var CH = {
    "no_peer":"当前用户已经不存在!",
    "no_conv":"这里还是静悄悄哦 ...",
    "block_failed":"加入黑名单失败! 请重试.",
    "con_del_check":"请至少选择一个对话删除！",
    "msg_is_locked":"这条消息还未解锁。",
    "conversation_locked":"对话未解锁。",
    "feedback_error":"发生错误，请重试！",
    "me":"我：",
    "deleted": "对话已删除。",
    "delete_fialed": "删除失败！",
    "getMessages":"收取信息失败！",
    "getPeer": "获取用户信息失败！",
    "getPeers":"获取用户组信息失败！",
    "authenticate":"认证失败！",
    "message":"发送失败！",
    "read":"标记为读失败！",
    "unlock_success": "解锁成功",
    "unlock_fail": "解锁失败",
    "unlock_error": "解锁过程发生异常",
    "buy_diamonds": "充值水钻",

};
var TW = {
    "no_peer":"當前用戶已經不存在!",
    "no_conv":"这里还是静悄悄哦 ...",
    "block_failed":"加入黑名單失敗! 請重試.",
    "con_del_check":"請至少選擇壹個對話刪除！",
    "msg_is_locked":"這條消息還未解鎖。",
    "conversation_locked": "對話未解锁。",
    "feedback_error":"發生錯誤，請重試！",
    "me":"我：",
    "deleted": "對話已刪除。",
    "delete_fialed":"刪除失敗！",
    "getMessages": "收取信息失敗！",
    "getPeer": "獲取用戶信息失敗！",
    "getPeers":"獲取用戶組信息失敗！",
    "authenticate":"認證失敗！",
    "message": "發送失敗！",
    "read":"標記爲讀失敗！",
    "unlock_success": "解鎖成功",
    "unlock_fail": "解鎖失敗",
    "unlock_error": "解鎖過程發生異常",
    "buy_diamonds": "充值水鑽",
};

function i18n(msgkey){
    var msg;
    switch(window['2rb.locale']) {
        case 'en':
            msg = EN[msgkey];
            break;
        case 'zh-TW':
            msg = TW[msgkey];
            break;
        default:
            msg = CH[msgkey];
    }
    return msg;
}
