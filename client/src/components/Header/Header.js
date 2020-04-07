import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Button, Menu, Header as SemanticHeader } from 'semantic-ui-react';

import s from './Header.module.scss';
import { routes } from '../../scenes/routes';

const Header = (props) => {
  return (
    <Container fluid>
      {/*<Segment inverted color="purple" className={s.segment}>*/}
        {/*<SemanticHeader as="h1">*/}
        {/*  <Link to={routes.home} className={s.logo}>*/}
        {/*    SciWorks*/}
        {/*  </Link>*/}
        {/*</SemanticHeader>*/}

        <Menu size="huge" color="purple" inverted attached>
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
              <Link to={routes.login}>
                <Button color='olive'>Sign In</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      {/*</Segment>*/}
    </Container>
  );
};

export default Header;
