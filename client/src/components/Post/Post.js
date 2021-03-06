import React, { useEffect, Fragment, useState } from 'react';
import { generatePath, Link, Redirect, useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Label,
  Loader,
  Segment,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { routes } from 'src/scenes/routes';

import s from './Post.module.scss';
import { colors } from '../App/App';
import { useStore } from '../../stores/createStore';

export const Record = ({ post, label, field, maybeNull = false }) => {
  if (maybeNull) {
    return (
      <Fragment>
        {post[field] && (
          <div>
            {label}: <span>{post[field]}</span>
          </div>
        )}
      </Fragment>
    );
  }

  return (
    <div>
      {label}: <span>{post[field]}</span>
    </div>
  );
};

const Post = ({ children, useCollection, apiMethodForPostEdit, apiMethodForDelete, type }) => {
  const [files, setFiles] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const params = useParams();
  const history = useHistory();
  const { collection, getById, editFiles, deleteById } = useCollection();
  const post = collection.get(params.id);
  const store = useStore();
  const addImageRef = React.createRef();
  const isViewer = store.viewer?.user?.id === post?.author;
  const created = post && new Date(post.createdAt);
  const updated = post && new Date(post.updatedAt);

  useEffect(() => {
    getById.run(params.id);
  }, [params.id]);

  if (deleteById.redirect) {
    return <Redirect to={generatePath(routes.account, { username: store.viewer.user.username })} />;
  }

  const handleFileChange = (e) => setFiles(e.target.files);
  const handlePostDelete = () => deleteById.run(post.id, apiMethodForDelete);
  const handleFilesSubmit = () => {
    editFiles.run(post.id, files, apiMethodForPostEdit);
    setEditMode(false);
    setFiles(null);
  };
  const cancelFilesSubmit = () => {
    setFiles(null);
    setEditMode(false);
  };

  return (
    <Container className={s.container}>
      {getById.isLoading && <Loader />}
      {!getById.isLoading && !post && (
        <Header as="h2" icon textAlign="center">
          <Icon name="x" />
          Post not found
        </Header>
      )}

      {post && (
        <Segment padded className={s.segment} loading={deleteById.isLoading}>
          <div className={s.header}>
            <Header as="h1">{post.title}</Header>

            <Label.Group size="small" className={s.tags} tag>
              {post.isElectronic && <Label>Electronic</Label>}
              {post.isEuLanguage && <Label>European language</Label>}
              {post.isScopusAndWS && <Label>Scopus and Web of Science</Label>}
              {post.isScientometrics && <Label>Scientometric databases</Label>}
              {post.isProfessional && <Label>Professional</Label>}
              {post.isInternational && <Label>International conference</Label>}
            </Label.Group>
          </div>

          <div>
            {post.Users.map(({ id, username }) => (
              <Link
                key={id}
                className={id !== post.author ? s.subauthor : s.mainAuthor}
                to={generatePath(routes.account, { username })}
              >
                {username}
              </Link>
            ))}
          </div>

          <div className={s.info}>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { post });
            })}
          </div>

          <p className={s.desc}>{post.annotations}</p>

          {/*---------- MATERIALS ----------*/}
          <Divider horizontal>Materials</Divider>
          <div>
            {isViewer && (!post.files || editMode) && (
              <React.Fragment>
                <div className={s.add_btn}>
                  {files ? (
                    <Button.Group attached size="tiny">
                      <Button onClick={cancelFilesSubmit}>Cancel</Button>
                      <Button.Or />
                      <Button onClick={handleFilesSubmit} positive>
                        Save
                      </Button>
                    </Button.Group>
                  ) : (
                    <Button
                      icon="add"
                      size="tiny"
                      content="Add files"
                      color={colors.second}
                      labelPosition="left"
                      onClick={() => addImageRef.current.click()}
                    />
                  )}

                  {files && (
                    <Header as="h5" className={s.file_attached}>
                      <Icon name="file archive" />
                      <Header.Content>{files[0].name}</Header.Content>
                    </Header>
                  )}
                </div>
                <Header as="h6" color="red" className={s.file_attached}>
                  Attach .zip, .rar or .7z file
                </Header>
                <input
                  accept=".zip, .rar, .7z"
                  onChange={handleFileChange}
                  ref={addImageRef}
                  type="file"
                  name="files"
                  className="none"
                />
              </React.Fragment>
            )}

            {post.files && !editMode && (
              <div>
                <Button
                  content="Download materials"
                  color={colors.main}
                  icon="download"
                  labelPosition="right"
                  as="a"
                  href={post.files}
                />

                <div className={s.icons}>
                  <Icon name="edit" onClick={() => setEditMode(true)}>
                    Edit files
                  </Icon>
                </div>
              </div>
            )}

            {!post.files && !editMode && (
              <Header as='h4'>
                No materials
              </Header>
            )}
          </div>
          <Divider />
          {/*-------------------------------*/}

          <div className={s.bottom}>
            <div className={s.date}>
              <div>
                <span>Created:</span> {created.toLocaleDateString()} {created.toLocaleTimeString()}
              </div>
              <div>
                <span>Updated:</span> {updated.toLocaleDateString()} {updated.toLocaleTimeString()}
              </div>
            </div>

            {isViewer && (
              <div className={s.action_icons}>
                <Icon name="trash" size="large" color="red" onClick={handlePostDelete} />
                <Icon
                  name="edit"
                  size="large"
                  color="green"
                  onClick={() =>
                    history.push(
                      generatePath(routes.editPost, {
                        type,
                        postId: post.id,
                      }),
                    )
                  }
                />
              </div>
            )}
          </div>
        </Segment>
      )}
    </Container>
  );
};

Post.propTypes = {
  children: PropTypes.node,
  useCollection: PropTypes.func.isRequired,
};

Record.propTypes = {
  post: PropTypes.object,
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  maybeNull: PropTypes.bool,
};

export default observer(Post);
