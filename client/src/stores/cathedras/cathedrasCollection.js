import * as Api from 'src/api';
import { CathedraModel } from './CathedraModel';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';
import { Cathedra } from '../schemas';

export function useCathedrasCollection() {
  const store = useStore();

  return store.entities.cathedras;
}

export const cathedrasCollection = createCollection(CathedraModel, {
  getById: AsyncModel(getById),
});

function getById(id) {
  return async (flow, parent) => {
    const cathedra = parent.get(id);

    if (cathedra) return cathedra;

    if (!cathedra) {
      const res = await Api.Cathedra.getById(id);

      flow.merge(res.data, Cathedra);
    }
  };
}

