import { types as t } from 'mobx-state-tree';

export const PeriodicityModel = t.model('PeriodicityModel', {
  id: t.identifierNumber,
  authorId: t.number,
  subauthors: t.maybeNull(t.string),
  udc: t.string,
  title: t.string,
  journal: t.string,
  issueNumber: t.number,
  journalPages: t.number,
  pages: t.number,
  annotations: t.maybeNull(t.string),
  issn: t.maybeNull(t.string),
  doi: t.maybeNull(t.string),
  isScopusAndWS: false,
  isScientometrics: false,
  isProfessional: false,
  isElectronic: false,
  files: t.maybeNull(t.string),
});
