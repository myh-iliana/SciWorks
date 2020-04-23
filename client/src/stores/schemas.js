import { schema } from 'normalizr';

export const User = new schema.Entity('users');
export const Cathedra = new schema.Entity('cathedras', {
  // workers: User
});

export const CathedraCollection = [Cathedra];
export const UserCollection = [User];
