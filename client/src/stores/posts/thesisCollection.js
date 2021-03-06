import * as Api from 'src/api';
import { AsyncModel, createCollection, deletePost, editFiles, editPost } from '../utils';
import { useStore } from '../createStore';
import { ThesisPost } from '../schemas';
import { ThesisModel } from './ThesisModel';

export function useThesisCollection() {
  const store = useStore();

  return store.entities.thesis;
}

export const thesisCollection = createCollection(ThesisModel, {
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
      const res = await Api.Posts.getThesis(id);

      flow.merge(res.data, ThesisPost);
    }
  };
}

