import { types as t } from 'mobx-state-tree';

export const UserModel = t.model('UserModel', {
  id: t.identifierNumber,
  fullName: t.string,
  username: t.maybeNull(t.string),
  email: t.maybe(t.string),
  isTeacher: false,
  isAdmin: false,
  cathedraId: t.maybeNull(t.number),
  createdAt: t.string,
  updatedAt: t.string,
});
