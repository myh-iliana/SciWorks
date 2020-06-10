import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Container, Grid, List, Menu, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import s from './Home.module.scss';
import { useStore } from '../../stores/createStore';
import { routes } from '../routes';
import UsersList from './components/UsersList/UsersList';
import CathedrasList from './components/CathedrasList/CathedrasList';
import PostsList from './components/PostsList/PostsList';

const Home = () => {
  const [activeItem, setActiveItem] = useState('users');
  const store = useStore();
  const { fetchAll, items } = store.users;
  const { fetchPeriodic, fetchThesis, fetchMonographs, periodic, thesis, monographs } = store.posts;

  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    fetchAll.run();
    fetchPeriodic.run();
    fetchThesis.run();
    fetchMonographs.run();
  }, []);

  return (
    <Container className={s.container}>
      <Segment>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item name="users" active={activeItem === 'users'} onClick={handleItemClick} />
              <Menu.Item
                name="cathedras"
                active={activeItem === 'cathedras'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="periodicity"
                active={activeItem === 'periodicity'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="thesis"
                active={activeItem === 'thesis'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="monographs"
                active={activeItem === 'monographs'}
                onClick={handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            {activeItem === 'users' && <UsersList items={items} loading={fetchAll.isLoading} />}
            {activeItem === 'cathedras' && <CathedrasList />}
            {activeItem === 'periodicity' && <PostsList path={routes.periodicityPost} items={periodic} loading={fetchPeriodic.isLoading} />}
            {activeItem === 'thesis' && <PostsList path={routes.thesisPost} items={thesis} loading={fetchThesis.isLoading} />}
            {activeItem === 'monographs' && <PostsList path={routes.monographPost} items={monographs} loading={fetchMonographs.isLoading} />}
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

export default observer(Home);
