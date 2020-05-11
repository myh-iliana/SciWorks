import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Button, Image, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import NoneImage from 'src/img/none.svg';
import { useStore } from '../../../../stores/createStore';
import { routes } from '../../../routes';
import { useCathedrasCollection } from '../../../../stores/cathedras/cathedrasCollection';
import { apiPath, colors } from '../../../../components/App/App';
import s from './User.module.scss';
import EditForm from '../EditForm/EditForm';

const User = () => {
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const store = useStore();
  const { avatar, fullName, username, email, cathedraId, cathedra, bio } = store.viewer.user;
  const collection = useCathedrasCollection();
  const pathToCathedra =
    cathedra && generatePath(routes.cathedra, { cathedraName: cathedra.name || 0 });

  const addImageRef = React.createRef();

  useEffect(() => {
    collection.getById.run(cathedraId);
    store.cathedras.fetchAll.run();
  }, [cathedraId]);

  const handleFileChange = (e) => {
    store.files.upload.run(e.target.files).then(() => setImage(store.files?.items[0]?.filename));
  };

  const handleCancelAvatarUpload = () => setImage(null);
  const handleAvatarUpload = () => {
    store.viewer.changeAvatar.run({ avatar: apiPath + image });
    setImage(null);
  };
  const closeEditMode = () => setEditMode(false);
  const openEditMode = () => setEditMode(true);

  return (
    <Segment padded>
      <div className={s.user}>
        <div className={s.img}>
          <Image src={(image && apiPath + image) || avatar || NoneImage} fluid />
          <div>
            {!image ? (
              <Button
                icon="add"
                content="New avatar"
                color={colors.second}
                labelPosition="left"
                fluid
                attached
                onClick={() => addImageRef.current.click()}
              />
            ) : (
              <Button.Group fluid attached>
                <Button onClick={handleCancelAvatarUpload}>Cancel</Button>
                <Button.Or />
                <Button onClick={handleAvatarUpload} positive>
                  Save
                </Button>
              </Button.Group>
            )}
            <input
              onChange={handleFileChange}
              ref={addImageRef}
              type="file"
              name="files"
              className="none"
            />

            <div className={s.edit_button}>
              <Button
                icon="edit"
                content="Edit profile"
                color={colors.neutral}
                labelPosition="left"
                onClick={openEditMode}
                fluid
                attached
              />
            </div>
          </div>
        </div>
        <div className={s.user__info}>
          {!editMode && (
            <React.Fragment>
              <h1>{fullName}</h1>
              <h4>{username}</h4>
              <div>
                <a href={`mailto: ${email}`}>{email}</a>
              </div>
              <p className={s.bio}>{bio}</p>
              {cathedra && (
                <Link to={pathToCathedra} className={s.link}>
                  {cathedra.name}
                </Link>
              )}
            </React.Fragment>
          )}

          {editMode && <EditForm user={store.viewer.user} cancelEdit={closeEditMode} />}
        </div>
      </div>
    </Segment>
  );
};

export default observer(User);
