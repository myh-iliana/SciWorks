import { types as t } from 'mobx-state-tree';
import { AsyncModel } from '../utils';
import * as Api from '../../api';

export const AuthStore = t.model('AuthStore', {
  login: AsyncModel(loginFlow),
  register: AsyncModel(registerFlow),
  refreshToken: AsyncModel(refreshTokenFlow),
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

function refreshTokenFlow({ refreshToken }) {
  return async (flow, parent, root) => {
    const res = await Api.Auth.refreshToken({ refreshToken });

    Api.Auth.setTokens(res.data.accessToken, res.data.refreshToken);
    root.auth.setIsLoggedIn(true);
  };
}

function loginFlow({ username, password }) {
  return async (flow, parent, root) => {
    const res = await Api.Auth.login({ username, password });

    if (res.data) {
      Api.Auth.setTokens(res.data.accessToken, res.data.refreshToken);
      root.viewer.setViewer(res.data.user);
      root.auth.setIsLoggedIn(true);
      flow.setRedirect(true);
    }
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

    flow.setRedirect(true);
  };
}
