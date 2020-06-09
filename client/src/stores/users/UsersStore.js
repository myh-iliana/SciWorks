import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { UserModel } from './UserModel';
import { AsyncModel } from '../utils';
import { UserCollection } from '../schemas';

export const UsersStore = t
  .model('CathedrasStore', {
    items: t.array(t.reference(UserModel)),
    fetchAll: AsyncModel(fetchAll),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },

    remove(key) {
      store.items = store.items.filter(item => item.username !== key);
    },
  }));

function fetchAll() {
  return async (flow, parent) => {
    const res = await Api.Users.getAll();
    const result = flow.merge(res.data, UserCollection);

    parent.setItems(result);
  };
};
