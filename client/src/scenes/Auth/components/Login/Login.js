import React from 'react';
import { Container, Header, Icon, Message, Segment } from 'semantic-ui-react';

import s from './Login.module.scss';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

const Login = () => {
  return (
    <Container>
      <div className={s.form}>
        <Message
          attached
          header='Hello!'
          content='Login to see more'
        />
        <LoginForm />
        <Message attached="bottom" warning>
          <Icon name="help" />
          No account yet?&nbsp;<Link to={routes.register}>Register here</Link>&nbsp;.
        </Message>
      </div>
    </Container>
  );
};

export default Login;
