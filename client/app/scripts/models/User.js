import ImageResources from '../utils/ImageResources';
export default class User {
    constructor(user,userStatus){
        this.user = user;
        this.curStatus = userStatus;
    }
    static defaultMainPhoto(){
        return {
            isSystemDefault:true,
            large_image_url:ImageResources.no_profile,
            mobile_image_url:ImageResources.no_profile,
            small_image_url:ImageResources.no_photo_thumb
        }
    }
    get originData(){
        return this.user;
    }
    get data(){
        return {
            userStatus:this.userStatus,
            overview:this.overview,
            insight:this.insight,
            detail:this.detail,
            photos:this.user.user_photos,
            lookingFor:this.user.looking_for_details,
            match:this.match,
            commonInterests:this.user.common_interests
        }
    }
    get userStatus(){
        if(this.curStatus){
            return {
                charmLevel: this.curStatus.charm_level,
                charmProgress: this.curStatus.progress_to_next_level,
                customSearch: this.curStatus.custom_search,
                favoredByCount: this.curStatus.favored_by_count,
                messageUser: this.curStatus.message_user,
                photoStatus: this.curStatus.photo_status,
                rewardPointsCount: this.curStatus.reward_points_count,
                seeVisitors: this.curStatus.see_visitors,
                unreadMatchedCount: this.curStatus.unread_matched_by_count,
                unreadVisitedCount: this.curStatus.unread_visited_by_count,
                vipStatus: this.curStatus.vip_status,
                unreadFavoredCount:this.curStatus.unread_favored_by_count
            }
        }
        else{
            return {

            }
        }
    }
    get mainPhoto(){
        if(this.user.main_photo){
            return this.user.main_photo;
        }else{
            if(this.user.photos && this.user.photos.length >0){
                var validPhotos = this.user.photos.filter((p)=>(p.user_photo.flagged > 0));
                if(validPhotos.length > 0){
                    return validPhotos[0].user_photo;
                }
            }
            return User.defaultMainPhoto();
        }
    }
    get overview(){
        return {
            email:this.user.email,
            token:this.user.token,
            name:this.user.first_name,
            gender:this.user.sex,
            age:Math.floor(((new Date()).getTime()/1000 - this.user.birthday)/(365.25*24*3600)),
            height:this.user.height,
            address:this.user.location_short_description,
            isOnline:this.user.online,
            isVIP:this.user.has_active_vip,
            mainPhoto:this.mainPhoto,
            profileProgress:this.user.profile_progress,
            birthday:this.user.birthday,
            locale:this.user.preferred_locale?this.user.preferred_locale:'en',
            aboutMe:this.user.about_me_short,
            seeking:this.user.seeking,
            favorited:this.user.favorited_by_current_user,
            emailConfirmed:this.user.email_confirmed,
            userPhotoStatus:this.user.user_photo_status,
            profileProgressDetails:this.user.profile_progress_details,
            goalProgressDetails:this.user.goal_progress_details,
            lat:this.user.lat,
            lng:this.user.lng,
            userType:this.user.user_type//{'dummy' => -1, "user" => 0, "elite" => 1, "staff" => 2, "admin" => 3, "reviewer" => 4 }
        }
    }
    get insight(){
        var questions = this.user.open_answers.map(function(q){
            return {
                id:q.open_answer.open_question.id,
                description:q.open_answer.open_question.description,
                tooltip:q.open_answer.open_question.tooltip,
                answer:q.open_answer.answer
            }
        }.bind(this));
        return {
            questions:questions
        };
    }
    get detail(){
        return {
            general:{
                name:this.user.first_name,
                birthday:this.user.birthday,
                gender:this.user.sex,
                height:this.user.profile_details.height
            },
            location:{
              currentCountry:this.user.country,
              zipCode:this.user.location,
              currentRegion:this.user.state,
              city:this.user.city,
              timeZone:this.user.settings && this.user.settings.preferred_timezone
            },
            detail:{
              bodyType:this.user.profile_details.body_type,
              maritalStatus:this.user.profile_details.marital_status,
              haveChildren:this.user.profile_details.has_children,
              birthplace: this.user.profile_details.birth_country,
              ethnicity:this.user.profile_details.ethnicity
            },
            background:{
              education: this.user.profile_details.education,
              occupation:this.user.profile_details.occupation,
              income:this.user.profile_details.income,
              immigration:this.user.profile_details.immigration,
              firstArrived:this.user.profile_details.first_arrive
            },
            qualities:{
                faith:this.user.profile_details.religion,
                smoke:this.user.profile_details.smoking,
                drink:this.user.profile_details.drinking,
                language:this.user.profile_details.languages,
                interests:this.user.profile_details.interests
            }
        }
    }
    get match() {
        return {
            general: {
                gender: this.user.seeking,
                ages: this.user.looking_for_details.age,
                height: this.user.looking_for_details.height
            },
            personal:{
                bodyType: this.user.looking_for_details.body_type,
                drinking: this.user.looking_for_details.drinking,
                smoking: this.user.looking_for_details.smoking,
                faith: this.user.looking_for_details.religion
            },
            background:{
                birthplace: this.user.looking_for_details.birth_country,
                ethnicity: this.user.looking_for_details.ethnicity,
                languages: this.user.looking_for_details.languages,
                immigration: this.user.looking_for_details.immigration
            },
            status:{
                maritalStatus:this.user.looking_for_details.marital_status,
                haveChildren:this.user.looking_for_details.has_children,
                occupation:this.user.looking_for_details.occupation,
                income:this.user.looking_for_details.income

            }
        }
    }
}