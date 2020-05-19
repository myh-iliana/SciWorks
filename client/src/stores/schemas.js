import { schema } from 'normalizr';

export const PeriodicityPost = new schema.Entity('periodicity');
export const ThesisPost = new schema.Entity('thesis');
export const MonographPost = new schema.Entity('monographs');

export const User = new schema.Entity('users', {
  Periodicities: [PeriodicityPost],
  Theses: [ThesisPost],
  Monographs: [MonographPost],
}, {
  idAttribute: (entity) => entity.username,
});
export const UserCollection = [User];

export const Cathedra = new schema.Entity('cathedras', {
  // workers: User
});
export const CathedraCollection = [Cathedra];
