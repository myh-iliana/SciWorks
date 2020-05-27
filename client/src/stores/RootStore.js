import { flow, types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { AuthStore } from './auth/AuthStore';
import { ViewerStore } from './users/ViewerStore';
import { CathedrasStore } from './cathedras/CathedrasStore';
import { getAccessToken, getRefreshToken } from '../api/utils';
import { EntitiesStore } from './EntitiesStore';
import { FilesStore } from './files/FilesStore';
import { UsersStore } from './users/UsersStore';
import { UserPostsStore } from './posts/UserPostsStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),

    viewer: t.optional(ViewerStore, {}),
    users: t.optional(UsersStore, {}),
    // userPosts: t.optional(UserPostsStore, {}),

    cathedras: t.optional(CathedrasStore, {}),

    files: t.optional(FilesStore, {}),

    entities: t.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      try {
        const token = getAccessToken();
        const refreshToken = getRefreshToken();

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
