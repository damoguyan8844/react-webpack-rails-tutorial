/*
function popup_flash_msg(key,msg)
{
    var flash_div = $('<div>').addClass(key).html(msg);
    var close_button = $('<span>').addClass('flash_msgs_close_button');
    flash_div.append(close_button);
    $('#flash_msgs').append(flash_div);
    flash_div.delay(500).fadeIn('slow').delay(5000).fadeOut('slow');

    $(".flash_msgs_close_button").on('click',function(){
        flash_div.stop().fadeOut('slow');
    });
}
*/
function objToArray(obj){
    var items = [];
    for(var item in obj) {
        items.push({name: item, value: obj[item]});
    }
    return items;
};

function getGender(val){
    if(val ==1){
        return "male";
    }
    else{
        return "female";
    }
}