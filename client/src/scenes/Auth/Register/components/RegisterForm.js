import React from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { Option } from 'semantic-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Field from 'src/components/Form/Field/Field';
import Error from 'src/components/Form/Error/Error';
import { colors } from 'src/components/App/App';
import SelectField from '../../../../components/Form/SelectField/SelectField';

const RegisterForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      passConfirm: '',
      isTeacher: false,
      cathedra: [],
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

  const options = [
    { name: 'Itan', id: '1' },
    { name: 'Nina', id: '2' },
    { name: 'Tan', id: '3' },
  ];

  return (
    <Formik {...formikProps}>
      {({ values, handleSubmit, setFieldValue }) => {
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
            <SelectField disabled={!values.isTeacher} name="cathedra" setFieldValue={setFieldValue}>
              {options.map(({ name, id }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </SelectField>

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
