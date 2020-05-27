import { types as t } from 'mobx-state-tree';

export const MonographModel = t.model('MonographModel', {
  id: t.identifierNumber,
  author: t.number,
  subauthors: t.maybeNull(t.string),
  title: t.string,
  section: t.string,
  monographPages: t.string,
  printPages: t.string,
  pages: t.string,
  year: t.number,
  annotations: t.maybeNull(t.string),
  isbn: t.maybeNull(t.string),
  doi: t.maybeNull(t.string),
  isEuLanguage: false,
  files: t.maybeNull(t.string),

  // UserPosts: t.optional(t.frozen(), {}),
});
