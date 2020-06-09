import React, { useEffect } from 'react';
import { generatePath, NavLink, Redirect, Route, useParams } from 'react-router-dom';
import { Container, Header, Menu, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import s from './Account.module.scss';
import { useStore } from '../../stores/createStore';
import { useUserCollection } from '../../stores/users/usersCollection';
import { routes } from '../routes';
import User from './components/User/User';
import PostsBlock from './components/PostsBlock/PostsBlock';

const Account = () => {
  const params = useParams();

  const store = useStore();
  const isViewer = store.viewer?.user?.username === params.username;
  const { collection, getUser } = useUserCollection();
  const user = isViewer ? store.viewer.user : collection.get(params.username);
  const { fetchUserPosts, periodic, thesis, monographs } = store.userPosts;
  const postsLoaded = !fetchUserPosts.isLoading && !fetchUserPosts.isError;

  useEffect(() => {
    if (params.username !== store.viewer.user.username) {
      getUser.run(params.username);
    }

    fetchUserPosts.run(params.username);
  }, [params.username]);

  if (store.viewer.edit.redirect) {
    return <Redirect to={generatePath(routes.account, { username: store.viewer.user.username })} />;
  }

  return (
    <div className={s.container}>
      <Container>
        <Segment padded loading={getUser.isLoading}>
          {!user && <Header as='h3' textAlign='center'>No user found</Header>}
          {user && <User user={user} isViewer={isViewer} />}
        </Segment>

        {user && (
          <Segment padded>
            <Menu widths={3}>
              <Menu.Item
                name="Monographs"
                as={NavLink}
                to={generatePath(routes.monographs, { username: user.username })}
              />
              <Menu.Item
                name="Periodicity"
                as={NavLink}
                to={generatePath(routes.periodicity, { username: user.username })}
              />
              <Menu.Item
                name="Thesis"
                as={NavLink}
                to={generatePath(routes.thesis, { username: user.username })}
              />
            </Menu>

            <Route
              path={routes.periodicity}
              render={() =>
                postsLoaded && <PostsBlock items={periodic} path={routes.periodicityPost} />
              }
            />
            <Route
              path={routes.monographs}
              render={() =>
                postsLoaded && <PostsBlock items={monographs} path={routes.monographPost} />
              }
            />
            <Route
              path={routes.thesis}
              render={() => postsLoaded && <PostsBlock items={thesis} path={routes.thesisPost} />}
            />
          </Segment>
        )}
      </Container>
    </div>
  );
};

export default observer(Account);
