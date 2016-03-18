export default class Detail {
    constructor(user){
        this.user = user;
    }
    get data(){
        return {
            general:this.getByNames(this.user, {firstName:'first_name',birthday:'birthday',gender:'sex',height:'height'}),
            location:{
                currentCountry:this.user.country,
                zipCode:this.user.location,
                currentRegion:this.user.state,
                city:this.user.city,
                timeZone:""
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
                interests:this.interests
            }
        }
    }
    getByNames(names){
        var res = {};
        for(var p in names){
            res[p] = {value:this.user[names[p]]};
        }
    }
    getDetailByNames(names){
        var res = {};
        for(var p in names){
            var item = this.user.profile_details[names[p]];
            if(item.values){
                res[p] = {
                    label:item.label,
                    values:item.values
                }
            }
        }
    }

    get currentCountry(){
        return {
            value:this.user.country
        }
    }
    get zipCode(){
        return {
            value:this.user.country
        }
    }

    get interests(){
        var ins = this.user.profile_details.interests;
        return {
            label:ins.label,
            values:ins.values
        }
    }
}