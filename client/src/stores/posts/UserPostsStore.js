import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { AsyncModel } from '../utils';
import { MonographModel } from './MonographModel';
import { PeriodicityModel } from './PeriodicityModel';
import { ThesisModel } from './ThesisModel';

export const UserPostsStore = t
  .model('UserPostsStore', {
    periodic: t.array(t.reference(PeriodicityModel)),
    thesis: t.array(t.reference(ThesisModel)),
    monographs: t.array(t.reference(MonographModel)),
    addPeriodic: AsyncModel(addPeriodic),
    addThesis: AsyncModel(addThesis),
    addMonograph: AsyncModel(addMonograph),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
  }));

function addPeriodic(data) {
  return async (flow, parent) => {
    const res = await Api.Posts.createPeriodicity(data);

    parent.setItems(res.data);
  };
}

function addThesis(data) {
  return async (flow, parent) => {
    const res = await Api.Posts.createThesis(data);

    parent.setItems(res.data);
  };
}

function addMonograph(data) {
  return async (flow, parent) => {
    const res = await Api.Posts.createMonograph(data);

    parent.setItems(res.data);
  };
}
