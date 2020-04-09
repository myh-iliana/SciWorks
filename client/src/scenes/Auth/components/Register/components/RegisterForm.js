import React from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Field from 'src/components/Form/Field/Field';
import Error from 'src/components/Form/Error/Error';
import { colors } from 'src/components/App/App';

const RegisterForm = () => {
  const formikProps = {
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      pass: '',
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
      pass: Yup.string().min(5, 'Must have minimum 5 characters').required('Please enter a value'),
      passConfirm: Yup.string().min(5, null).required('Please enter a value'),
    }),

    onSubmit: () => {
      setTimeout(() => console.log('submitted'), 2000);
    },
  };

  return (
    <Formik {...formikProps}>
      {({ values, handleSubmit, isSubmitting }) => {
        const isMatch = values.pass === values.passConfirm;

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
            <Field label="Password" name="pass" type="password" placeholder="Password" required />
            <Field
              label="Repeat password"
              name="passConfirm"
              type="password"
              placeholder="Repeat password"
              required
            >
              {!isMatch && (
                <Label basic color="red" pointing>
                  Passwords don't match
                </Label>
              )}
            </Field>
            <Field type="checkbox" label="I am professor" id="isTeacher" name="isTeacher" />

            <Button loading={false} type="submit" size="large" color={colors.main}>
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
