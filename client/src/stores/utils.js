import { applySnapshot, getParent, getRoot, onSnapshot, types as t } from 'mobx-state-tree';
import axios from 'axios';

export function AsyncModel(thunk, auto = true) {
  const model = t
    .model({
      isLoading: false,
      isError: false,
      errorMsg: t.maybeNull(t.string),
    })
    .actions((store) => ({
      start() {
        store.isLoading = true;
        store.isError = false;
        store.errorMsg = null;
      },

      finish() {
        store.isLoading = false;
      },

      error(err) {
        store.isError = true;
        if (err.response) {
          store.errorMsg = err.response.data.error;
        }
      },

      run(...args) {
        const promise = thunk(...args)(store, getParent(store), getRoot(store));

        if (auto) {
          return store._auto(promise);
        }

        return promise;
      },

      async _auto(promise) {
        try {
          store.start();
          await promise;
        } catch (err) {
          console.log(err);
          store.error(err);
        } finally {
          store.finish();
        }
      },
    }));

  return t.optional(model, {});
}

export function createPersist(store) {
  const KEY = '_persist';

  onSnapshot(store, (snapshot) => {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        auth: { isLoggedIn: snapshot.auth.isLoggedIn },
        viewer: { user: snapshot.viewer.user }
      }),
    );
  });

  function rehydrate() {
    const snapshot = localStorage.getItem(KEY);

    if (snapshot) {
      applySnapshot(store, JSON.parse(snapshot));
    }
  }

  return { rehydrate };
}
