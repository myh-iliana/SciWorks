import React, { Fragment, useState } from 'react';
import { Form, Input, Icon, Button, Checkbox } from 'semantic-ui-react';
import { useField } from 'formik';

import Error from '../Error/Error';

const Field = ({ children, label, required = false, type = 'text', ...props }) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);

  const isPassword = type === 'password';
  const isCheckbox = type === 'checkbox';
  const passwordFieldType = isPassword && show ? 'text' : 'password';
  const fieldType = isPassword ? passwordFieldType : type;

  const showPassword = () => setShow(!show);

  return (
    <Form.Field required={required} error={meta.touched && meta.error && true}>
      {isCheckbox ? (
        <Checkbox label={label} type={type} checked={meta.value} {...props} {...field} />
      ) : (
        <Fragment>
          <label>{label}</label>
          <Input icon>
            <input type={fieldType} {...props} {...field} value={meta.value} />
            {isPassword && (
              <Button type="button" icon onClick={showPassword}>
                <Icon name={show ? 'eye' : 'eye slash'} />
              </Button>
            )}
          </Input>
        </Fragment>
      )}

      {children}
      {meta.touched && meta.error && meta.error !== 'Please enter a value' && (
        <Error>{meta.error}</Error>
      )}
    </Form.Field>
  );
};

export default Field;
