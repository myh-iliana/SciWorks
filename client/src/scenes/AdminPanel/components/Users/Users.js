import React, { useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { Accordion, Header, Icon, Item, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/createStore';

import s from './Users.module.scss';
import EditForm from '../../../../components/EditForm/EditForm';
import { useUserCollection } from '../../../../stores/users/usersCollection';
import * as Api from '../../../../api';
import { useMonographsCollection } from '../../../../stores/posts/monographsCollection';
import { useThesisCollection } from '../../../../stores/posts/thesisCollection';
import { usePeriodicityCollection } from '../../../../stores/posts/periodicityCollection';
import { routes } from '../../../routes';

const PostsList = ({ posts, apiMethodForDelete, postCollection, type }) => {
  const { deleteById } = postCollection();
  const history = useHistory();

  const handlePostDelete = (id) => deleteById.run(id, apiMethodForDelete);

  return (
    <React.Fragment>
      {!posts[0] && <Header as="h4">No posts!</Header>}
      {posts.map((post) => {
        return (
          <Item>
            <Item.Content>
              <Item.Header as="a">{post.title}</Item.Header>
              <Item.Extra>
                <Icon
                  onClick={() => handlePostDelete(post.id)}
                  name="trash"
                  color="red"
                  size="large"
                  className={s.icon}
                />
                <Icon
                  onClick={() =>
                    history.push(
                      generatePath(routes.editPost, {
                        type,
                        postId: post.id,
                      }),
                    )
                  }
                  name="edit"
                  color="blue"
                  size="large"
                  className={s.icon}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      })}
    </React.Fragment>
  );
};

const Users = () => {
  const store = useStore();
  const { fetchAll, items } = store.users;
  const [activeIndex, setActiveIndex] = useState();
  const [activeIndexPost, setActiveIndexPost] = useState();
  const [editUserMode, setEditUserMode] = useState({
    show: false,
    id: null,
  });
  const { deleteById } = useUserCollection();
  const monographCollection = useMonographsCollection;
  const thesisCollection = useThesisCollection;
  const periodicityCollection = usePeriodicityCollection;

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

  const handleDeleteUser = (id, username) => deleteById.run(id, username);
  const openEditUserMode = (id) => setEditUserMode({ show: true, id });
  const closeEditUserMode = () => setEditUserMode({ show: false, id: null });

  useEffect(() => {
    fetchAll.run();
  }, []);

  return (
    <Accordion fluid styled>
      <Loader active={fetchAll.isLoading} />
      {items.map((user) => {
        return (
          <React.Fragment>
            <Accordion.Title active={activeIndex === user.id} index={user.id} onClick={handleClick}>
              <Icon name="dropdown" />
              {user.usernameString}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === user.id}>
              {!editUserMode.show && (
                <React.Fragment>
                  <Icon
                    onClick={() => handleDeleteUser(user.id, user.username)}
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

              {editUserMode.show && editUserMode.id === user.id && (
                <EditForm user={user} cancelEdit={closeEditUserMode} isViewer={false} />
              )}

              <Accordion fluid styled>
                <Accordion.Title active={activeIndexPost === 1} index={1} onClick={handleClickPost}>
                  <Icon name="dropdown" />
                  Monographs
                </Accordion.Title>
                <Accordion.Content active={activeIndexPost === 1}>
                  <Item.Group divided>
                    <PostsList
                      posts={user.Monographs}
                      apiMethodForEdit={Api.Posts.deleteMonograph}
                      apiMethodForDelete={Api.Posts.editMonograph}
                      postCollection={monographCollection}
                      type="monograph"
                    />
                  </Item.Group>
                </Accordion.Content>

                <Accordion.Title active={activeIndexPost === 2} index={2} onClick={handleClickPost}>
                  <Icon name="dropdown" />
                  Periodicity
                </Accordion.Title>
                <Accordion.Content active={activeIndexPost === 2}>
                  <Item.Group divided>
                    <PostsList
                      posts={user.Periodicities}
                      apiMethodForEdit={Api.Posts.deletePeriodicity}
                      apiMethodForDelete={Api.Posts.editPeriodicity}
                      postCollection={periodicityCollection}
                      type="periodicity"
                    />
                  </Item.Group>
                </Accordion.Content>

                <Accordion.Title active={activeIndexPost === 3} index={3} onClick={handleClickPost}>
                  <Icon name="dropdown" />
                  Thesis
                </Accordion.Title>
                <Accordion.Content active={activeIndexPost === 3}>
                  <Item.Group divided>
                    <PostsList
                      posts={user.Theses}
                      apiMethodForEdit={Api.Posts.deleteThesis}
                      apiMethodForDelete={Api.Posts.editThesis}
                      postCollection={thesisCollection}
                      type="thesis"
                    />
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
