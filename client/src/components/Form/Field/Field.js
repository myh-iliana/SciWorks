import React, { useState } from 'react';
import { Form, Input, Icon, Button } from 'semantic-ui-react';
import { useField } from 'formik';

import Error from '../Error/Error';

const Field = ({ children, label, required = false, type = 'text', ...props }) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);

  const isPassword = type === 'password';
  const passwordFieldType = isPassword && show ? 'text' : 'password';
  const fieldType = isPassword ? passwordFieldType : type;

  const showPassword = () => setShow(!show);

  return (
    <Form.Field required={required} error={meta.touched && meta.error && true}>
      <label>{label}</label>
      <Input icon>
        <input type={fieldType} {...props} {...field} value={meta.value} />
        {isPassword && (
          <Button type='button' icon onClick={showPassword}>
            <Icon name={show ? 'eye' : 'eye slash'} />
          </Button>
        )}
      </Input>
      {children}
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </Form.Field>
  );
};

export default Field;
