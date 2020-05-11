import React, { useState } from 'react';
import { Select } from 'semantic-react';
import { Form } from 'semantic-ui-react';

import './SelectField.scss';

const SelectField = ({
  setFieldValue,
  children,
  required,
  name,
  label,
  defaultValue,
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
        placeholder="Select cathedra"
        selected={selected}
        onSelectChange={(val) => {
          setFieldValue(name, val[0]);
          setSelected(val);
          setActive(false);
        }}
        onClick={() => setActive(!active)}
        onRequestClose={() => setActive(false)}
        className="select"
        style={active ? { '--display': 'block' } : { '--display': 'none' }}
        onSearchStringChange={(search) => setSearchString(search)}
        searchString={searchString}
        name={name}
        {...props}
      >
        {children}
      </Select>
    </Form.Field>
  );
};

export default SelectField;
