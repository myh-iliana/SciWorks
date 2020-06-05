import * as Api from 'src/api';
import { AsyncModel, createCollection, deletePost, editFiles, editPost } from '../utils';
import { useStore } from '../createStore';
import { MonographPost } from '../schemas';
import { MonographModel } from './MonographModel';

export function useMonographsCollection() {
  const store = useStore();

  return store.entities.monographs;
}

export const monographsCollection = createCollection(MonographModel, {
  getById: AsyncModel(getById),
  editFiles: AsyncModel(editFiles),
  deleteById: AsyncModel(deletePost),
  editPost: AsyncModel(editPost),
});

function getById(id) {
  return async (flow, parent) => {
    const post = parent.get(id);

    if (post) return post;

    if (!post) {
      const res = await Api.Posts.getMonograph(id);

      flow.merge(res.data, MonographPost);
    }
  };
}
