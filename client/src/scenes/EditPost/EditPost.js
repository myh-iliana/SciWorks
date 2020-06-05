import React, { useEffect } from 'react';
import { generatePath, Redirect, useParams } from 'react-router-dom';
import { Container, Segment, Message } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import s from './EditPost.module.scss';
import { useStore } from '../../stores/createStore';
import MonographForm from '../../components/PostForms/MonographForm';
import PeriodicityForm from '../../components/PostForms/PeriodicityForm';
import ThesisForm from '../../components/PostForms/ThesisForm';
import { useMonographsCollection } from '../../stores/posts/monographsCollection';
import { usePeriodicityCollection } from '../../stores/posts/periodicityCollection';
import { useThesisCollection } from '../../stores/posts/thesisCollection';
import * as Api from '../../api';
import { routes } from '../routes';

const EditPost = () => {
  const store = useStore();
  const params = useParams();
  const isPeriodicity = params.type === 'periodicity';
  const isThesis = params.type === 'thesis';
  const isMonograph = params.type === 'monograph';
  const useCollection = (isPeriodicity && usePeriodicityCollection) || (isThesis && useThesisCollection) || (isMonograph && useMonographsCollection);
  const { collection, getById, editPost } = useCollection();
  const post = collection.get(params.postId);
  const user = store.viewer.user;
  const apiMethod = (isPeriodicity && Api.Posts.editPeriodicity) || (isThesis && Api.Posts.editThesis) || (isMonograph && Api.Posts.editMonograph);
  const postRoute = (isPeriodicity && routes.periodicityPost) || (isThesis && routes.thesisPost) || (isMonograph && routes.monographPost);

  const submitForm = ({ author, ...data }) => {
    author = author ? author : user.id;

    editPost.run(params.postId, { author, ...data }, apiMethod);
  };

  useEffect(() => {
    getById.run(params.postId);
  }, [params.postId]);

  if (editPost.redirect) {
    return <Redirect to={generatePath(postRoute, { id: params.postId })} />;
  }

  return (
    <Container>
      <div className={s.form}>
        <Message attached header="Update your post!" size="huge" />
        <Segment padded="very" attached loading={editPost.isLoading}>

          {isMonograph && post && (
            <MonographForm onSubmit={submitForm} editMode post={post} />
          )}
          {isPeriodicity && post && (
            <PeriodicityForm onSubmit={submitForm} editMode post={post} />
          )}
          {isThesis && post && (
            <ThesisForm onSubmit={submitForm} editMode post={post} />
          )}
        </Segment>
      </div>
    </Container>
  );
};

export default observer(EditPost);
