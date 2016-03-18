import ImageResources from '../utils/ImageResources';

export default class User {
    constructor(user){
        this.user = user;
    }
    get originData(){
        return this.user;
    }
    get data(){
        return {
            token:this.user.token,
            name:this.user.first_name,
            age:Math.floor(((new Date()).getTime()/1000 - this.user.birthday)/(365.25*24*3600)),
            mainPhoto:this.mainPhoto,
            isVIP: this.user.has_active_vip,
            address: this.user.location_short_description,
            aboutMe: this.user.about_me_short,
            gender:this.user.sex
        }
    }
    get mainPhoto(){
        if(this.user.main_photo){
            //this.user.main_photo.mobile_image_url = this.user.main_photo.small_image_url;
            return this.user.main_photo;
        }else{
            return {
                isSytstemDefault:true,
                large_image_url:ImageResources.no_profile,
                mobile_image_url:ImageResources.no_photo_thumb,
                small_image_url:ImageResources.no_photo_thumb
            }
        }
    }
}