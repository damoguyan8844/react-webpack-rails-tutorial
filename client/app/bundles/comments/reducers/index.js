import meReducer from './meReducer';
import { $$meState as meState } from './meReducer';

export default {
  me: meReducer,
};

export const initalStates = {
  meState,
};
