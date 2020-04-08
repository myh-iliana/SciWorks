import React from 'react';
import { Container, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import s from './Register.module.scss';
import RegisterForm from './components/RegisterForm';
import { routes } from '../../../routes';

const Register = () => {
  return (
    <Container>
      <div className={s.form}>
        <Message
          attached
          header='Welcome to our site!'
          content='Fill out the form below to sign-up for a new account'
        />
        <RegisterForm />
        <Message attached="bottom" warning>
          <Icon name="help" />
          Already signed up?&nbsp;<Link to={routes.login}>Login here</Link>&nbsp;instead.
        </Message>
      </div>
    </Container>
  );
};

export default Register;
