import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from '../routes';
import Register from './Register/Register';
import Login from './Login/Login';

const Auth = () => {
  return (
    <div>
      <Switch>
        <Route path={routes.register} component={Register} />
        <Route path={routes.login} component={Login} />
      </Switch>
    </div>
  );
};

export default Auth;
