import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../components/Header/Header';
import { useStore } from '../../stores/createStore';

const Profile = () => {
  const store = useStore();

  return (
    <div>
      <Header />

      {JSON.stringify(store.viewer.user)}
    </div>
  );
};

export default observer(Profile);
