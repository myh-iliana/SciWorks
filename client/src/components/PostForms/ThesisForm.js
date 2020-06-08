import React from 'react';
import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { useStore } from '../../stores/createStore';
import UsersSelect from '../Form/UsersSelect/UsersSelect';
import Field from '../Form/Field/Field';
import { colors } from '../App/App';

const ThesisForm = ({ onSubmit, editMode = false, isAdmin, post = {} }) => {
  const subauthors = post.subauthors ? post.subauthors.split(',').map(item => +item) : null;

  const formikProps = {
    initialValues: {
      title: post?.title || '',
      udc: post?.udc || '',
      conference: post?.conference || '',
      city: post?.city || '',
      dates: post?.dates || '',
      collectionPages: post?.collectionPages || '',
      pages: post?.pages || '',
      issn: post?.issn || null,
      doi: post?.doi || null,
      annotations: post?.annotations || null,
      isScopusAndWS: post?.isScopusAndWS || false,
      isScientometrics: post?.isScientometrics || false,
      isInternational: post?.isInternational || false,
      files: post?.files || null,
      author: post?.author || null,
      subauthors: post?.subauthors || null,
    },

    validationSchema: Yup.object().shape({}),

    onSubmit,
  };

  const store = useStore();
  const { isLoading, isError } = store.userPosts.addThesis;

  return (
    <Formik {...formikProps}>
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <Form
            error={isError}
            loading={isLoading}
            noValidate
            onSubmit={handleSubmit}
            className="attached"
          >
            {/*{<Message error header="Log in failed" content={errorMsg} />}*/}

            {isAdmin && (
              <UsersSelect
                name="author"
                setFieldValue={setFieldValue}
                label="Select author"
                placeholder="Select author"
                multiple={false}
              />
            )}
            <UsersSelect
              name="subauthors"
              setFieldValue={setFieldValue}
              defaultValue={subauthors}
              label="Select subauthors"
              placeholder="Select subauthors"
            />

            <Field required label="Title" name="title" placeholder="Thesis title" />
            <Field required label="Conference" name="conference" placeholder="Florida High School Hockey Association Conference" />
            <Field required label="City" name="city" placeholder="Ivano-Frankivsk" />
            <Field required label="Dates" name="dates" placeholder="13 Jan. 2018" />
            <Form.Group widths={2}>
              <Field required label="Collection pages" name="collectionPages" placeholder="0" />
              <Field required label="Pages" name="pages" placeholder="0" />
            </Form.Group>
            <Form.Group widths={3}>
              <Field required label="UDC" name="udc" placeholder="316.35" />
              <Field label="ISSN" name="issn" placeholder="1050-124X" />
              <Field label="DOI" name="doi" placeholder="10.15421/abc1234567890" />
            </Form.Group>
            <Field type="textarea" label="Annotation" name="annotations" placeholder="..." />
            <Field
              type="checkbox"
              label="Scopus and Web of Science"
              name="isScopusAndWS"
              id="isScopusAndWS"
            />
            <Field
              type="checkbox"
              label="Other scientometrics databases"
              name="isScientometrics"
              id="isScientometrics"
            />
            <Field
              type="checkbox"
              label="International conference"
              name="isInternational"
              id="isInternational"
            />

            <Button type="submit" color={colors.main}>
              { editMode ? 'Update' : 'Create' }
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

ThesisForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  post: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

export default observer(ThesisForm);
