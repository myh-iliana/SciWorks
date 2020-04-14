import React, { useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Option } from 'semantic-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';

import Field from 'src/components/Form/Field/Field';
import Error from 'src/components/Form/Error/Error';
import { colors } from 'src/components/App/App';
import SelectField from '../../../../components/Form/SelectField/SelectField';
import { useStore } from '../../../../stores/createStore';

const RegisterForm = ({ onSubmit }) => {
  const store = useStore();
  const { items } = store.cathedras;

  useEffect(() => {
   store.cathedras.fetchAll.run();
  }, []);

  const formikProps = {
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      passConfirm: '',
      isTeacher: false,
      cathedraId: [],
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .min(3, 'Must be at least 3 characters')
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
        .min(6, 'Must have minimum 6 characters')
        .required('Please enter a value'),
      passConfirm: Yup.string().required('Please enter a value'),
    }),

    onSubmit,
  };

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
            <SelectField disabled={!values.isTeacher} name="cathedraId" setFieldValue={setFieldValue}>
              {items.map(({ name, id }) => (
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

export default observer(RegisterForm);
