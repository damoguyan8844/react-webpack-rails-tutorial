import Constants from './Constants.js';


export default {
    showUser: (user) => ({type:Constants.SEARCH.SHOW_USER, user:user}),
    destroySearchUser: () => ({type:Constants.SEARCH.DESTROY_SEARCH_USER}),
    quickView: (searchUser) => ({type:Constants.SEARCH.QUICK_VIEW, searchUser:searchUser}),
    searchCriterias:(criterias,param) => ({type:Constants.SEARCH.SEARCH_CRITERIAS,criterias:criterias,strCriteria:param}),
    usedMulitCriterias:(multiCriterias) => ({type:Constants.SEARCH.USED_MULTI_CRITERIAS,multiCriterias:multiCriterias}),
    saveSearchRst:(searchResult,curPage) => ({type:Constants.SEARCH.SEARCH_RESULT,searchResult:searchResult,curPage:curPage})
}
