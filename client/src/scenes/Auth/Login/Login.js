import React from 'react';
import { Link, generatePath, Redirect } from 'react-router-dom';
import { Container, Icon, Message } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import LoginForm from './components/LoginForm';
import { routes } from '../../routes';
import { useStore } from '../../../stores/createStore';

import s from './Login.module.scss';

const Login = () => {
  const store = useStore();
  const { redirect } = store.auth.login;

  const onSubmit = async ({ username, password }) => {
    await store.auth.login.run({ username, password });
  };

  if (redirect) {
    return <Redirect to={generatePath(routes.account, { username: store.viewer.user.username })} />;
  }

  return (
    <Container>
      <div className={s.form}>
        <Message attached header="Hello!" content="Login to see more" />
        <LoginForm onSubmit={onSubmit} />
        <Message attached="bottom" warning>
          <Icon name="help" />
          No account yet?&nbsp;<Link to={routes.register}>Register here</Link>&nbsp;.
        </Message>
      </div>
    </Container>
  );
};

export default observer(Login);
