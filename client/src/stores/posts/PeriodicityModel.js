import { types as t } from 'mobx-state-tree';

export const PeriodicityModel = t
  .model('PeriodicityModel', {
    id: t.identifierNumber,
    author: t.number,
    subauthors: t.maybeNull(t.string),
    udc: t.string,
    title: t.string,
    journal: t.string,
    issueNumber: t.union(t.number, t.string),
    journalPages: t.string,
    pages: t.string,
    annotations: t.maybeNull(t.string),
    issn: t.maybeNull(t.string),
    doi: t.maybeNull(t.string),
    isScopusAndWS: false,
    isScientometrics: false,
    isProfessional: false,
    isElectronic: false,
    files: t.maybeNull(t.string),
    createdAt: t.string,
    updatedAt: t.string,

    Users: t.optional(t.frozen(), []),
  })
  .actions((store) => ({
    setFiles(value) {
      store.files = value;
    },
  }));
