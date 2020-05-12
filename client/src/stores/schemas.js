import { schema } from 'normalizr';

export const User = new schema.Entity('users', {}, {
  idAttribute: (entity) => entity.username,
});
export const Cathedra = new schema.Entity('cathedras', {
  // workers: User
});

export const CathedraCollection = [Cathedra];
export const UserCollection = [User];
