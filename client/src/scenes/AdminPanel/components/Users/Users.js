import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Accordion, Header, Icon, Item } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/createStore';

import s from './Users.module.scss';
import EditForm from '../../../../components/EditForm/EditForm';
import { useUserCollection } from '../../../../stores/users/usersCollection';

const Users = (props) => {
  const store = useStore();
  const history = useHistory();
  const { fetchAll, items } = store.users;
  const [activeIndex, setActiveIndex] = useState();
  const [activeIndexPost, setActiveIndexPost] = useState();
  const [editUserMode, setEditUserMode] = useState({
    show: false,
    id: null,
  });
  const { edit } = useUserCollection();

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleClickPost = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndexPost === index ? -1 : index;

    setActiveIndexPost(newIndex);
  };

  const handleDeleteUser = () => {};
  const openEditUserMode = (id) => setEditUserMode({ show: true, id });
  const closeEditUserMode = () => setEditUserMode({ show: false, id: null });

  useEffect(() => {
    fetchAll.run();
  }, []);

  return (
    <Accordion fluid styled>
      {items.map((user) => {
        return (
          <React.Fragment>
            <Accordion.Title active={activeIndex === user.id} index={user.id} onClick={handleClick}>
              <Icon name="dropdown" />
              {user.username}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === user.id}>

              {!editUserMode.show && (
                <React.Fragment>
                  <Icon
                    onClick={handleDeleteUser}
                    name="user delete"
                    color="red"
                    size="large"
                    className={s.icon}
                  />
                  <Icon
                    onClick={() => openEditUserMode(user.id)}
                    name="edit"
                    color="blue"
                    size="large"
                    className={s.icon}
                  />
                </React.Fragment>
              )}

              {editUserMode.show && editUserMode.id === user.id && <EditForm user={user} cancelEdit={closeEditUserMode} isViewer={false} />}

              <Accordion fluid styled>
                <Accordion.Title active={activeIndexPost === 1} index={1} onClick={handleClickPost}>
                  <Icon name="dropdown" />
                  Monographs
                </Accordion.Title>
                <Accordion.Content active={activeIndexPost === 1}>
                  <Item.Group divided>
                    {!user.Monographs[0] && <Header as="h4">No posts!</Header>}
                    {user.Monographs.map((post) => {
                      return (
                        <Item>
                          <Item.Content>
                            <Item.Header as="a">{post.title}</Item.Header>
                            <Item.Meta>
                              <span className="cinema">Union Square 14</span>
                            </Item.Meta>
                            <Item.Extra></Item.Extra>
                          </Item.Content>
                        </Item>
                      );
                    })}
                  </Item.Group>
                </Accordion.Content>

                <Accordion.Title active={activeIndexPost === 2} index={2} onClick={handleClickPost}>
                  <Icon name="dropdown" />
                  Periodicity
                </Accordion.Title>
                <Accordion.Content active={activeIndexPost === 2}>
                  {!user.Periodicities[0] && <Header as="h4">No posts!</Header>}
                  <Item.Group divided>
                    {user.Periodicities.map((post) => {
                      return (
                        <Item>
                          <Item.Content>
                            <Item.Header as="a">{post.title}</Item.Header>
                            <Item.Meta>
                              <span className="cinema">Union Square 14</span>
                            </Item.Meta>
                            <Item.Extra></Item.Extra>
                          </Item.Content>
                        </Item>
                      );
                    })}
                  </Item.Group>
                </Accordion.Content>

                <Accordion.Title active={activeIndexPost === 3} index={3} onClick={handleClickPost}>
                  <Icon name="dropdown" />
                  Thesis
                </Accordion.Title>
                <Accordion.Content active={activeIndexPost === 3}>
                  <Item.Group divided>
                    {!user.Theses[0] && <Header as="h4">No posts!</Header>}
                    {user.Theses.map((post) => {
                      return (
                        <Item>
                          <Item.Content>
                            <Item.Header as="a">{post.title}</Item.Header>
                            <Item.Meta>
                              <span className="cinema">Union Square 14</span>
                            </Item.Meta>
                            <Item.Extra></Item.Extra>
                          </Item.Content>
                        </Item>
                      );
                    })}
                  </Item.Group>
                </Accordion.Content>
              </Accordion>
            </Accordion.Content>
          </React.Fragment>
        );
      })}
    </Accordion>
  );
};

export default observer(Users);
