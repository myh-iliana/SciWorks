import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../stores/createStore';
import Header from '../components/Header/Header';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import Account from './Account/Account';
import CreatePost from './CreatePost/CreatePost';
import PeriodicPost from './PeriodicPost/PeriodicPost';
import MonographPost from './MonographPost/MonographPost';
import ThesisPost from './ThesisPost/ThesisPost';
import EditPost from './EditPost/EditPost';
import AdminPanel from './AdminPanel/AdminPanel';

export const routes = {
  home: '/',

  auth: '/auth',
  register: '/auth/register',
  login: '/auth/login',

  account: '/account/:username',

  monographs: '/account/:username/monographs',
  periodicity: '/account/:username/periodicity',
  thesis: '/account/:username/thesis',

  monographPost: '/monographs/:id',
  periodicityPost: '/periodicity/:id',
  thesisPost: '/thesis/:id',

  createPost: '/create',
  editPost: '/edit_post/:type/:postId',

  cathedra: '/:name',

  adminPanel: '/admin',
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
        <PrivateRouter exact path={routes.createPost} component={CreatePost} />
        <PrivateRouter exact path={routes.editPost} component={EditPost} />
        <PrivateRouter path={routes.account} component={Account} />
        <Route path={routes.periodicityPost} component={PeriodicPost} />
        <Route path={routes.monographPost} component={MonographPost} />
        <Route path={routes.thesisPost} component={ThesisPost} />
        <Route path={routes.adminPanel} component={AdminPanel} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
