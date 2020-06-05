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

const PeriodicityForm = ({ onSubmit, editMode = false, post = {} }) => {
  const subauthors = post.subauthors ? post.subauthors.split(',').map(item => +item) : null;

  const formikProps = {
    initialValues: {
      title: post?.title || '',
      udc: post?.udc || '',
      journal: post?.journal || '',
      issueNumber: post?.issueNumber || '',
      journalPages: post?.journalPages || '',
      pages: post?.pages || '',
      issn: post?.issn || null,
      doi: post?.doi || null,
      annotations: post?.annotations || null,
      isScopusAndWS: post?.isScopusAndWS || false,
      isScientometrics: post?.isScientometrics || false,
      isProfessional: post?.isProfessional || false,
      isElectronic: post?.isElectronic || false,
      files: post?.files || null,
      author: post?.author || null,
      subauthors: subauthors || null,
    },

    validationSchema: Yup.object().shape({}),

    onSubmit,
  };

  const store = useStore();
  const { isLoading, isError } = store.userPosts.addPeriodic;

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
            <Field required label="Title" name="title" placeholder="Periodicity title" />
            <Field required label="Journal" name="journal" placeholder="American Economic Journal" />
            <Form.Group widths={3}>
              <Field required label="Issue number" name="issueNumber" placeholder="34" />
              <Field required label="Journal pages" name="journalPages" placeholder="0" />
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
              label="Professional"
              name="isProfessional"
              id="isProfessional"
            />
            <Field
              type="checkbox"
              label="Electronic"
              name="isElectronic"
              id="isElectronic"
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

PeriodicityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  post: PropTypes. object,
};

export default observer(PeriodicityForm);
