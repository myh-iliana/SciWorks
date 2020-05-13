import { applySnapshot, getRoot, types as t } from 'mobx-state-tree';
import { CathedraModel } from '../cathedras/CathedraModel';

export const UserModel = t.model('UserModel', {
  username: t.identifier,
  id: t.number,
  fullName: t.string,
  email: t.maybe(t.string),
  isTeacher: false,
  isAdmin: false,
  cathedraId: t.maybeNull(t.number),
  createdAt: t.string,
  updatedAt: t.string,
  avatar: t.maybeNull(t.string),
  bio: t.maybeNull(t.string),

  cathedra: t.maybeNull(
    t.reference(CathedraModel, {
      get(identifier, parent) {
        if (identifier) {
          return getRoot(parent).entities.cathedras.get(identifier) || identifier;
        }

        return null;
      },

      set(value) {
        return value.id;
      },
    }),
  ),
})
  .preProcessSnapshot(snapshot => {
    if (snapshot) {
      return {
        ...snapshot,
        cathedra: snapshot.cathedra || snapshot.cathedraId,
      };
    }
  });
