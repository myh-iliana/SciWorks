import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import 'semantic-ui-css/semantic.min.css';

import { Provider, createStore } from 'src/stores/createStore';
import Router from '../../scenes/routes';
import Loader from '../elements/Loader/Loader';
import './App.scss';

export const colors = {
  main: 'purple',
  second: 'yellow'
};

export const apiPath = 'http://localhost:3001/';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const store = createStore();

  useEffect(() => {
    store.bootstrap().then(() => setIsLoading(false));
  }, []);
  return (
    <div>
      <Provider value={store}>
        {isLoading ? <Loader active={isLoading} /> : <Router />}
      </Provider>
    </div>
  );
};

export default observer(App);
