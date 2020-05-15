import React from 'react';
import { observer } from 'mobx-react';
import { Link, NavLink, generatePath, useHistory } from 'react-router-dom';
import { Container, Menu, Header as SemanticHeader, Dropdown } from 'semantic-ui-react';

import s from './Header.module.scss';
import { routes } from '../../scenes/routes';
import { colors } from '../App/App';
import { useStore } from '../../stores/createStore';
import Avatar from '../elements/Avatar/Avatar';

const Header = () => {
  const history = useHistory();
  const store = useStore();
  const { isLoggedIn } = store.auth;
  const { avatar } = isLoggedIn && store.viewer.user;
  const pathToAccount = isLoggedIn && generatePath(routes.account, {
    username: store.viewer.user.username,
  });

  const handleSignOut = () => {
    store.auth.logout();
    history.push(routes.home);
  };

  return (
    <Container fluid>
      <Menu size="large" color={colors.main} inverted attached>
        <Menu.Item>
          <SemanticHeader as="h1">
            <Link to={routes.home} className={s.logo}>
              SciWorks
            </Link>
          </SemanticHeader>
        </Menu.Item>

        <Menu.Menu position="right">
          {isLoggedIn && (
            <Dropdown item trigger={<Avatar src={avatar} />}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" as={Link} to={pathToAccount} text="Profile" />
                <Dropdown.Item icon="add" as={Link} to={routes.createPost} text="New post" />
                <Dropdown.Divider />
                <Dropdown.Item icon="sign out" text="Sign out" onClick={handleSignOut} />
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!isLoggedIn && (
            <Menu.Item>
              <NavLink to={routes.login} activeClassName={s.nav_active} className={s.nav}>
                Sign In
              </NavLink>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default observer(Header);
