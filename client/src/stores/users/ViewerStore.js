import { types as t } from 'mobx-state-tree';

import * as Api from 'src/api';
import { UserModel } from './UserModel';
import { AsyncModel } from '../utils';
import { apiPath } from '../../components/App/App';

const ViewerModel = UserModel.named('ViewerModel');

export const ViewerStore = t
  .model('ViewerStore', {
    user: t.maybe(ViewerModel),
    userModel: t.maybe(UserModel),
    edit: AsyncModel(edit),
    changeAvatar: AsyncModel(changeAvatar),
    downloadReport: AsyncModel(downloadReport),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));

function edit(data) {
  return async (flow, parent) => {
    const res = await Api.Users.edit(data);

    parent.setViewer(res.data);
    flow.setRedirect(true);
  };
}

function changeAvatar(avatar) {
  return async (flow, parent) => {
    const res = await Api.Users.changeAvatar(avatar);

    parent.setViewer(res.data);
    flow.setRedirect(true);
  };
}

function downloadReport(id) {
  return async () => {
    await Api.Users.downloadUserReport(id);
  };
}
