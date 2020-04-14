import React from 'react';
import { observer } from 'mobx-react';
import 'semantic-ui-css/semantic.min.css';

import { Provider, createStore } from 'src/stores/createStore';
import Router from '../../scenes/routes';

import './App.module.scss';

const store = createStore();
store.bootstrap();

export const colors = {
  main: 'purple',
};

const App = () => {
  return (
    <div>
      <Provider value={store}>
        <Router />
      </Provider>
    </div>
  );
};

export default observer(App);
