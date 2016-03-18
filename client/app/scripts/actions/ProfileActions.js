
export const PROFILE_CREATE_USER = "PROFILE_CREATE_USER";
export const GET_COUNTRIES = "GET_COUNTRIES";

export function createUser(user){
    return {
        type:PROFILE_CREATE_USER,
        user:user
    };
}

export function getCountries(){
    return {
        type:GET_COUNTRIES,
        countries:countries
    };
}