

module.exports = {
    request(endpoint,data,cb){

    },
    authenticate(token){
    },
    setClientLocale(localeCode){
        var data = `lang=${localeCode}`;
        return axios.post('/api/client_set_locale',data,
            {headers:{'Content-Type':"application/x-www-form-urlencoded"}})
    },
    getUser(userId){
        return axios.get('/api/users/'+userId);
    }
}