import App from './ClientApp';
import RouterApp from './ClientRouterApp';
import Login from '../../../Login.js';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import ReactOnRails from 'react-on-rails';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register(
  {
    App,
    RouterApp,
    Login,
    SimpleCommentScreen,
  }
);
