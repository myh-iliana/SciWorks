import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { AsyncModel } from '../utils';
import { MonographModel } from './MonographModel';
import { PeriodicityModel } from './PeriodicityModel';
import { ThesisModel } from './ThesisModel';
import {
  MonographCollection,
  MonographPost,
  PeriodicityCollection,
  PeriodicityPost,
  ThesisCollection,
  ThesisPost,
} from '../schemas';

export const UserPostsStore = t
  .model('UserPostsStore', {
    periodic: t.array(t.reference(PeriodicityModel)),
    thesis: t.array(t.reference(ThesisModel)),
    monographs: t.array(t.reference(MonographModel)),

    addPeriodic: AsyncModel(addPeriodic),
    addThesis: AsyncModel(addThesis),
    addMonograph: AsyncModel(addMonograph),

    fetchUserPosts: AsyncModel(fetchUserPosts),
  })
  .actions((store) => ({
    setItems(field, value) {
      store[field] = value;
    },

    pushItem(field, value) {
      store[field].push(value);
    },
  }));

function fetchUserPosts(username) {
  return async (flow, parent) => {
    const res = await Api.Users.getUserPosts(username);

    const { Periodicities, Monographs, Theses } = res.data;

    const periodicityIds = flow.merge(Periodicities, PeriodicityCollection);
    const monographsIds = flow.merge(Monographs, MonographCollection);
    const thesisIds = flow.merge(Theses, ThesisCollection);

    parent.setItems('periodic', periodicityIds);
    parent.setItems('thesis', thesisIds);
    parent.setItems('monographs', monographsIds);
  };
}

function addPeriodic(data) {
  return async (flow, parent) => {
    const res = await Api.Posts.createPeriodicity(data);
    const id = flow.merge(res.data, PeriodicityPost);

    parent.pushItem('periodic', id);
  };
}

function addThesis(data) {
  return async (flow, parent) => {
    const res = await Api.Posts.createThesis(data);
    const id = flow.merge(res.data, ThesisPost);

    parent.pushItem('thesis', id);
  };
}

function addMonograph(data) {
  return async (flow, parent) => {
    const res = await Api.Posts.createMonograph(data);
    const id = flow.merge(res.data, MonographPost);

    parent.pushItem('monographs', id);
  };
}
