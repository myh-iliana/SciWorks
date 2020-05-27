import React from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Field from '../../../../components/Form/Field/Field';
import { colors } from '../../../../components/App/App';
import UsersSelect from '../../../../components/Form/UsersSelect/UsersSelect';
import { useStore } from '../../../../stores/createStore';

const PeriodicityForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      title: '',
      udc: '',
      journal: '',
      issueNumber: '',
      journalPages: '',
      pages: '',
      issn: null,
      doi: null,
      annotations: null,
      isScopusAndWS: false,
      isScientometrics: false,
      isProfessional: false,
      isElectronic: false,
      files: null,
      author: null,
      subauthors: null,
    },

    validationSchema: Yup.object().shape({}),

    onSubmit,
  };

  const store = useStore();
  const { isLoading, isError } = store.posts.addPeriodic;

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
              Create
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

PeriodicityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorId: PropTypes.number,
};

export default observer(PeriodicityForm);
