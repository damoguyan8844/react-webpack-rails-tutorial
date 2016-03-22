var socket = null;
var editConvos = false;
var myToken = null;
var myRewardPoints = null;
var currentPeerToken = null;
var showInbox = true;
var inboxPeers = null;
var outboxPeers = null;
var messages = {};
var nextMessageSeqs = {};
var noMoreMessages = {};
var isConvoLocked = {};
var nextInboxPeerSeq = null;
var noMoreInboxPeers = false;
var nextOutboxPeerSeq = null;
var noMoreOutboxPeers = false;
var REQ_TIMEOUT = 30000;
var CONV_FILTER_RECEIVED = 1; // only return inbox peers
var CONV_FILTER_NOT_RECEIVED = 2; // only return outbox peers
var MAX_ABS_MSG_LENGTH = 60;
var HAS_PREDEFINED_ACTIVE_PEER = undefined;
var predefinedActivePeer = null;

function findPeerIndex(array, token) {
    var index = -1;
    array.forEach(function(elem, idx) {
        if (elem.token === token)
            index = idx;
    });
    return index;
}

function findPeer(token) {
    var index;
    index = findPeerIndex(inboxPeers, token);
    if (index !== -1)
        return inboxPeers[index];
    index = findPeerIndex(outboxPeers, token);
    if (index !== -1)
        return outboxPeers[index];
    return null;
}

function disconnect(msg) {
    if (msg === undefined)
        msg = 'Time out.'
    // popup_flash_msg('error', msg)
    socket.disconnect();
    location.reload();
}

function startTimer(msg) {
    return setTimeout(function() {
        disconnect(msg);
    }, REQ_TIMEOUT);
}

function request(event, req, callback) {
    var timeoutID = startTimer(i18n(event));
    req.lang = window['2rb.locale'];
    req.platform = chat_platform;
    socket.emit(event, req, function(res) {
        clearTimeout(timeoutID);
        if (res.status >= 400) {
            // popup_flash_msg('error', res.error);
            isGettingMessages = isGettingPeers = false;
            return;
        }
        callback(res.result);
    });
}

function authenticate(token, callback) {
    var req = {token: token};
    request('authenticate', req, function(result) {
        myToken = token;
        callback();
    });
}

function getInbox(callback) {
    if (inboxPeers !== null)
        return callback();
    if (!myToken)
        throw new Error('not yet authenticated');

    var req = {filter: CONV_FILTER_RECEIVED, maxSeq: nextInboxPeerSeq};
    request('getPeers', req, function(result) {
        inboxPeers = result.peers;
        nextInboxPeerSeq = result.nextSeq;
        noMoreInboxPeers = result.noMore;
        callback();
    });
}

function getOutbox(callback) {
    if (outboxPeers !== null)
        return callback();
    if (!myToken)
        throw new Error('not yet authenticated');

    var req = {filter: CONV_FILTER_NOT_RECEIVED, maxSeq: nextOutboxPeerSeq};
    request('getPeers', req, function(result) {
        outboxPeers = result.peers;
        nextOutboxPeerSeq = result.nextSeq;
        noMoreOutboxPeers = result.noMore;
        callback();
    });
}

var lastGetPeersReq = null;

function getPeers(isInbox, callback) {
    if (!myToken)
        throw new Error('not yet authenticated');
    var nextPeerSeq = isInbox ? nextInboxPeerSeq : nextOutboxPeerSeq;
    var peers = isInbox ? inboxPeers : outboxPeers;
    var filter = isInbox ? CONV_FILTER_RECEIVED : CONV_FILTER_NOT_RECEIVED;

    var req = {filter: filter, maxSeq: nextPeerSeq};

    if (lastGetPeersReq !== null &&
        lastGetPeersReq.filter === req.filter &&
        lastGetPeersReq.maxSeq === req.maxSeq)
        return;
    lastGetPeersReq = req;

    request('getPeers', req, function(result) {
        if (result.peers.length === 0)
            return
        if (peers.length > 0) {
            var minSeq = peers[peers.length-1].lastMessage.seq;
            if (result.peers[0].lastMessage.seq >= minSeq)
                return;
        }
        if (isInbox) {
            nextInboxPeerSeq = result.nextSeq;
            noMoreInboxPeers = result.noMore;
        } else {
            nextOutboxPeerSeq = result.nextSeq;
            noMoreOutboxPeers = result.noMore;
        }
        Array.prototype.push.apply(peers, result.peers);
        callback(result.peers);
    });
}

var lastGetMessageReq = null;

function getMessages(callback, isGetMore) {
    if (!myToken)
        throw new Error('not yet authenticated');

    var req = {token: currentPeerToken, maxSeq: nextMessageSeqs[currentPeerToken]};
    if (messages[currentPeerToken] != undefined && isGetMore == undefined) {
        sendMarkRead([currentPeerToken], function(){

        });
        callback(); // for appending messages already stored in memory, i.e., messages[currentPeerToken]
        return;
    }
    if (messages[currentPeerToken] == undefined) {
        messages[currentPeerToken] = [];
    }

    if (isGetMore && lastGetMessageReq !== null &&
        lastGetMessageReq.token === req.token &&
        lastGetMessageReq.maxSeq === req.maxSeq)
        return;
    lastGetMessageReq = req;

    request('getMessages', req, function(result) {
        var msgs = result.messages.slice().reverse();
        if (msgs.length === 0)
            return;

        var lastMsg = msgs[msgs.length-1]
        var peerToken = lastMsg.senderToken !== myToken ? lastMsg.senderToken : lastMsg.receiverToken;

        if (messages[peerToken].length > 0) {
            var minSeq = messages[peerToken][0].seq;
            if (lastMsg.seq >= minSeq)
                return;
        }

        Array.prototype.unshift.apply(messages[peerToken], msgs);
        nextMessageSeqs[peerToken] = result.nextSeq;
        noMoreMessages[peerToken] = result.noMore;
        isConvoLocked[peerToken] = result.locked;

        if (peerToken === currentPeerToken)
            callback(result.messages); // for prepending paginated messages
    });
}

function getPeer(peerToken, callback) {
    if (!myToken)
        throw new Error('not yet authenticated');

    var req = {token: peerToken};
    request('getPeer', req, function(result) {
        callback(result.peer);
    });
}

function sendMessage(peerToken, msg, callback) {
    if (!myToken)
        throw new Error('not yet authenticated');

    req = {token: peerToken, msg: msg};
    request('message', req, function(result) {
        callback(result.message);
    });
}

function sendMarkRead(peerTokens, callback) {
    if (!myToken)
        throw new Error('not yet authenticated');

    var req = {tokens: peerTokens};
    request('read', req, function(result) {
        callback();
    });
}

function sendMarkAllRead(callback){
    if (!myToken)
        throw new Error('not yet authenticated');
    req = {};
    request('readAll', req, function(result) {
        callback();
    });
}

function sendDeletePeers(peerTokens, callback) {
    if (!myToken)
        throw new Error('not yet authenticated');

    var req = {tokens: peerTokens};
    request('delete', req, function(result) {
        callback();
    });
}

// The following is to get month name for construct_client_time function
Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};

Date.locale = {
    en: {
        month_names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    ch: {
        month_names: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }
};

function construct_client_time(linuxTime) {
    var time = new Date(linuxTime);
    locale = window['2rb.locale'];
    day = time.getDate().toString();
    hour = time.getHours().toString();
    minute = time.getMinutes().toString();
    if (hour.length < 2)
        hour = "0" + hour;
    if (minute.length < 2)
        minute = "0" + minute;
    if (locale == "en"){
        month = time.getMonthName("en");
        return i18n("read") + " " + month + " " + day + " " + hour + ":" + minute;
    }else{
        month = time.getMonthName("ch");
        return month + day + "日" + " " + hour + ":" + minute + " " + i18n("read");
    }
}

function resetVariables() {
    myToken = null;
    currentPeerToken = null;
    inboxPeers = null;
    outboxPeers = null;
    messages = {};
    nextMessageSeqs = {};
    noMoreMessages = {};
    isConvoLocked = {};
    nextInboxPeerSeq = null;
    noMoreInboxPeers = false;
    nextOutboxPeerSeq = null;
    noMoreOutboxPeers = false;
    HAS_PREDEFINED_ACTIVE_PEER = undefined;
    predefinedActivePeer = null;
    isGettingMessages = false;
    isGettingPeers = false;
}

function removeTrailingSlashBeforeQueryString() {
    var url = window.location.href;
    var queryStartIndex = url.indexOf("?");
    if(queryStartIndex != -1 && url[queryStartIndex-1] == "/") {
        history.replaceState(null, null, url.substr(0, queryStartIndex-1) + url.substr(queryStartIndex));
    }
}

$(function(){
    $('#report-user-button').click(function(){
        var checkedArr = $("input:checkbox[name=report]:checked");
        checkedArr.each(function(i,e){
            $('#report-user-button').attr('disabled', true);
            var comment = $(this).attr('data-comment');
            var specId = $(this).attr('data-spec-id');
            var parent = $(this).closest(".checkbox");
            $.ajax({
                url: feedback_api,
                data: {
                    "target_user_token": currentPeerToken,
                    "feedback": {
                        "comment": comment,
                        "feedback_spec_id": specId,
                        "controller": "feedbacks",
                        "action": "report_inappropriate_profile"
                    }
                },
                type: 'POST',
                success: function(data){
                    if(i == checkedArr.length-1) {
                        if(data.success){
                            $("#report-flash").text(data.message).css('background', '#64B62B');
                        } else {
                            $("#report-flash").text(data.message).css('background', '#EB4121');
                        }
                        $("#report-flash").fadeIn(100).delay(1000).fadeOut(100);
                        hideModal();
                        $('#report-user-button').attr('disabled', false);
                    }
                },
                error: function(data){
                    $("#report-flash").text(i18n("feedback_error")).css('background', '#EB4121');
                    $("#report-flash").fadeIn(100).delay(1000).fadeOut(100);
                    //hideModal();
                    $('#report-user-button').attr('disabled', false);
                }
            });
        });
    });

    $(".btn").mouseup(function(){
        $(this).blur();
    });
})
