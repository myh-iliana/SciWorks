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

const MonographForm = ({ onSubmit, editMode = false }) => {
  const formikProps = {
    initialValues: {
      title: '',
      section: null,
      monographPages: '',
      printPages: '',
      pages: '',
      year: '',
      annotations: null,
      isbn: null,
      doi: null,
      isEuLanguage: false,
      files: null,
      author: null,
      subauthors: null,
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

            <UsersSelect setFieldValue={setFieldValue} />
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
              Create
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
};

export default observer(MonographForm);
