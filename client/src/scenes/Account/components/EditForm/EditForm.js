import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Field from '../../../../components/Form/Field/Field';
import { useStore } from '../../../../stores/createStore';
import ErrorMessage from '../../../../components/Messages/ErrorMessage';
import CathedrasSelect from '../../../../components/Form/CathedrasSelect/CathedrasSelect';

const EditForm = ({ user, cancelEdit }) => {
  const history = useHistory();
  const store = useStore();
  const { items } = store.cathedras;
  const { fullName, username, email, isTeacher, cathedraId, id, bio } = user;
  const { isLoading, isError, errorMsg, redirect } = store.viewer.edit;

  const onSubmit = async (data) => {
    await store.viewer.edit.run(data);
  };

  const formikProps = {
    initialValues: {
      id,

      // --- values to change
      fullName,
      username,
      email,
      isTeacher,
      cathedraId,
      bio,
      // ---

      currentUsername: username,
      currentEmail: email,
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(255, 'Must be shorter than 255')
        .nullable(),
      username: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .max(255, 'Must be shorter than 255')
        .required('Please enter a value'),
      email: Yup.string()
        .email('Must be a valid email address')
        .max(255, 'Must be shorter than 255')
        .required('Please enter a value'),
      bio: Yup.string().nullable(),
      isTeacher: Yup.boolean(),
      cathedraId: Yup.number().when('isTeacher', {
        is: true,
        then: Yup.number().required('Please select something'),
        otherwise: Yup.number().nullable()
      })
    }),

    onSubmit,
  };

  useEffect(() => {
    if (redirect) {
      history.push(username);
      cancelEdit();
    }
  }, [redirect]);

  return (
    <Formik {...formikProps}>
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <Form noValidate onSubmit={handleSubmit} error={isError} loading={isLoading}>
            {isError && <ErrorMessage errors={errorMsg} />}

            <Field label="Full name" name="fullName" placeholder="Bruce Wayne" />
            <Field label="Username" name="username" placeholder="Batman" required />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="something@example.com"
              required
            />

            <CathedrasSelect
              isTeacher={values.isTeacher}
              setFieldValue={setFieldValue}
              defaultValue={[cathedraId]}
              items={items}
            />

            <Field
              type="textarea"
              name="bio"
              label="Tell about yourself"
              placeholder="Tell us about yourself"
            />

            <Button.Group attached>
              <Button onClick={cancelEdit}>Cancel</Button>
              <Button.Or />
              <Button type="submit" positive>
                Save
              </Button>
            </Button.Group>
          </Form>
        );
      }}
    </Formik>
  );
};

EditForm.propTypes = {
  user: PropTypes.object.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default observer(EditForm);
