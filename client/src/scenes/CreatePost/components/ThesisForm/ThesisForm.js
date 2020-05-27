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

const ThesisForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      title: '',
      udc: '',
      conference: '',
      city: '',
      dates: '',
      collectionPages: '',
      pages: '',
      issn: null,
      doi: null,
      annotations: null,
      isScopusAndWS: false,
      isScientometrics: false,
      isInternational: false,
      files: null,
      author: null,
      subauthors: null,
    },

    validationSchema: Yup.object().shape({}),

    onSubmit,
  };

  const store = useStore();
  const { isLoading, isError } = store.posts.addThesis;

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

            <UsersSelect setFieldValue={setFieldValue} />
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
              Create
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

ThesisForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorId: PropTypes.number,
};

export default observer(ThesisForm);
