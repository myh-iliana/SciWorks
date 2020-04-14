import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './Auth/Auth';
import Profile from './Profile/Profile';

export const routes = {
  home: '/',
  auth: '/auth',
  register: '/auth/register',
  login: '/auth/login',
  profile: '/profile',
};

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.auth} component={Auth} />
        <Route path={routes.profile} component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
