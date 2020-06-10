import React from 'react';
import { Header, List, Loader } from 'semantic-ui-react';
import { generatePath, Link } from 'react-router-dom';

const PostsList = ({ loading, items, path }) => {
  if (!loading && !items[0]) {
    return <Header as='h4' textAlign='center'>No posts</Header>
  }

  return (
    <List divided relaxed>
      <Loader active={loading} />
      {items.map(({ title, id }) => (
        <List.Item>
          <List.Icon name="book" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as={Link} to={generatePath(path, { id })}>
              {title}
            </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default PostsList;
