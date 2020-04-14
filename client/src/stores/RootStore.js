import { flow, types as t } from 'mobx-state-tree';
import axios from 'axios';

import * as Api from 'src/api';
import { AuthStore } from './auth/AuthStore';
import { ViewerStore } from './users/ViewerStore';
import { CathedrasStore } from './cathedras/CathedrasStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),

    viewer: t.optional(ViewerStore, {}),
    cathedras: t.optional(CathedrasStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      try {
        const token = localStorage.getItem('_token');
        const refreshToken = localStorage.getItem('_refreshToken');
        Api.Auth.setTokens(token, refreshToken);

        if (token) {
          store.auth.setIsLoggedIn(true);
          const res = yield Api.Users.getMainUser();
          store.viewer.setViewer(res.data);
        } else {
          store.auth.setIsLoggedIn(false);
          store.viewer.setViewer(undefined);
          Api.Auth.logout();
        }
      } catch (err) {
        store.auth.setIsLoggedIn(false);
        store.viewer.setViewer(undefined);
        Api.Auth.logout();
      }
    }),
  }));
