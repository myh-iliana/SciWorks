import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Field from 'src/components/Form/Field/Field';
import Error from 'src/components/Form/Error/Error';
import { colors } from 'src/components/App/App';

const RegisterForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      passConfirm: '',
      isTeacher: false,
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(255, 'Must be shorter than 255'),
      username: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .max(255, 'Must be shorter than 255')
        .required('Please enter a value'),
      email: Yup.string()
        .email('Must be a valid email address')
        .max(255, 'Must be shorter than 255')
        .required('Please enter a value'),
      password: Yup.string()
        .min(5, 'Must have minimum 5 characters')
        .required('Please enter a value'),
      passConfirm: Yup.string().min(5, null).required('Please enter a value'),
    }),

    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      {({ values, handleSubmit }) => {
        const isMatch = values.password === values.passConfirm;

        return (
          <Form noValidate onSubmit={handleSubmit} className="attached grey segment">
            <Field label="Full name" name="fullName" placeholder="Bruce Wayne" />
            <Field label="Username" name="username" placeholder="Batman" required />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="something@example.com"
              required
            />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <Field
              label="Repeat password"
              name="passConfirm"
              type="password"
              placeholder="Repeat password"
              required
            >
              {!isMatch && <Error>Passwords don't match</Error>}
            </Field>
            <Field type="checkbox" label="I am professor" id="isTeacher" name="isTeacher" />

            <Button type="submit" size="large" color={colors.main}>
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
