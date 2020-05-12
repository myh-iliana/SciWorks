import React from 'react';
import { Option } from 'semantic-react';
import PropTypes from 'prop-types';

import SelectField from '../SelectField/SelectField';
import Field from '../Field/Field';

const CathedrasSelect = ({ items, isTeacher = false, setFieldValue, ...props }) => {
  return (
    <React.Fragment>
      <Field onClick={(e, props) => !props.checked && setFieldValue('cathedraId', null)} type="checkbox" label="I am professor" id="isTeacher" name="isTeacher" />

      <SelectField
        label='Your cathedra'
        name="cathedraId"
        required={isTeacher}
        disabled={!isTeacher}
        setFieldValue={setFieldValue}
        {...props}
      >
        {items.map(({ name, id }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </SelectField>
    </React.Fragment>
  );
};

CathedrasSelect.propTypes = {
  items: PropTypes.array.isRequired,
  isTeacher: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
};

export default CathedrasSelect;
