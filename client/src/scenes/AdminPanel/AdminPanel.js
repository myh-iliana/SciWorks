import React, { useState } from 'react';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import s from './AdminPanel.module.scss';
import Users from './components/Users/Users';
import { useStore } from '../../stores/createStore';

const AdminPanel = () => {
  const [activeItem, setActiveItem] = useState('users');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Container className={s.container}>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name="users" active={activeItem === 'users'} onClick={handleItemClick} />
            <Menu.Item
              name="reporting"
              active={activeItem === 'reporting'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {activeItem === 'users' && <Users />}
          {activeItem === 'reporting' && <Segment>reporting</Segment>}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default observer(AdminPanel);
