import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import './App.module.scss';
import Router from '../../scenes/routes';

export const colors = {
  main: 'purple',
};

const App = () => {
  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
