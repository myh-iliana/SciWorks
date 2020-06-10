import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { AsyncModel } from '../utils';
import { MonographModel } from './MonographModel';
import { PeriodicityModel } from './PeriodicityModel';
import { ThesisModel } from './ThesisModel';
import { MonographCollection, PeriodicityCollection, ThesisCollection } from '../schemas';

export const PostsStore = t
  .model('UserPostsStore', {
    periodic: t.array(t.reference(PeriodicityModel)),
    thesis: t.array(t.reference(ThesisModel)),
    monographs: t.array(t.reference(MonographModel)),

    fetchPeriodic: AsyncModel(fetchPeriodic),
    fetchThesis: AsyncModel(fetchThesis),
    fetchMonographs: AsyncModel(fetchMonographs),
  })
  .actions((store) => ({
    setItems(field, value) {
      store[field] = value;
    },
  }));

function fetchPeriodic() {
  return async (flow, parent) => {
    const res = await Api.Posts.getPeriodicityAll();

    console.log(res.data)

    const ids = flow.merge(res.data, PeriodicityCollection);

    parent.setItems('periodic', ids);
  };
}

function fetchThesis() {
  return async (flow, parent) => {
    const res = await Api.Posts.getThesisAll();

    const ids = flow.merge(res.data, ThesisCollection);

    parent.setItems('thesis', ids);
  };
}

function fetchMonographs() {
  return async (flow, parent) => {
    const res = await Api.Posts.getMonographAll();

    const ids = flow.merge(res.data, MonographCollection);

    parent.setItems('monographs', ids);
  };
}
