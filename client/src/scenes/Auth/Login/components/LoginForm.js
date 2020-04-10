import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Field from 'src/components/Form/Field/Field';
import { colors } from 'src/components/App/App';

const LoginForm = () => {
  const formikProps = {
    initialValues: {
      username: '',
      pass: '',
    },

    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(1, null)
        .max(255, 'Must be shorter than 255')
        .required(' '),
      pass: Yup.string().min(5, null).required(' '),
    }),

    onSubmit: () => {
      setTimeout(() => console.log('submitted'), 2000);
    },
  };

  return (
    <Formik {...formikProps}>
      {({ handleSubmit }) => {
        return (
          <Form noValidate onSubmit={handleSubmit} className='attached grey segment'>
            <Field label="Username" name="username" placeholder="Batman" />
            <Field label="Password" name="pass" type="password" placeholder="Password" />

            <Button type="submit" size="large" color={colors.main}>
              Login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
