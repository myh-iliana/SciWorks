import React, { useState } from 'react';
import { Select } from 'semantic-react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './SelectField.scss';
import Error from '../Error/Error';

const SelectField = ({
  setFieldValue,
  children,
  required = false,
  name,
  label,
  defaultValue,
  formik = true,
  multiple = false,
  getValue,
  error = null,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selected, setSelected] = useState(defaultValue || []);

  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <Select
        active={active}
        search
        selection
        selected={selected}
        onSelectChange={(val) => {
          setSelected(val);
          setActive(false);
          if (formik) {
            setFieldValue(name, multiple ? val : val[0]);
          } else {
            getValue(val);
          }
        }}
        onClick={() => setActive(!active)}
        onRequestClose={() => setActive(false)}
        className="select"
        style={active ? { '--display': 'block' } : { '--display': 'none' }}
        onSearchStringChange={(search) => setSearchString(search)}
        searchString={searchString}
        name={name}
        multiple={multiple}
        {...props}
      >
        {children}
      </Select>

      {error && <Error>{error}</Error>}
    </Form.Field>
  );
};

SelectField.propTypes = {
  setFieldValue: PropTypes.func,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.node,
  defaultValue: PropTypes.array,
  formik: PropTypes.bool,
  multiple: PropTypes.bool,
  getValue: PropTypes.func,
  error: PropTypes.node,
};

export default SelectField;
