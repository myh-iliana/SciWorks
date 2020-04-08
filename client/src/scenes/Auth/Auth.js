import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { routes } from '../routes';
import Register from '../Register/Register';

const Auth = () => {
  return (
    <div>
      <Header />

      <Switch>
        <Route path={routes.register} component={Register} />
      </Switch>
    </div>
  );
};

export default Auth;
