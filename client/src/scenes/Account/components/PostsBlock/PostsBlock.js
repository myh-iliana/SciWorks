import React from 'react';
import { Button, Header, Icon, Item, Label } from 'semantic-ui-react';
import { Link, generatePath } from 'react-router-dom';

import { routes } from '../../../routes';
import { colors } from '../../../../components/App/App';
import { observer } from 'mobx-react';

import s from './PostsBlock.module.scss';

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
        {items.map((post) => (
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={generatePath(path, { id: post.id })}>
                {post.title}
              </Item.Header>
              <Item.Meta>
                <Label.Group size='small' className={s.tags}>
                  {post.isElectronic && <Label tag size='small'>Electronic</Label>}
                  {post.isEuLanguage && <Label tag>European language</Label>}
                  {post.isScopusAndWS && <Label tag>Scopus and Web of Science</Label>}
                  {post.isScientometrics && <Label tag>Scientometric databases</Label>}
                  {post.isProfessional && <Label tag>Professional</Label>}
                  {post.isInternational && <Label tag>International conference</Label>}
                </Label.Group>

                {post.Users.map(({ id, username }) => (
                  <Link
                    className={id !== post.author ? s.subauthor : s.mainAuthor}
                    to={generatePath(routes.account, { username })}
                  >
                    {username}
                  </Link>
                ))}
              </Item.Meta>
              <Item.Description className={s.desc}>
                {post.annotations}
              </Item.Description>
              <Item.Extra>
                <Button
                  color={colors.main}
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
        ))}
      </Item.Group>
    </div>
  );
};

export default observer(PostsBlock);
