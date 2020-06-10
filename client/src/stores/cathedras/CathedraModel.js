import { types as t } from 'mobx-state-tree';

export const CathedraModel = t.model('CathedraModel', {
  id: t.identifierNumber,
  name: t.string,
  workers: t.optional(t.frozen(), []),
});
