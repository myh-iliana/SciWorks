import { types as t } from 'mobx-state-tree';
import { UserModel } from './UserModel';

export const ViewerStore = t
  .model('ViewerStore', {
    user: t.maybe(UserModel),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));
