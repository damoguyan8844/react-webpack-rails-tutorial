import App from './app.js';
import Login from './login.js';
import TestRender from './testRender.js';
import ReactOnRails from 'react-on-rails';

ReactOnRails.register(
    {
        App,
        TestRender,
        Login,
    }
);