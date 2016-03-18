
import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from './LoginPage.js';

import createStore from './bundles/comments/store/commentsStore';
export default props => {
    const store = createStore(props);
    return (
        <Provider store={store}>
            <LoginPage />
        </Provider>
    );
};