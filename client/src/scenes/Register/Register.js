import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

import s from './Register.module.scss';
import RegisterForm from './components/RegisterForm';

const Register = () => {
  return (
    <Container>
      <Segment color="purple" size="huge" className={s.segment}>
        <Header as="h1" textAlign="center">
          Register
        </Header>

        <RegisterForm />
      </Segment>
    </Container>
  );
};

export default Register;
