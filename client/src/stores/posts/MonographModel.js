import { types as t } from 'mobx-state-tree';

export const MonographModel = t.model('MonographModel', {
  id: t.identifierNumber,
  authorId: t.number,
  subauthors: t.maybeNull(t.string),
  title: t.string,
  section: t.string,
  monographPages: t.string,
  printPages: t.number,
  pages: t.number,
  year: t.number,
  annotations: t.maybeNull(t.string),
  isbn: t.maybeNull(t.string),
  doi: t.maybeNull(t.string),
  isEuLanguage: false,
  files: t.maybeNull(t.string),
});
