import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import s from './Account.module.scss';
import { useStore } from '../../stores/createStore';
import User from './components/User/User';
import { useUserCollection } from '../../stores/users/usersCollection';

const Account = () => {
  const params = useParams();

  const store = useStore();
  const isViewer = store.viewer?.user?.username === params.username;
  const { collection, getUser } = useUserCollection();
  const user = isViewer ? store.viewer.user : collection.get(params.username);

  useEffect(() => {
    getUser.run(params.username);
  }, [params.username]);

  return (
    <div className={s.container}>
      <Container>
        <Segment padded loading={getUser.isLoading}>
          { user && <User user={user} isViewer={isViewer} /> }
        </Segment>
      </Container>
    </div>
  );
};

export default observer(Account);
