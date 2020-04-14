import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { CathedraModel } from './CathedraModel';
import { AsyncModel } from '../utils';

export const CathedrasStore = t
  .model('CathedrasStore', {
    items: t.array(CathedraModel),
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

    parent.setItems(res.data);
  };
}
