var chat_platform = 'web';
var COL_XS_BREAKPOINT = 992;
var $loadingGif = $("#chat-loading");

function startChat(token, peerToken,callback) {
    resetVariables();
    authenticate(token, function() {
        getOutbox(function() {
            getInbox(function() {
                if (inboxPeers.length > 0) {
                    currentPeerToken = inboxPeers[0].token;
                    callback();
                }
                if (peerToken) {
                    HAS_PREDEFINED_ACTIVE_PEER = true;
                    getPeer(peerToken, function(peer){
                        currentPeerToken = peerToken;
                        predefinedActivePeer = peer;
                        showInbox = peer.numReceived > 0;
                        reloadConvosView();
                        reloadMessagesView();
                        return;
                    });
                }
                reloadConvosView();
                if (!HAS_PREDEFINED_ACTIVE_PEER)
                    reloadMessagesView();
            });
        });
    });
}

function appendMessage(message) {
    var token = message.senderToken;
    if (token === myToken)
        token = message.receiverToken;

    var peers, peer;
    var index = findPeerIndex(outboxPeers, token);
    if (index !== -1) {
        peers = outboxPeers;
        peer = outboxPeers[index];
        outboxPeers.splice(index, 1);
    }

    index = findPeerIndex(inboxPeers, token);
    if (index !== -1) {
        peers = inboxPeers;
        peer = inboxPeers[index];
        inboxPeers.splice(index, 1);
    }

    getPeer(token, function(peer) {
        if (peer.numReceived > 0)
            peers = inboxPeers;
        else
            peers = outboxPeers;
        peers.splice(0, 0, peer);
        if ( (peer.numReceived > 0 && showInbox) || (peer.numReceived == 0 && !showInbox) ) {
            shiftConvoViewToTop(peer);
        }
        var convMessages = messages[token];
        if (convMessages !== undefined) {
            convMessages.push(message);
            if (token === currentPeerToken) {
                var $msg = appendMessageView(message, peer.photoURL);

                var prevDate = moment(convMessages[convMessages.length-2].time);
                var currDate = moment(message.time);
                if (currDate.isAfter(prevDate, 'day')) {
                    prependDate($msg, currDate);
                }

                updateScroll($('.chat-box'));
                if (message.senderToken === token)
                    markRead([currentPeerToken], function(){});
            }
        }
    });
}

function deletePeers(tokens) {
    var peers;
    if (showInbox)
        peers = inboxPeers;
    else
        peers = outboxPeers;

    sendDeletePeers(tokens, function() {
        tokens.forEach(function(token) {
            var index = findPeerIndex(peers, token);
            if (index === -1 && predefinedActivePeer === null)
                throw new Error('current peer is gone');
            peers.splice(index, 1);
            if (peers.length > 0) {
                currentPeerToken = (peers.length > index && index !== -1) ? peers[index].token : peers[0].token;
            }
            else {
                currentPeerToken = null;
            }
            messages[token] = undefined;
            removeConvoView($('#'+token));
        });
        exitEditMode();
        reloadMessagesView();
    });
}

function markRead(tokens) {
    sendMarkRead(tokens, function() {
        tokens.forEach(function(token) {
            var peer = findPeer(token);
            if (peer === null)
                throw new Error('current peer is gone');
            peer.numUnread = 0;
            markConvoViewAsRead($('#'+peer.token));
        });
        exitEditMode();
        updateUnreadCountInNavBar();
    });
}

function exitEditMode() {
    if(editConvos)
        $('.cancel-button').trigger('click');
}

function getSelectedTokens() {
    results = [];
    $("input:checkbox[name=convo]:checked").each(function(){
        $p = $(this).parents('li.list-group-item.convo');
        results.push($p.attr('id'));
    });
    return results;
}

function updateUrlWithCurrentToken(token) {
    removeTrailingSlashBeforeQueryString();
    history.replaceState(null, null, 'conversations?p=' + token);
}

function onClickPeer(e) {
    if (editConvos) {
        if (!$(e.target).is("input[type='checkbox']"))
            $(this).find("input[type='checkbox']").prop('checked', !$(this).find("input[type='checkbox']").is(':checked'));
        return;
    }
    var token = $(this).attr('id');
    if (token === currentPeerToken && !HAS_PREDEFINED_ACTIVE_PEER)
        return;
    HAS_PREDEFINED_ACTIVE_PEER = false;
    predefinedActivePeer = null;
    updateUrlWithCurrentToken(token);
    $('#' + currentPeerToken).removeClass('active');
    currentPeerToken = token;
    $('#' + currentPeerToken).addClass('active');
    markConvoViewAsRead($(this));
    reloadMessagesView();
}

function removeConvoView($convo) {
    $convo.remove();
}

function markConvoViewAsRead($convo) {
    $convo.find('.unread-count').hide();
    $convo.find('.unread-sender-abstract').css('font-weight', 'normal');
    $convo.find('.lock-icon').css('clear', 'both');
}

function shiftConvoViewToTop(peer) {
    $('#'+peer.token).remove();
    prependPeerView(peer);
}

function disableConvoList() {
    $('.convo_button_edit').attr('disabled', true);
    $('.convo_button_mark-all-read').attr('disabled', true);
}

function enableConvoList() {
    $('.convo_button_edit').attr('disabled', false);
    $('.convo_button_mark-all-read').attr('disabled', false);
}
function reloadConvosView() {
    var peers;
    if (showInbox) {
        peers = inboxPeers;
        $('#show-inbox').addClass('active');
        $('#show-outbox').removeClass('active');
    } else {
        peers = outboxPeers;
        $('#show-inbox').removeClass('active');
        $('#show-outbox').addClass('active');
    }
    $('.convo_list').empty();

    if (inboxPeers.length==0 && outboxPeers.length==0) {
        $('.no-convo-right').show();
    }
    else{
        $('.no-convo-right').hide();
    }
    if (peers.length == 0) {
        $('.convo_list').append($("<p class='no-convo-left'> " + i18n("no_conv") + " </p>"));
        disableConvoList();
    } else {
        enableConvoList();
    }
    $('.convo_button_mark-all-read').attr('disabled', true);
    peers.forEach(function(peer) {
        appendPeerView(peer);
    });
    if (editConvos) {
        $('.convo_features').hide();
        $('.convo_options').show();
        $('.convo_select').show();
    } else {
        $('.convo_options').hide();
        $('.convo_features').show();
        $('.convo_select').hide();
    }
}

function reloadMessagesView() {

    if (currentPeerToken === null) {
        $('.chat_panel').hide();
        return;
    }
    $('#report-user').data("peerToken", currentPeerToken);
    var peer = findPeer(currentPeerToken) || predefinedActivePeer;

    if (peer === null) {
        return;
    }
    $('.chat_panel').show();
    $('.sender_photo img').attr('src', peer.photoURL);
    $('.sender_photo img').wrap("<a href='/users/" + peer.token + "'/>");
    $('.msg_sender_info>.sender_name').text(peer.name + ", " + peer.age);
    if(peer.VIP) {
        $('.msg_sender_info>.sender_name').append($("<span class='vip-label label'>").text("VIP"));
    }
    $('.sender_location').text(peer.location);
    // ugly hack to make sure that getMessages cannot be called more than once before a callback returns
    $('.chat-box').empty();
    $('.chat-box').append($loadingGif.show());

    getMessages(function() {
        $loadingGif.hide();
        var msgs = messages[currentPeerToken];
        appendMessageViews(msgs, peer);
        showOrHideVipBox();
        updateScroll($('.chat-box'));
        if (peer.numUnread > 0) {
            updateUnreadCountInNavBar();
        }
        peer.numUnread = 0;
        markConvoViewAsRead($('#'+peer.token));
    });
}

function getUnlockedMessagesAndUpdateView() {
    getMessages(function() {
        $('.chat-box').empty();
        var peer = findPeer(currentPeerToken);
        var msgs = messages[currentPeerToken];
        appendMessageViews(msgs, peer);

        updateScroll($('.chat-box'));
        myRewardPoints = myRewardPoints - POINTS_TO_UNLOCK;
        $('#my_reward_points').text(myRewardPoints >= 0 ? myRewardPoints : 0);
        popup_flash_msg("notice", i18n("unlock_success"));
        showOrHideVipBox();

        getPeer(currentPeerToken, function(updatedPeer){
            // update convo to remove lock icon and change msg abstract
            // TODO: make code DRY, this code is repeated in appendPeerView()
            peer.lastMessage = updatedPeer.lastMessage;
            var $peer = $('#' + peer.token);
            var $abs = $peer.find('.unread-sender-abstract');
            var absMsg = peer.lastMessage.msg;
            absMsg = $('<p>' + absMsg + '</p>').text().substr(0,MAX_ABS_MSG_LENGTH);
            if (peer.lastMessage.senderToken === myToken)
                absMsg = i18n("me") + absMsg;
            if (!(peer.lastMessage.senderToken === myToken) && peer.locked)
                $abs.text(i18n('conversation_locked')).css('font-style', 'italic');
            else
                $abs.html(absMsg).css('font-style', 'normal');

            $peer.find('.lock-icon').hide();
        });
    });
}

function unlockConversation() {
    $.ajax({
        url: unlock_conversation_api,
        data: {
            'use_points': 'true',
            'peer_token': currentPeerToken
        },
        type: 'POST',
        success: function(data) {
            if(data['success']) {
                nextMessageSeqs[currentPeerToken] = null;
                messages[currentPeerToken] = undefined;
                isConvoLocked[currentPeerToken] = false;
                noMoreInboxPeers = noMoreOutboxPeers = false;
                getUnlockedMessagesAndUpdateView();
            } else {
                popup_flash_msg("error", i18n('unlock_fail'));
            }
        },
        error: function(data) {
            popup_flash_msg("error", i18n('unlock_error'));
        }
    });
}

function updateUnlockButton(rewardPoints) {
    $('.unlock-button').unbind();
    if (rewardPoints >= POINTS_TO_UNLOCK) {
        $('.unlock-button').click(function(e){
            e.preventDefault();
            unlockConversation();
        });
    } else {
        $('.unlock-button').text(i18n('buy_diamonds'));
        $('.unlock-button').click(function(){
            window.location = buy_diamonds_url;
        });
    }
    $('.unlock-button').attr('disabled', false);
}

function getRewardPointsAndUpdateLockButton() {
    $.ajax({
        url: current_user_status_api,
        data: {},
        type: 'GET',
        success: function(data){
            myRewardPoints = data['reward_points_count'];
            updateUnlockButton(myRewardPoints);
        },
        error: function(data){
            $('.unlock-button').hide();
        }
    });
}

function showOrHideVipBox() {
    if (messages[currentPeerToken] != undefined && isConvoLocked[currentPeerToken]) {
        $('.become-vip-box').show();
        $('.unlock-button').attr('disabled', true);

        if (myRewardPoints == null) {
            getRewardPointsAndUpdateLockButton();
        } else {
            updateUnlockButton(myRewardPoints);
        }
    } else {
        $('.become-vip-box').hide();
    }
}
function getMoreMessages() {
    var peer = findPeer(currentPeerToken) || predefinedActivePeer;
    if (noMoreMessages[currentPeerToken] || peer === null)
        return;
    $('.chat-box').prepend($loadingGif.show());
    getMessages(function(msgs) {
        prependMessageViews(msgs, peer)
        $loadingGif.hide();
    }, true);
}

function getMorePeers() {
    if (showInbox && noMoreInboxPeers)
        return;
    if (!showInbox && noMoreOutboxPeers)
        return;
    getPeers(showInbox, function(peers) {
        peers.forEach(function(peer) {
            appendPeerView(peer);
        });
    });
}

function updateUnreadCountInNavBar() {
    request('getNumUnread', {}, function(res){
        var numUnread = res.numUnread;
        if(numUnread > 0) {
            $('#unread_count').text(numUnread > 99 ? "∞" : numUnread).show();
        }
        else {
            $('#unread_count').text(0).hide();
        }
    });
}
function updateScroll(JQ) {
    var element = JQ.get(0);
    element.scrollTop = element.scrollHeight;
}

var peerTmpl = [
    '<li class="list-group-item convo">',
    '    <div style="display:none" class="convo_select">',
    '      <input type="checkbox" name="convo">',
    '    </div>',
    '    <div class="img-container">',
    '      <img src="" class="img-circle">',
    '    </div>',
    '    <div class="sender_info">',
    '      <p class="truncate list-group-item-heading sender_name">',
    '        <span style="display:none" class="vip-label label label-default">VIP</span>',
    '      </p>',
    '      <p class="truncate small list-group-item-text unread-sender-abstract"></p>',
    '    </div>',
    '    <div class="convo_info">',
    '      <p class="pull-right truncate convo_last-timestamp"></p>',
    '      <span class="pull-right unread-count badge"></span>',
    '      <span class="pull-right lock-icon glyphicon glyphicon-lock text-muted"></span>',
    '    </div>',
    '</li>'
].join('\n');

function createPeerView(peer) {
    var $peer = $(peerTmpl);

    $peer.attr('id', peer.token);
    if (peer.token === currentPeerToken && !HAS_PREDEFINED_ACTIVE_PEER)
        $peer.addClass('active');

    $peer.find('.img-circle').attr('src', peer.photoURL);

    $peer.find('.sender_name').text(peer.name);
    if(peer.VIP)
        $peer.find('.sender_name').append($("<span class='vip-label label'>").text('VIP'));
    var $abs = $peer.find('.unread-sender-abstract');
    var absMsg = peer.lastMessage.msg;
    absMsg = $('<p>' + absMsg + '</p>').text().substr(0,MAX_ABS_MSG_LENGTH);
    if (peer.lastMessage.senderToken === myToken)
        absMsg = i18n("me") + absMsg;
    if (!(peer.lastMessage.senderToken === myToken) && peer.locked)
        $abs.text(i18n('conversation_locked')).css('font-style', 'italic');
    else
        $abs.html(absMsg);
    if (peer.numUnread > 0)
        $abs.css('font-weight', 'bold');
    else
        $abs.css('font-weight', 'normal');

    var last = moment(peer.lastMessage.time).format('MMM Do');
    $peer.find('.convo_last-timestamp').text(last);
    if (editConvos) {
        $peer.find('.convo_select').show();
    }
    if (peer.locked) {
        $peer.find('.lock-icon').css('display', 'inline-block');
        $peer.find('.unread-count').css('background-color', '#777777');
    }
    if (peer.numUnread > 0) {
        $peer.find('.unread-count').text(peer.numUnread).css('display', 'inline-block');
        $peer.find('.lock-icon').css('clear', 'none');
        $('.convo_button_mark-all-read').attr('disabled', false);
    }
    $peer.click(onClickPeer);
    return $peer;
}

function appendPeerView(peer) {
    createPeerView(peer).appendTo($('.convo_list'));
}

function prependPeerView(peer) {
    createPeerView(peer).prependTo($('.convo_list'));
}

var messageTmpl = [
    '<div class="msg-outer-container">',
    '   <div class="msg-inner-container">',
    '       <div class="sender_photo"></div>',
    '       <div class="bubble_container">',
    '           <div class="bubble"></div>',
    '       </div>',
    '       <div class="filler"></div>',
    '   </div>',
    '   <div class="bubble-footer"></div>',
    '   <div class="clear_both"></div>',
    '</div>'
].join('\n');

function createMessageView(msg, imgUrl) {
    var $msg = $(messageTmpl);
    var isSenderMe = msg.senderToken === myToken;
    $msg.find('.msg-inner-container').addClass(msg.senderToken == myToken ? 'msg_me':'msg_you');
    imgUrl = isSenderMe ? RB.getMe().main_photo.mobile_image_url : imgUrl;
    $msg.find('.sender_photo').html("<img src='" + imgUrl + "' class='img-circle'>");
    $msg.find('.bubble')
        .addClass(isSenderMe ? 'me' : 'you')
        .html((msg.locked && !isSenderMe) ? i18n("msg_is_locked") : msg.msg);

    if (isSenderMe) {
        var readAt = msg.readAt;
        var readAtText;
        if (readAt === undefined) {
            readAtText = i18n("shown_to_vip_only");
        } else if (readAt === 0) {
            readAtText = "";
        } else {
            readAtText = construct_client_time(readAt);
        }
        $msg.find('.bubble-footer').html(readAtText);
    }

    return $msg;
}

function prependDate($msg, date) {
    var $date = $("<div class='date-separator'>" + date.format('MMM DD, YYYY') + "</div>");
    $date.data('date', date.format('YYYY MM DD'));
    $msg.before($date);
}

function appendDate($msg, date) {
    var $date = $("<div class='date-separator'>" + date.format('MMM DD, YYYY') + "</div>");
    $date.data('date', date.format('YYYY MM DD'));
    $msg.after($date);
}

function prependMessageView(msg, imgUrl) {
    var $msg = createMessageView(msg, imgUrl);
    $msg.prependTo($('.chat-box'));
    var top = $('.chat-box').scrollTop(),
        height = $msg.height();
    $('.chat-box').scrollTop(top + height);
    return $msg;
}

function appendMessageView(msg, imgUrl) {
    var $msg = createMessageView(msg, imgUrl);
    $msg.appendTo($('.chat-box'));
    return $msg;
}

function prependMessageViews(msgs, peer) {
    // prevDateSeparator is the second child in chat-box div
    var $prevDateSeparator = $('.chat-box').children().eq(1);
    var currDate, prevDate, msg, $msg;

    prevDate = moment($prevDateSeparator.data('date'), "YYYY MM DD");
    $prevDateSeparator.remove();

    for(var i=0; i<msgs.length-1; i++) {
        msg = msgs[i];
        currDate = moment(msg.time);
        $msg = prependMessageView(msg, peer.photoURL);
        if (currDate.isBefore(prevDate, 'day')) {
            appendDate($msg, prevDate);
            prevDate = currDate;
        }
    }
    // prepend current date for last message when prepending message views
    // to ensure that it can be used as $prevDateSeparator for the next pagination
    msg = msgs[msgs.length-1]
    currDate = moment(msg.time)
    $msg = prependMessageView(msg, peer.photoURL);
    prependDate($msg, currDate);
}

function appendMessageViews(msgs, peer) {
    var currDate, prevDate = null;
    for(var i=0; i<msgs.length; i++) {
        var msg = msgs[i];
        currDate = moment(msg.time);
        var $msg = appendMessageView(msg, peer.photoURL);
        if (prevDate === null || currDate.isAfter(prevDate, 'day')) {
            prevDate = currDate;
            prependDate($msg, currDate);
        }
    }
}


$('.close-vip-box').click(function(){
    $('.become-vip-box').hide();
});

$('#become-vip-button').click(function(){
    window.location = become_vip_url;
});
