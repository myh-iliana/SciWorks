import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { CathedraModel } from './CathedraModel';
import { AsyncModel } from '../utils';
import { CathedraCollection } from '../schemas';

export const CathedrasStore = t
  .model('CathedrasStore', {
    items: t.array(t.reference(CathedraModel)),
    fetchAll: AsyncModel(fetchAll),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
  }));

function fetchAll() {
  return async (flow, parent) => {
    const res = await Api.Cathedra.getAll();
    const result = flow.merge(res.data, CathedraCollection);

    parent.setItems(result);
  };
}
