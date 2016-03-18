import React from 'react';
import { Provider } from 'react-redux';
import PrintTest from './PrintTest.js';

export default props => {
    const store = createStore(props);
    return (
        <Provider>
            <PrintTest />
        </Provider>
    );
};