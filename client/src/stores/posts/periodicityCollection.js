import * as Api from 'src/api';
import { AsyncModel, createCollection, deletePost, editFiles } from '../utils';
import { useStore } from '../createStore';
import { PeriodicityModel } from './PeriodicityModel';
import { PeriodicityPost } from '../schemas';

export function usePeriodicityCollection() {
  const store = useStore();

  return store.entities.periodicity;
}

export const periodicityCollection = createCollection(PeriodicityModel, {
  getById: AsyncModel(getById),
  editFiles: AsyncModel(editFiles),
  deleteById: AsyncModel(deletePost),
});

function getById(id) {
  return async (flow, parent) => {
    if (parent.get(id)) {
      return parent.get(id);
    } else {
      const res = await Api.Posts.getPeriodicity(id);

      flow.merge(res.data, PeriodicityPost);
    }
  };
}
