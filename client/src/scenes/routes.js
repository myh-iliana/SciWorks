import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './Auth/Auth';

export const routes = {
  home: '/',
  auth: '/auth',
  register: '/auth/register',
  login: '/auth/login',
};

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.auth} component={Auth} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
