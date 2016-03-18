import axios from 'axios';
// import queryString from 'query-string';


function callAPI(url,type,isSSL,data,isForm){
    var prefix = "/en/api/v2/";
    var header =  {
        "X-2RB-API-VERSION":"v2","X-MOBILE-DEVICE":"iPhone",'X-2RB-WEBVIEW': '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)',"X-2RB-APNS-DEVICE-TOKEN":"API_TEST",'Content-Type':"application/x-www-form-urlencoded"
    };
    if(isSSL){
        if (process.env.NODE_ENV === 'development') {
            prefix = "/en/loginapi/v2/";
        }
        header =  {
            "X-2RB-API-VERSION":"v2","X-MOBILE-DEVICE":"iPhone",'X-2RB-WEBVIEW': '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)',"X-2RB-APNS-DEVICE-TOKEN":"API_TEST",'Content-Type':"application/x-www-form-urlencoded"
        };
    }
    if(isForm)
        header =  {
            "X-2RB-API-VERSION":"v2","X-MOBILE-DEVICE":"iPhone",'X-2RB-WEBVIEW': '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)',"X-2RB-APNS-DEVICE-TOKEN":"API_TEST",'Content-Type':"multipart/form-data"
        };
    if(type == "post"){
        return axios.post(prefix + url,data,{headers:header});
    }
    else if(type == "put"){
        return axios.put(prefix + url, data, {headers:header});
    }
    else if(type == "delete"){
        return axios.delete(prefix + url,{headers:header});
    }
    else if(type == "get"){
        return axios.get(prefix + url,{headers:header});
    }
};
module.exports = {
    photoUploadUrl:'/en/api/v2/user_photos',
    getMe(){
        return callAPI('me?show_attribute_options=true','get',false,{},false);
    },
    login(email, pass){
        var data = `user_session[email]=${email}&user_session[password]=${pass}`;
        return callAPI('user_sessions','post',true,data,true)
    },
    logOut(){
        return callAPI('logout','post',true,{},false);
    },
    setClientLocale(localeCode){
        var data = `lang=${localeCode}`;
        //return axios.post('/api/client_set_locale',data,
        //    {headers:{'Content-Type':"application/x-www-form-urlencoded"}})
        return callAPI('client_set_locale','post',false,data,true)

    },
    getUser(userId){
        return callAPI('users/'+userId,'get',false,{},false);
    },
    //getConstantData(){
    //    return axios.get('/en/api/v1/constant_data/',{headers: {
    //        'X-2RB-WEBVIEW': '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)'
    //    }});
    //},
    getConstantData(){
        return callAPI('constant_data','get',false,{},false);
    },
    deletePhoto(id){
        return callAPI('user_photos/'+id,'delete',false,{},false)
    },
    getUserList(params){
        params = (params == "" ? "" : "?" + params);
        return callAPI('users/' + params,'get',false,{},false);
    },
    favorite(userId){
        var data = `favorite_id=${userId}`;
        return callAPI('favoritisms','post',false,data,true)
    },
    unFavorite(userId){
        var data = `favorite_id=${userId}`;
        return callAPI('favoritisms/deactivate','post',false,data,true);
    },
    blockUser(userId){
        var data = `blocked_id=${userId}`;
        return callAPI('blockings','post',false,data,true)
    },
    unblockUser(userId){
        var data = `blocked_id=${userId}`;
        return callAPI('blockings/deactivate','post',false,data,true)
    },
    // reportUser(userToken, specId, comment){
    //     let data = {
    //             target_user_token: userToken,
    //             feedback: {
    //                 comment: comment,
    //                 feedback_spec_id: specId.toString()
    //             }
    //         };
    //     let params = queryString.stringify({
    //         target_user_token: userToken,
    //         feedback: JSON.stringify({
    //             comment: comment,
    //             feedback_spec_id: specId.toString()
    //         })
    //     });
    //     return callAPI('feedbacks/report_inappropriate_profile',
    //                    'post',
    //                    false,
    //                    params,
    //                    false);

    // },
    resetPassword(email){
        var params = `email=${email}`;
        return callAPI('password_resets','post', false,params,true)
    },
    resendEmailVerification(){
        return callAPI('resend_activation','get',false,{},false);
    },
    setAsMainPhoto(photoId,cropData){
        var data = `user_photo[is_main]=true`;
        if(cropData){
          data += `&user_photo[crop_x]=${cropData.x}&user_photo[crop_y]=${cropData.y}&user_photo[crop_w]=${cropData.width}&user_photo[crop_h]=${cropData.height}&user_photo[rotate]=${cropData.rotate}`;
        }
        return callAPI(`user_photos/${photoId}`,'put',false,data,true);
    },
    setPhotoTag(photoId,tag){
        var data = `tag[${tag.index}]=${tag.index}`;
        return callAPI(`user_photos/${photoId}/photo_tag`,'post',false,data,true);
    },
    unSetPhotoTag(photoId,tag){
        return callAPI(`user_photos/${photoId}/photo_tag/${tag.index}`,'delete',false,{},true);
    },
    updatePhotoCaption(photoId,caption){
        var data =`id=${photoId}&caption=${caption}`;
        return callAPI(`user_photos/${photoId}/caption`,'post',false,data,true)
    },
    getSubscriptions(){
        return callAPI('subscriptions','get',false,{},false);  //client_iap_vip_plans
    },
    purchaseVIP(params){
        return callAPI('subscriptions','post',true,params,false);
    },
    updateMeWithSSL(params){
        return callAPI('users/me','put',true,params,false);
    },
    updateMe(params){
        return callAPI('me/update','post',false,params,false);
    },
    getVisitors(pageParams){
        return callAPI('visitations/visitors' + pageParams,'get',false,{},false);
    },
    getVisitedUsers(pageParams){
        return callAPI('visitations'+ pageParams,'get',false,{},false);
    },
    getFavoritedUsers(pageParams){
        return callAPI('favoritisms'+ pageParams,'get',false,{},false);
    },
    getFavoritedMeUsers(pageParams){
        return callAPI('favoritisms/favorited_me'+ pageParams,'get',false,{},false);
    },
    saveQuestion(questionId, answer){
        var data =`open_answer[open_question_id]=${questionId}&open_answer[answer]=${answer}`;
        return callAPI('open_answers/update_answer','post',false,data,true);
    },
    getSettings(){
        return callAPI('setting','get',false,{},false);
    },
    updateSettings(settings){
        return callAPI('setting','put',false,settings,false);
    },
    getState(){
        return callAPI('states','get',false,{},false);
    },
    disableAccount(params){
        var params = '';
        return callAPI('disable_account','post',false,params,false);
    },
    deleteAccount(params){
        var params = '';
        return callAPI('delete_account','post',false,params,false);
    },
    getRecommendUsers(){
        return callAPI('recommend_user?limit=5','get',false,{},false);
    },
    consumingDiamonds(feature, token){
        var data = `feature=${feature}&other_user_token=${token}`;
        return callAPI('reward_points/redeem','post',false,data,false);
    },
    oAuthByThird(params){
        return callAPI('auth/'+params,'post',true,[],false);
    },
    resolveZipCode(country,zip){
        var params = "?zip=" + zip + "&country="+ country;
        return callAPI('zip_codes/resolve' + params,'get',false,{},false);
    },
    getTimezone(country){
        var params = "?choosed_country="+ country;
        return callAPI('construct_timezones_list' + params,'get',false,{},false);
    },
    getEventList(lat,lng){

        return callAPI('events?lat='+lat+'&lng='+lng,'get',false,{},false);

    },
    getVIPPlans(){
        return callAPI('subscriptions/basic_vip_plans','get',false,{},false);
    },
    getDiamondPlan(){
        return callAPI('client_reward_point_plans','get',false,{},false);
    },
    purchaseDiamonds(params){
        return callAPI('reward_points/purchase','post',true,params,false);
    },
    getVIPPayPalUrl(planID){
        return callAPI(`ppayments/process_subscription?plan_id=${planID}`,'get',false,{},false);
    },
    getDiamondPayPalUrl(productOfferId){
        return callAPI(`ppayments/process_diamonds_purchase?product_offer_id=${productOfferId}`,'get',false,{},false);
    },
    callWeibo(){
        return axios.get('https://api.weibo.com/oauth2/authorize?redirect_uri=http%3A%2F%2Fdev.2redbeans.com%2Fen%2Fauth%2Fweibo%2Fcallback&response_type=code&client_id=1610656247&state=f150fb3b1f21c4fe14230a759079759533bf72f95e1fd349&scope=all', {
            headers: {
                'X-2RB-WEBVIEW': '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)'
            }
        });
    },
    getEvents(){
        return callAPI('events','get',false,{},false);
    },
    getEventDetail(id){
        return callAPI(`events/${id}`,'get',false,{},false);
    },
    getPastEvent(){
        return callAPI(`event_past`,'get',false,{},false);
    },
    getFeeds(pageIndex,pagenationToken){
        const url = pageIndex?`feeds?page=${pageIndex}&pagination_token=${pagenationToken}`:'feeds';
        return callAPI(url,'get',false,{},false);
    }

}
