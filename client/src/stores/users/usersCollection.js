import { UserModel } from './UserModel';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';

export function useUserCollection() {
  const store = useStore();

  return store.entities.users;
}

export const usersCollection = createCollection(UserModel, {
  getUser: AsyncModel(getUser),
});

function getUser(id) {
  return async (flow, parent) => {
    let user = parent.get(id);

    if (!user) {}
  };
}

