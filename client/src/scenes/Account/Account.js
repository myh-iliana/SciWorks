import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import s from './Account.module.scss';
import { useStore } from '../../stores/createStore';
import User from './components/User/User';
import { Container } from 'semantic-ui-react';

const Account = () => {
  const store = useStore();

  return (
    <div className={s.container}>
      <Container >
        <User />
      </Container>
    </div>
  );
};

export default observer(Account);
