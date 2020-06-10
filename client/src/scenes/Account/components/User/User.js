import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import NoneImage from 'src/img/none.svg';
import { useStore } from '../../../../stores/createStore';
import { routes } from '../../../routes';
import { useCathedrasCollection } from '../../../../stores/cathedras/cathedrasCollection';
import { apiPath, colors } from '../../../../components/App/App';

import s from './User.module.scss';
import EditForm from '../../../../components/EditForm/EditForm';

const User = ({ user, isViewer }) => {
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const addImageRef = React.createRef();

  // ---- values from store
  const store = useStore();
  const { avatar, fullName, username, email, cathedraId, cathedra, bio } = user;
  const cathedraCollection = useCathedrasCollection();
  const pathToCathedra =
    cathedra && generatePath(routes.cathedra, { name: cathedra.name || 0 });
  // -----

  useEffect(() => {
    cathedraCollection.getById.run(cathedraId);
  }, [cathedraId]);

  const handleFileChange = (e) => {
    store.files.upload.run(e.target.files).then(() => setImage(store.files?.items[0]?.filename));
  };

  // ---- avatar upload
  const handleCancelAvatarUpload = () => setImage(null);
  const handleAvatarUpload = () => {
    store.viewer.changeAvatar.run({ avatar: apiPath + image });
    setImage(null);
  };
  // -----

  // ----- edit mode
  const closeEditMode = () => setEditMode(false);
  const openEditMode = () => setEditMode(true);
  // -----

  return (
    <React.Fragment>
      <div className={s.user}>
        <div className={s.img}>
          <Image src={(image && apiPath + image) || avatar || NoneImage} fluid />
          { isViewer && <div>
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
          </div> }
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

          {editMode && isViewer && <EditForm user={store.viewer.user} cancelEdit={closeEditMode} />}
        </div>
      </div>
    </React.Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  isViewer: PropTypes.bool.isRequired,
};

export default observer(User);
