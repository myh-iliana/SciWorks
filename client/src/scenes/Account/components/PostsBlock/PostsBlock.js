import React from 'react';
import { Button, Header, Icon, Item, Label } from 'semantic-ui-react';
import { Link, generatePath } from 'react-router-dom';

import { routes } from '../../../routes';
import { colors } from '../../../../components/App/App';
import { observer } from 'mobx-react';

const PostsBlock = ({ items, path }) => {
  if (items.length <= 0) {
    return (
      <Header as="h4" icon textAlign="center">
        <Icon name="ban" />
        No posts
      </Header>
    );
  }

  return (
    <div>
      <Item.Group divided>
        {items.map((post) => {
          const mainAuthor = post.Users.find((item) => item.id === post.author);

          return (
            <Item>
              <Item.Content>
                <Item.Header as={Link} to={generatePath(path, { id: post.id })}>
                  {post.title}
                </Item.Header>
                <Item.Meta>
                  <span>
                    <Label
                      as={Link}
                      color={colors.main}
                      size="small"
                      to={generatePath(routes.account, {
                        username: mainAuthor.username,
                      })}
                    >
                      {mainAuthor.username}
                    </Label>
                  </span>
                  {post.Users.map(({ id, username }) => {
                    if (id !== post.author) {
                      return (
                        <Label as={Link} key={id} size="small">
                          <Link to={generatePath(routes.account, { username })}>{username}</Link>
                        </Label>
                      );
                    }

                    return null;
                  })}
                </Item.Meta>
                <Item.Description>{post.annotations}</Item.Description>
                <Item.Extra>
                  <Button
                    color={colors.second}
                    as={Link}
                    to={generatePath(path, { id: post.id })}
                    floated="right"
                  >
                    See more
                    <Icon name="right chevron" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
};

export default observer(PostsBlock);
