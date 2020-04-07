import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Registration from './Registration/Registration';

export const routes = {
  home: '/',
  registration: '/registration',
  login: '/login',
};

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.registration} component={Registration} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
