import React from 'react';
import { Container, Icon, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Cathedra } from 'src/api';
import RegisterForm from './components/RegisterForm';
import { routes } from '../../routes';
import s from './Register.module.scss';

const Register = () => {
  const onSubmit = async ({ fullName, username, email, password, isTeacher }) => {
    console.log('ok');
  };

  return (
    <Container>
      <div className={s.form}>
        <Message
          attached
          header="Welcome to our site!"
          content="Fill out the form below to sign-up for a new account"
        />
        <RegisterForm onSubmit={onSubmit} />
        <Message attached="bottom" warning>
          <Icon name="help" />
          Already signed up?&nbsp;<Link to={routes.login}>Login here</Link>&nbsp;instead.
        </Message>
      </div>
    </Container>
  );
};

export default Register;
