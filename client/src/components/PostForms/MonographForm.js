import React from 'react';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { useStore } from '../../stores/createStore';
import { colors } from '../App/App';
import UsersSelect from '../Form/UsersSelect/UsersSelect';
import Field from '../Form/Field/Field';

const MonographForm = ({ onSubmit, editMode = false, post = {} }) => {
  const subauthors = post.subauthors ? post.subauthors.split(',').map(item => +item) : null;

  const formikProps = {
    initialValues: {
      title: post?.title || '',
      section: post?.section || null,
      monographPages: post?.monographPages || '',
      printPages: post?.printPages || '',
      pages: post?.pages || '',
      year: post?.year || '',
      annotations: post?.annotations || null,
      isbn: post?.isbn || null,
      doi: post?.doi || null,
      isEuLanguage: post?.isEuLanguage || false,
      files: post?.files || null,
      author: post?.author || null,
      subauthors: post?.subauthors || null,
    },

    validationSchema: Yup.object().shape({}),

    onSubmit,
  };

  const store = useStore();
  const { isLoading, isError } = store.userPosts.addMonograph;

  return (
    <Formik {...formikProps}>
      {({ handleSubmit, setFieldValue }) => {
        return (
          <Form
            error={isError}
            loading={isLoading}
            noValidate
            onSubmit={handleSubmit}
            className="attached"
          >
            {/*{<Message error header="Log in failed" content={errorMsg} />}*/}

            <UsersSelect setFieldValue={setFieldValue} defaultValue={subauthors} />
            <Field required label="Title" name="title" placeholder="Monograph title" />
            <Field label="Section" name="section" placeholder="Section name" />
            <Form.Group widths={2}>
              <Field label="ISBN" name="isbn" placeholder="978-1-10-769989-2" />
              <Field label="DOI" name="doi" placeholder="10.15421/abc1234567890" />
            </Form.Group>
            <Form.Group widths={4}>
              <Field required label="Monograph pages" name="monographPages" placeholder="0" />
              <Field required label="Print pages" name="printPages" placeholder="0" />
              <Field required label="Pages" name="pages" placeholder="0" />
              <Field required label="Year" name="year" placeholder="2015" />
            </Form.Group>
            <Field type="textarea" label="Annotation" name="annotations" placeholder="..." />
            <Field
              type="checkbox"
              label="European Union language"
              name="isEuLanguage"
              id="isEuLanguage"
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

MonographForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  post: PropTypes. object,
};

export default observer(MonographForm);
