import { types as t } from 'mobx-state-tree';
import { AsyncModel } from '../utils';
import * as Api from '../../api';

export const AuthStore = t.model('AuthStore', {
  login: AsyncModel(loginFlow),
  register: AsyncModel(registerFlow),
  isLoggedIn: false,
}).actions(store => ({
  setIsLoggedIn(value) {
    store.isLoggedIn = value;
  },

  logout() {
    store.isLoggedIn = false;
    Api.Auth.logout();
  },
}));

function loginFlow({ username, password }) {
  return async (flow, parent, root) => {
    const res = await Api.Auth.login({ username, password });

    Api.Auth.setTokens(res.data.accessToken, res.data.refreshToken);
    root.viewer.setViewer(res.data.user);
    root.auth.setIsLoggedIn(true);
  };
}

function registerFlow({ fullName, username, email, password, passConfirm, isTeacher, cathedraId }) {
  return async (flow, parent, root) => {
    await Api.Auth.register({
      fullName,
      username,
      email,
      password,
      passConfirm,
      isTeacher,
      cathedraId,
    });
  };
}
