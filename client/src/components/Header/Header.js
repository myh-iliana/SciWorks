import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Header as SemanticHeader } from 'semantic-ui-react';

import s from './Header.module.scss';
import { routes } from '../../scenes/routes';
import { colors } from '../App/App';

const Header = () => {
  return (
    <Container fluid>
      <Menu size="huge" color={colors.main} inverted attached>
        <Menu.Item>
          <SemanticHeader as="h1">
            <Link to={routes.home} className={s.logo}>
              SciWorks
            </Link>
          </SemanticHeader>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <NavLink exact to={routes.home} activeClassName={s.nav_active} className={s.nav}>
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to={routes.login} activeClassName={s.nav_active} className={s.nav}>
              Sign In
            </NavLink>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Header;
