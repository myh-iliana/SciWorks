import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Field from 'src/components/Form/Field/Field';
import { colors } from 'src/components/App/App';

const LoginForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: Yup.object().shape({
      username: Yup.string()
        .max(255, 'Must be shorter than 255')
        .required(' '),
      password: Yup.string().required(' '),
    }),

    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      {({ handleSubmit }) => {
        return (
          <Form noValidate onSubmit={handleSubmit} className='attached grey segment'>
            <Field label="Username" name="username" placeholder="Batman" />
            <Field label="Password" name="password" type="password" placeholder="Password" />

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
