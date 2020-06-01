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
        <Icon name="x" />
        No posts
      </Header>
    );
  }

  return (
    <div>
      <Item.Group divided>
        {items.map((post) => {
          const created = new Date(post.createdAt);

          return (
            <Item key={post.id} className={s.item}>
              <Item.Content>
                <Item.Header as={Link} to={generatePath(path, { id: post.id })}>
                  {post.title}
                </Item.Header>
                <Item.Meta>
                  <div className={s.date}>
                    <div>{created.toLocaleDateString()}</div>
                  </div>

                  <Label.Group size='small' className={s.tags} tag>
                    {post.isElectronic && <Label>Electronic</Label>}
                    {post.isEuLanguage && <Label>European language</Label>}
                    {post.isScopusAndWS && <Label>Scopus and Web of Science</Label>}
                    {post.isScientometrics && <Label>Scientometric databases</Label>}
                    {post.isProfessional && <Label>Professional</Label>}
                    {post.isInternational && <Label>International conference</Label>}
                  </Label.Group>

                  {post.Users.map(({ id, username }) => (
                    <Link
                      className={id !== post.author ? s.subauthor : s.mainAuthor}
                      to={generatePath(routes.account, { username })}
                      key={id}
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
          );
        })}
      </Item.Group>
    </div>
  );
};

export default observer(PostsBlock);
