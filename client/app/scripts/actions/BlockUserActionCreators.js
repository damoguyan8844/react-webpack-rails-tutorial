import { BLOCK_USER } from './Constants.js';

export default {
  openBlockUserModal: () => ({ type: BLOCK_USER.OPEN_MODAL }),
  closeBlockUserModal: () => ({ type: BLOCK_USER.CLOSE_MODAL })
};
