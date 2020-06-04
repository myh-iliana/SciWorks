import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { AsyncModel } from '../utils';

export const FilesStore = t
  .model('FilesStore', {
    upload: AsyncModel(upload),
    items: t.optional(t.array(t.frozen()), []),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
  }));

function upload(files) {
  return async (flow, parent) => {
    const data = new FormData();

    [...files].forEach((file) => data.append(`files`, file));

    const res = await Api.Files.upload(data);

    parent.setItems(res.data);
    return res.data;
  };
}
