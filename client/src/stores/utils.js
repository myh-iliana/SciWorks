import {
  applySnapshot,
  getParent,
  getRoot,
  getSnapshot,
  onSnapshot,
  types as t,
} from 'mobx-state-tree';
import { normalize } from 'normalizr';
import { apiPath } from '../components/App/App';

export function AsyncModel(thunk, auto = true) {
  const model = t
    .model({
      isLoading: false,
      isError: false,
      errorMsg: t.maybeNull(t.union(t.string, t.frozen())),
      redirect: false,
    })
    .actions((store) => ({
      start() {
        store.isLoading = true;
        store.isError = false;
        store.redirect = false;
        store.errorMsg = null;
      },

      finish() {
        store.isLoading = false;
        store.redirect = false;
      },

      error(err) {
        store.isError = true;
        store.redirect = false;
        if (err.response) {
          store.errorMsg = err.response.data.error;
        }
      },

      setRedirect(value) {
        store.redirect = value;
      },

      merge(data, schema) {
        const { result, entities } = normalize(data, schema);

        getRoot(store).entities.merge(entities);

        return result;
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

export function createCollection(ofModel, asyncModels = {}) {
  const collection = t
    .model('CollectionModel', {
      collection: t.map(ofModel),
      ...asyncModels,
    })
    .views((store) => ({
      get(key) {
        return store.collection.get(String(key));
      },
    }))
    .actions((store) => ({
      add(key, value) {
        store.collection.set(String(key), value);
      },
    }));

  return t.optional(collection, {});
}

export function createPersist(store) {
  const KEY = '_persist';

  onSnapshot(store, (snapshot) => {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        auth: { isLoggedIn: snapshot.auth.isLoggedIn },
        viewer: { user: snapshot.viewer.user },
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

export function editFiles(id, files, apiMethod) {
  return async (flow, parent, root) => {
    const post = parent.get(id);

    root.files.upload.run(files).then(async () => {
      const file = getSnapshot(root.files.items);

      if (file[0]) {
        post.setFiles(apiPath + file[0].filename);

        await apiMethod({ id, files: apiPath + file[0].filename });
      }
    });
  };
}
