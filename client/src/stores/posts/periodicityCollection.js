import * as Api from 'src/api';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';
import { PeriodicityModel } from './PeriodicityModel';
import { PeriodicityPost } from '../schemas';

export function usePeriodicityCollection() {
  const store = useStore();

  return store.entities.periodicity;
}

export const periodicityCollection = createCollection(PeriodicityModel, {
  getById: AsyncModel(getById),
});

function getById(id) {
  return async (flow, parent) => {
    const post = parent.get(id);

    if (post) return post;

    if (!post) {
      const res = await Api.Posts.getPeriodicity(id);

      flow.merge(res.data, PeriodicityPost);
    }
  };
}

