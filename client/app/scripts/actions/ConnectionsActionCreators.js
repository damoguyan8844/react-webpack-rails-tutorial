import Constants from './Constants.js';


export default {
    createVisitors: (users,curPage,nextPage,pageToken) => ({type:Constants.CONNECTIONS.CREATE_VISITORS, users:users,nextPage:nextPage,pageToken:pageToken,curPage:curPage}),
    createVisited: (users,curPage,nextPage,pageToken) => ({type:Constants.CONNECTIONS.CREATE_VISITED, users:users,nextPage:nextPage,pageToken:pageToken,curPage:curPage}),
    createFavorited: (users,curPage,nextPage,pageToken) => ({type:Constants.CONNECTIONS.CREATE_FAVORITED, users:users,nextPage:nextPage,pageToken:pageToken,curPage:curPage}),
    createFavoritedMe: (users,curPage,nextPage,pageToken) => ({type:Constants.CONNECTIONS.CREATE_FAVORITEDME, users:users,nextPage:nextPage,pageToken:pageToken,curPage:curPage}),
    showUser: (user) => ({type:Constants.CONNECTIONS.SHOW_USER, user:user}),
    destroySearchUser: () => ({type:Constants.CONNECTIONS.DESTROY_SEARCH_USER}),
    quickView: (searchUser) => ({type:Constants.CONNECTIONS.QUICK_VIEW, searchUser:searchUser}),
    setLoadingData: (loading) => ({type:Constants.CONNECTIONS.LOAD_DATA, loading:loading})
}
