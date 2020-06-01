import { types as t } from 'mobx-state-tree';

export const ThesisModel = t.model('ThesisModel', {
  id: t.identifierNumber,
  author: t.number,
  subauthors: t.maybeNull(t.string),
  udc: t.string,
  title: t.string,
  conference: t.string,
  city: t.string,
  dates: t.string,
  collectionPages: t.string,
  pages: t.string,
  annotations: t.maybeNull(t.string),
  issn: t.maybeNull(t.string),
  doi: t.maybeNull(t.string),
  isScopusAndWS: false,
  isScientometrics: false,
  isInternational: false,
  files: t.maybeNull(t.string),
  createdAt: t.string,
  updatedAt: t.string,

  Users: t.optional(t.frozen(), []),
});
