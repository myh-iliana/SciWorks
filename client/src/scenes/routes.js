import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import Header from '../components/Header/Header';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import Account from './Account/Account';
import { useStore } from '../stores/createStore';

export const routes = {
  home: '/',
  auth: '/auth',
  register: '/auth/register',
  login: '/auth/login',
  account: '/:username',
  monographs: '/:username/monographs',
  periodicity: '/:username/periodicity',
  thesis: '/:username/thesis',
  cathedra: '/:cathedraName',

};

export const PrivateRouter = observer(({ component: Component, ...props }) => {
  const store = useStore();
  const { isLoggedIn } = store.auth;

  return (
    <Route
      {...props}
      render={({ ...renderProps }) =>
        isLoggedIn ? <Component {...renderProps} /> : <Redirect to={routes.login} />
      }
    />
  );
});

const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route path={routes.auth} component={Auth} />
        <PrivateRouter path={routes.account} component={Account} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
