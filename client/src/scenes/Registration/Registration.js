import React from 'react';
import { Container, Button, Header, Form, Segment } from 'semantic-ui-react';

import s from './Registration.module.scss';

const Registration = (props) => {
  return (
    <Container>
      <Segment color="purple" size="huge" className={s.segment}>
        <Header as="h1" textAlign="center">
          Registration
        </Header>
        <Form>
          <Form.Field>
            <label>Full name</label>
            <input type="text" placeholder="Bruce Wayne" />
          </Form.Field>
          <Form.Field required>
            <label>Login</label>
            <input type="text" placeholder="Batman" />
          </Form.Field>
          <Form.Field required>
            <label>Email</label>
            <input type="email" placeholder="something@example.com" />
          </Form.Field>
          <Form.Field required>
            <label>Password</label>
            <input type="password" />
          </Form.Field>
          <Form.Field required>
            <label>Confirm password</label>
            <input type="password" />
          </Form.Field>
          <Button type="submit" size='large' color="purple">
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default Registration;
