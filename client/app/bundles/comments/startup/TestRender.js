import React from 'react';
import { Provider } from 'react-redux';
import PrintTest from './PrintTest.js';

import createStore from '../store/commentsStore';
export default props => {
    const store = createStore(props);
    return (
        <Provider>
            <PrintTest />
        </Provider>
    );
};