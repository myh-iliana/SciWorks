import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

import s from './Login.module.scss';
import LoginForm from './components/LoginForm';

const Login = (props) => {
  return (
    <Container>
      <Segment color="purple" size="huge" className={s.segment}>
        <Header as="h1" textAlign="center">
          Login
        </Header>

        <LoginForm />
      </Segment>
    </Container>
  );
};

export default Login;
