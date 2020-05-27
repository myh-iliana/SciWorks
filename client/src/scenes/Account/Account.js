import React, { useEffect } from 'react';
import { generatePath, NavLink, useParams } from 'react-router-dom';
import { Container, Menu, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import s from './Account.module.scss';
import { useStore } from '../../stores/createStore';
import { useUserCollection } from '../../stores/users/usersCollection';
import { routes } from '../routes';
import User from './components/User/User';

const Account = () => {
  const params = useParams();

  const store = useStore();
  const isViewer = store.viewer?.user?.username === params.username;
  const { collection, getUser } = useUserCollection();
  const user = isViewer ? store.viewer.user : collection.get(params.username);

  useEffect(() => {
    if (params.username !== store.viewer.user.username) {
      getUser.run(params.username);
    }
  }, [params.username]);

  return (
    <div className={s.container}>
      <Container>
        <Segment padded loading={getUser.isLoading}>
          {user && <User user={user} isViewer={isViewer} />}
        </Segment>

        <Segment padded>
          {user && (
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
          )}
        </Segment>
      </Container>
    </div>
  );
};

export default observer(Account);
