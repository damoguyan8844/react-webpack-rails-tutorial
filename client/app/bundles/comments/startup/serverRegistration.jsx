// Example of React + Redux
import AppCom from './ServerApp';
import RouterApp from './ServerRouterApp';
import TestRender from './TestRender.js';
import Login from '../../../Login.js';
import App from '../../../app.js';
import ReactOnRails from 'react-on-rails';

ReactOnRails.register(
    {
      AppCom,
      RouterApp,
      Login,
      App,
      TestRender,
    }
);
