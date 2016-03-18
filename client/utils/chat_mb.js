var chat_platform = 'mobile';
var NAVBAR_HEIGHT = 41;
var CHAT_HEADER_HEIGHT = 81;
var CHAT_INPUT_HEIGHT = 40;
var CONVO_OPTIONS_PANEL_HEIGHT = 55;

function mb_startChat(token, peerToken) {
    resetVariables();
    initView();
    authenticate(token, function() {
        getOutbox(function() {
            getInbox(function() {
                showInbox = true;
                if (inboxPeers.length > 0) {
                    currentPeerToken = inboxPeers[0].token;
                }
                if (peerToken) {
                    HAS_PREDEFINED_ACTIVE_PEER = true;
                    getPeer(peerToken, function(peer){
                        currentPeerToken = peerToken;
                        predefinedActivePeer = peer;
                        showInbox = peer.numReceived > 0;
                        mb_reloadConvosView();
                        segueToChatPanel();
                        return;
                    });
                }
                mb_reloadConvosView();
            });
        });
    });
}

$('#mb-show-inbox').click(function() {
    if (showInbox)
        return;
    showInbox = true;
    mb_reloadConvosView();
});

$('#mb-show-outbox').click(function() {
    if (!showInbox)
        return;
    showInbox = false;
    mb_reloadConvosView();
});

$('.mb-mark-all-read').click(function() {
    sendMarkAllRead(function() {
        inboxPeers.forEach(function(peer) {
            if (peer === null)
                throw new Error('current peer is gone');
            peer.numUnread = 0;
            markConvoViewAsRead($('#'+peer.token));
        });
    });
});

$('.mb-convo_button_mark-read').click(function() {
    var tokens = getSelectedTokens();
    if (tokens.length === 0)
        return;
    mb_markRead(tokens);
});

$('.mb-convo_button_delete').click(function() {
    var tokens = getSelectedTokens();
    if (tokens.length === 0)
        return;
    if (tokens.indexOf(currentPeerToken) !== -1) {
        currentPeerToken = null;
    }
    deletePeers(tokens);
});

$('.mb-cancel-button').click(function(){
    editConvos = false;
    mb_hideConvoOptionsPanel();
    mb_reloadConvosView();
});

$('.mb-edit-mode').click(function(){
    if(editConvos) {
        return;
    }
    mb_showConvoOptionsPanel();
    editConvos = true;
    mb_reloadConvosView();
});

$('#confirm-block-user').click(function(){
    var url = $("#block-user-path").attr("url") + "?blocked_id=" + currentPeerToken;
    $.ajax({
        type: 'POST', url: url,
        success: function(data) {
            data.success ? popup_flash_msg('notice', data.message) : popup_flash_msg('error', data.message) ;
            $("#block-user-modal").modal("hide");
            backToConvoView();
            removeConvoFromList($('.chat_options').attr("token"));
        },
        error: function() {
            popup_flash_msg('error', i18n("block_failed"));
            $("#block-user-modal").modal("hide");
        }
    });
});

$('#confirm-delete-msg').click(function(){
    $("#delete-message-modal").modal("hide");
    deletePeers([currentPeerToken]);
});

$('.mb-chat-input-form').submit(function() {
    var msg = $('#mb-chat-input').val().trim();
    if (msg.length === 0)
        return false;
    sendMessage(currentPeerToken, msg, function(message) {
        $('#mb-chat-input').val('');
        appendMessage(message);
    });
    return false;
});
function mb_hideConvoOptionsPanel() {
    $(".mb-convo_list").animate({height: "+=" + CONVO_OPTIONS_PANEL_HEIGHT}, 300, function(){
        $('.mb-convo-options-panel').hide();
    });
}

function mb_showConvoOptionsPanel() {
    $('.mb-convo-options-panel').show(function() {
        $(".mb-convo_list").animate({height: "-=" + CONVO_OPTIONS_PANEL_HEIGHT}, 300);
    });
}
function mb_appendMessage(message) {
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

    var convMessages = messages[token];
    if (convMessages !== undefined) {
        convMessages.push(message);
        if (token === currentPeerToken) {
            mb_appendMessageView(message, peer.photoURL);
            mb_updateScroll($('.chat-box'));
            if (message.senderToken === token)
                markRead([currentPeerToken], function(){});
        }
    }

    getPeer(token, function(peer) {
        if (peers !== inboxPeers && message.senderToken === token)
            peers = inboxPeers;
        peers.splice(0, 0, peer);
        mb_shiftConvoViewToTop(peer);
    });
}

function deletePeers(tokens) {
    sendDeletePeers(tokens, function() {
        backToConvoView();
        tokens.forEach(function(token) {
            removeConvoFromList(token);
        });
        popup_flash_msg("notice", i18n("deleted"));
        mb_exitEditMode();
    });
}

function mb_markRead(tokens) {
    sendMarkRead(tokens, function() {
        tokens.forEach(function(token) {
            var peer = findPeer(token);
            if (peer === null)
                throw new Error('current peer is gone');
            peer.numUnread = 0;
            mb_markConvoViewAsRead($('#'+peer.token));
            mb_exitEditMode();
        });
    });
}

function mb_exitEditMode() {
    if(editConvos)
        $('.mb-cancel-button').trigger('click');
}

function getSelectedTokens() {
    results = [];
    $("input:checkbox[name=convo]:checked").each(function(){
        $p = $(this).parents('li.list-group-item.convo');
        results.push($p.attr('id'));
    });
    return results;
}
function resetChatPanel(callback) {
    $('.chat-box').empty();
    $('.sender_photo>.img-circle').attr('src','/images/no_photo_thumb.png');
    $('.msg_sender_info>.sender_name').text("");
    $('.msg_sender_info>.sender_location').text("");
    $('#chat-input').val("");

    callback();
}
function onClickPeer(e) {
    if (editConvos) {
        if (!$(e.target).is("input[type='checkbox']"))
            $(this).find("input[type='checkbox']").prop('checked', !$(this).find("input[type='checkbox']").is(':checked'));
        return;
    }
    currentPeerToken = $(this).attr('id');
    HAS_PREDEFINED_ACTIVE_PEER = false;
    predefinedActivePeer = null;
    if(currentPeerToken === null)
        return;
    segueToChatPanel();
}

function segueToChatPanel() {
    $('.mb-convo-header').hide();
    $('.mb-convo_list').hide();
    resetChatPanel(function(){
        $('.mb-chat_panel').show(function(){
            reloadMessagesView();
            updateScroll($('.chat-box'));
            $('.convo_options').hide();
            $('.chat_options').attr("token", currentPeerToken);
            $('.chat_options').show();
        });
    });
    history.pushState(null, null, 'conversations?p=' + currentPeerToken);
    $('#' + currentPeerToken).removeClass('active');
    $('#' + currentPeerToken).addClass('active');
}

function mb_shiftConvoViewToTop(peer) {
    $('#'+peer.token).remove();
    prependPeerView(peer);
}

function mb_removeConvoView($convo) {
    $convo.remove();
}

function markConvoViewAsRead($convo) {
    $convo.find('.mb-unread-count').hide();
    $convo.find('.mb-unread-sender-abstract').css('font-weight', 'normal');
    $convo.find('.mb-lock-icon').css('clear', 'both');
}

function reloadConvosView() {
    var peers;
    if (showInbox) {
        peers = inboxPeers;
        $('#mb-show-inbox').addClass('active');
        $('#mb-show-outbox').removeClass('active');
    } else {
        peers = outboxPeers;
        $('#mb-show-inbox').removeClass('active');
        $('#mb-show-outbox').addClass('active');
    }
    $('.mb-convo_list').empty();
    if (peers.length==0) {
        $('.mb-convo_list').append($("<p class='no-convo-left'> It's so quiet here... </p>"));
    }
    peers.forEach(function(peer) {
        appendPeerView(peer);
    });
    if(HAS_PREDEFINED_ACTIVE_PEER) {
        scrollToPredefinedActivePeer();
        HAS_PREDEFINED_ACTIVE_PEER = false;
    }
    if (editConvos) {
        $('.mb-convo-select').show();
        $('.sender_info').removeClass('col-xs-6').addClass('col-xs-5');
    } else {
        $('.convo_select').hide();
    }
}

function reloadMessagesView() {
    var peer = findPeer(currentPeerToken) || predefinedActivePeer;
    if (peer === null)
        throw new Error('current peer is gone');

    $('.sender_photo>.img-circle').attr('src', peer.photoURL);
    var url = $('#user_path').attr('url');
    $('.chat-header').wrap("<a href='" + url + "/" + peer.token + "' data-ajax='false'/>");
    $('.msg_sender_info>.sender_name').text(peer.name + ", " + peer.age);
    // if(peer.VIP) {
    //     $('.msg_sender_info>.sender_name').append($("<span class='vip-label label'>").text("VIP"));
    // }
    $('.sender_location').text(peer.location);
    getMessages(function() {
        $('.chat-box').empty();
        var msgs = messages[currentPeerToken];
        msgs.forEach(function(msg) {
            mb-appendMessageView(msg, peer.photoURL);
        });
        mb-updateScroll($('.chat-box'));
        peer.numUnread = 0;
        mb-markConvoViewAsRead($('#'+peer.token));
        $(".chat-header").show();
        $('.chat-box').show();
        $('.chat_input_panel').show();
    });
}

function mb_scrollToPredefinedActivePeer() {
    var peers = showInbox ? inboxPeers : outboxPeers;
    var activePeerIndex = 0;
    for(var i=0; i<peers.length; i++) {
        if (peers[i].token == currentPeerToken) {
            activePeerIndex = i;
        }
    }
    $('.convo_list')[0].scrollTop = $('.convo_list')[0].scrollHeight * (activePeerIndex)/peers.length;
}

function mb_getMoreMessages() {
    var peer = findPeer(currentPeerToken) || predefinedActivePeer;
    if (noMoreMessages[currentPeerToken] || peer === null)
        return;
    getMessages(function(msgs) {
        msgs.forEach(function(msg) {
            mb-appendMessageView(msg, peer.photoURL, true);
        });
    }, true);
}

function getMorePeers() {
    if (showInbox && noMoreInboxPeers)
        return;
    if (!showInbox && noMoreOutboxPeers)
        return;
    getPeers(showInbox, function(peers) {
        peers.forEach(function(peer) {
            mb-appendPeerView(peer);
        });
    });
}

function updateScroll(JQ) {
    var element = JQ.get(0);
    element.scrollTop = element.scrollHeight;
}

var peerTmpl = [
    '<li class="list-group-item convo">',
    '  <div class="row">',
    '    <div style="display:none" class="convo_select col-xs-1">',
    '      <input type="checkbox" name="convo" id="convo-checkbox">',
    '    </div>',
    '    <div class="col-xs-3">',
    '      <img src="" class="img-circle">',
    '    </div>',
    '    <div class="sender_info col-xs-6">',
    '      <p class="truncate sender_name">',
    '      </p>',
    '      <p class="truncate unread-sender-abstract"></p>',
    '    </div>',
    '    <div class="col-xs-3">',
    '      <p class="pull-right truncate convo_last-timestamp"></p>',
    '      <span class="pull-right unread-count badge"></span>',
    '      <span class="pull-right lock-icon glyphicon glyphicon-lock text-muted"></span>',
    '    </div>',
    '  </div>',
    '</li>'
].join('\n');

function mb_createPeerView(peer) {
    var $peer = $(peerTmpl);

    $peer.attr('id', peer.token);
    if (peer.token === currentPeerToken)
        $peer.addClass('active');

    $peer.find('.img-circle').attr('src', peer.photoURL);
    $peer.find('.sender_name').text(peer.name);
    // if(peer.VIP)
    //     $peer.find('.sender_name').append($("<span class='vip-label label'>").text('VIP'));

    var $abs = $peer.find('.mb-unread-sender-abstract');
    var absMsg = peer.lastMessage.msg;
    absMsg = $('<p>' + absMsg + '</p>').text().substr(0,MAX_ABS_MSG_LENGTH);
    if (peer.lastMessage.senderToken === myToken)
        absMsg = i18n("me") + absMsg;
    if (!(peer.lastMessage.senderToken === myToken) && peer.locked)
        $abs.text(i18n('conversation_locked')).css('font-style', 'italic');
    else
        $abs.text(absMsg);
    if (peer.numUnread > 0)
        $abs.css('font-weight', 'bold');
    else
        $abs.css('font-weight', 'normal');

    var last = moment(peer.lastMessage.time).format('MMM Do');
    $peer.find('.mb-last-timestamp').text(last);
    if (peer.locked) {
        $peer.find('.mb-lock-icon').css('display', 'inline-block');
        $peer.find('.mb-unread-count').css('background-color', '#777777');
    }
    if (peer.numUnread > 0) {
        $peer.find('.mb-unread-count').text(peer.numUnread).css('display', 'inline-block');
        $peer.find('.mb-lock-icon').css('clear', 'none');
    }
    if (editConvos) {
        $peer.find('.mb-convo-select').show();
        $peer.find('.mb-sender_info').removeClass('col-xs-6').addClass('col-xs-5');
    }
    $peer.click(onClickPeer);
    return $peer;
}

function mb_appendPeerView(peer) {
    createPeerView(peer).appendTo($('.mb-convo_list'));
}

function mb_prependPeerView(peer) {
    createPeerView(peer).prependTo($('.mb-convo_list'));
}

function mb_appendMessageView(msg, imgUrl, isPrepend) {
    var $msg = $("<div class='row'>");
    $msg.append(
        $("<div class='bubble'>")
            .addClass(msg.senderToken == myToken ? 'me' : 'you')
            .html(msg.locked && !(msg.senderToken == myToken) ? i18n("msg_is_locked") :msg.msg)
    );

    if (isPrepend) {
        $msg.prependTo($('.mb-chat-box'));
        var top = $('.mb-chat-box').scrollTop(),
            height = $msg.height();
        $('.mb-chat-box').scrollTop(top + height);
    } else {
        $msg.appendTo($('.mb-chat-box'));
    }
    if (msg.senderToken === myToken){
        var readAt = msg.readAt;
        var readAtText;
        if (readAt === undefined){
            readAtText = i18n("shown_to_vip_only");
            $footer = $("<div class='bubble-footer'>").html(readAtText);
            $msg.after($footer);
            $footer.after("<div class='clear_both'>");
        }
        else if (readAt == 0)
            readAtText = i18n("not_read");
        else{
            readAtText = construct_client_time(readAt);
            $footer = $("<div class='bubble-footer'>").html(readAtText);
            $msg.after($footer);
            $footer.after("<div class='clear_both'>");
        }
    }
}

function backToConvoView() {
    $(".mb-chat-header").hide();
    $(".mb-chat-box").hide();
    $(".mb-chat-options").hide();
    $(".mb-chat-input-panel").hide();
    $(".mb-convo-options").show();
    $(".mb-convo-header").show();
    $(".mb-convo_list").show();
}

function mb_removeConvoFromList(token){
    var peers;
    if(showInbox)
        peers = inboxPeers;
    else
        peers = outboxPeers;
    var index = findPeerIndex(peers, token);
    if (index === -1 && predefinedActivePeer === null)
        throw new Error('current peer is gone');
    peers.splice(index, 1);
    if (peers.length > 0) {
        currentPeerToken = (peers.length > index && index !== -1) ? peers[index].token : peers[0].token;
    }else{
        currentPeerToken = null;
    }
    messages[token] = undefined;
    mb_removeConvoView($('#'+token));
}

function initView() {
    $(document).ready(function() {
        $('.rb-mb-conversations').height(window.innerHeight-NAVBAR_HEIGHT);
        $('.mb-chat-box').height(window.innerHeight-2*NAVBAR_HEIGHT-CHAT_HEADER_HEIGHT-CHAT_INPUT_HEIGHT);
    });

    function observeChatInput(val) {
        if(val.length > 0) {
            $('#mb-send-button').css({'color': "#ee3888"});
        } else {
            $('#mb-send-button').css({'color': "grey"});
        }
    }

    setInterval(function() { observeChatInput($('#mb-chat-input').val()); }, 100);

    $(window).on('popstate', function() {
        $('.mb-chat_panel').hide();
        $('.mb-convo-header').show();
        $('.mb-convo_list').show();
        $('.mb-convo-options').show();
        $('.mb-chat-options').hide();
        currentPeerToken = null;
    });

    $('.mb-chat-box').scroll(function(){
        if ($(this).scrollTop() == 0) {
            getMoreMessages();
        }
    });

    $('.mb-convo_list').scroll(function(){
        if ($(this).scrollTop() + $(this).height() >= $(this)[0].scrollHeight-NAVBAR_HEIGHT) {
            // alert("$(this).scrollTop() + $(this).height(): " +  ($(this).scrollTop() + $(this).height()).toString());
            // alert("$(this)[0].scrollHeight-NAVBAR_HEIGHT: " + ($(this)[0].scrollHeight-NAVBAR_HEIGHT).toString());
            // alert("getting more peers!!!");
            getMorePeers();
        }
    });
}
