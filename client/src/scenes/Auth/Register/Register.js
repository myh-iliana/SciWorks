import React from 'react';
import { Container, Icon, Message } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import RegisterForm from './components/RegisterForm';
import { routes } from '../../routes';
import { useStore } from '../../../stores/createStore';
import s from './Register.module.scss';

const Register = () => {
  const store = useStore();
  const { redirect } = store.auth.register;

  const onSubmit = async ({ fullName, username, email, password, passConfirm, isTeacher, cathedraId }) => {
    await store.auth.register.run({ fullName, username, email, password, passConfirm, isTeacher, cathedraId });
  };

  if (redirect) return <Redirect to={routes.login} />;

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

export default observer(Register);
