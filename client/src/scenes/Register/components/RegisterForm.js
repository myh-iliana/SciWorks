import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Field from '../../../components/Form/Field/Field';
import Error from '../../../components/Form/Error/Error';

const RegisterForm = () => {
  const formikProps = {
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      pass: '',
      passConfirm: '',
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string().min(2, 'Must be at least 2 characters').max(255, 'Must be shorter than 255'),
      username: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      email: Yup.string()
        .email('Must be a valid email address')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      pass: Yup.string().min(5, 'Must have minimum 5 characters').required("Can't be empty"),
      passConfirm: Yup.string().min(5, null).required(null),
    }),

    onSubmit: () => {
      setTimeout(() => console.log('submitted'), 2000);
    },
  };

  return (
    <Formik {...formikProps}>
      {({ values, errors, handleSubmit, isSubmitting }) => {
        const isEmpty = Object.entries(errors).length === 0;
        const isMatch = values.pass === values.passConfirm;

        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Field label="Full name" name="fullName" placeholder="Bruce Wayne" />
            <Field label="Username" name="username" placeholder="Batman" required />
            <Field label="Email" name="email" type="email" placeholder="something@example.com" required />
            <Field label="Password" name="pass" type="password" required />
            <Field label="Confirm password" name="passConfirm" type="password" required>
              {!isMatch && <Error>Passwords don't match</Error>}
            </Field>

            <Button type="submit" size="large" color="purple">
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
