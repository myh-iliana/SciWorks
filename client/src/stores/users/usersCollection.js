import * as Api from 'src/api';
import { UserModel } from './UserModel';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';
import { User } from '../schemas';
import { applySnapshot } from 'mobx-state-tree';

export function useUserCollection() {
  const store = useStore();

  return store.entities.users;
}

export const usersCollection = createCollection(UserModel, {
  getUser: AsyncModel(getUser),
  edit: AsyncModel(edit),
});

function getUser(username) {
  return async (flow, parent) => {
    if (parent.get(username)) {
      return parent.get(username);
    } else {
      const res = await Api.Users.getUser(username);

      flow.merge(res.data, User);
    }
  };
}

function edit(data) {
  return async (flow, parent) => {
    const user = parent.get(data.id);
    const res = await Api.Users.edit(data);

    applySnapshot(user, res.data);
    flow.setRedirect(true);
  };
}

