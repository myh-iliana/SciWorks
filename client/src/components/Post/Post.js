import React, { useEffect, Fragment } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { Container, Header, Icon, Item, Label, Loader, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { routes } from 'src/scenes/routes';

import s from './Post.module.scss';

export const Record = ({ post, label, field, maybeNull = false }) => {
  if (maybeNull) {
    return (
      <Fragment>
        {post[field] && (
          <div>
            {label}: <span>{post[field]}</span>
          </div>
        )}
      </Fragment>
    );
  }

  return (
    <div>
      {label}: <span>{post[field]}</span>
    </div>
  );
};

const Post = ({ children, useCollection }) => {
  const params = useParams();
  const { collection, getById } = useCollection();
  const post = collection.get(params.id);

  useEffect(() => {
    getById.run(params.id);
  }, [params.id]);

  const created = post && new Date(post.createdAt);
  const updated = post && new Date(post.updatedAt);

  return (
    <Container className={s.container}>
      {getById.isLoading && <Loader />}
      {!getById.isLoading && !post && (
        <Header as="h2" icon textAlign="center">
          <Icon name="x" />
          Post not found
        </Header>
      )}

      {post && (
        <Segment padded className={s.segment}>
          <div className={s.date}>
            <div>Created: {created.toLocaleDateString()} {created.toLocaleTimeString()}</div>
            <div>Updated: {updated.toLocaleDateString()} {updated.toLocaleTimeString()}</div>
          </div>

          <div className={s.header}>
            <Header as="h1">{post.title}</Header>

            <Label.Group size="small" className={s.tags} tag>
              {post.isElectronic && <Label>Electronic</Label>}
              {post.isEuLanguage && <Label>European language</Label>}
              {post.isScopusAndWS && <Label>Scopus and Web of Science</Label>}
              {post.isScientometrics && <Label>Scientometric databases</Label>}
              {post.isProfessional && <Label>Professional</Label>}
              {post.isInternational && <Label>International conference</Label>}
            </Label.Group>
          </div>

          <div>
            {post.Users.map(({ id, username }) => (
              <Link
                className={id !== post.author ? s.subauthor : s.mainAuthor}
                to={generatePath(routes.account, { username })}
              >
                {username}
              </Link>
            ))}
          </div>

          <div className={s.info}>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { post });
            })}
          </div>

          <p className={s.desc}>{post.annotations}</p>
        </Segment>
      )}
    </Container>
  );
};

Post.propTypes = {
  children: PropTypes.node,
  useCollection: PropTypes.func.isRequired,
};

Record.propTypes = {
  post: PropTypes.object,
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  maybeNull: PropTypes.bool,
};

export default observer(Post);
