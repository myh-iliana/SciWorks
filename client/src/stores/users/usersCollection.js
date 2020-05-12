import { values } from 'mobx';

import * as Api from 'src/api';
import { UserModel } from './UserModel';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';
import { User } from '../schemas';

export function useUserCollection() {
  const store = useStore();

  return store.entities.users;
}

export const usersCollection = createCollection(UserModel, {
  getUser: AsyncModel(getUser),
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

