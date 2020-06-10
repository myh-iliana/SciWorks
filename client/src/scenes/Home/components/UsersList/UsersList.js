import React from 'react';
import { Header, List, Loader } from 'semantic-ui-react';
import { generatePath, Link } from 'react-router-dom';
import { routes } from '../../../routes';

const UsersList = ({ items, loading }) => {
  if (!loading && !items[0]) {
    return <Header as='h4' textAlign='center'>No users</Header>
  }

  return (
    <List divided relaxed>
      <Loader active={loading} />
      {items.map(({ username, fullName }) => (
        <List.Item>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as={Link} to={generatePath(routes.account, { username })}>
              {username}
            </List.Header>
            <List.Description as="a">{fullName}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default UsersList;
