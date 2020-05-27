import { types as t } from 'mobx-state-tree';
import { usersCollection } from './users/usersCollection';
import { cathedrasCollection } from './cathedras/cathedrasCollection';
import { periodicityCollection } from './posts/periodicityCollection';
import { monographsCollection } from './posts/monographsCollection';
import { thesisCollection } from './posts/thesisCollection';

export const EntitiesStore = t
  .model('EntitiesStore', {
    users: usersCollection,
    cathedras: cathedrasCollection,
    periodicity: periodicityCollection,
    thesis: thesisCollection,
    monographs: monographsCollection,
  })
  .actions((store) => ({
    merge(entities) {
      Object.keys(entities).forEach((collectionName) => {
        const collectionEntities = entities[collectionName];

        Object.keys(collectionEntities).forEach((id) => {
          const value = collectionEntities[id];

          store[collectionName].add(id, value);
        });
      });
    },
  }));
