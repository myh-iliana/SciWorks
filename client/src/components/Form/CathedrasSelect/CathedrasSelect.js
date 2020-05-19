import React, { useEffect } from 'react';
import { Option } from 'semantic-react';
import PropTypes from 'prop-types';

import SelectField from '../SelectField/SelectField';
import Field from '../Field/Field';
import { useStore } from '../../../stores/createStore';
import { observer } from 'mobx-react';

const CathedrasSelect = ({ isTeacher = false, setFieldValue, error, ...props }) => {
  const store = useStore();
  const { items, fetchAll } = store.cathedras;

  useEffect(() => {
    fetchAll.run();
  }, []);

  return (
    <React.Fragment>
      <Field onClick={(e, props) => !props.checked && setFieldValue('cathedraId', null)} type="checkbox" label="I am professor" id="isTeacher" name="isTeacher" />

      <SelectField
        label='Your cathedra'
        name="cathedraId"
        placeholder="Select cathedra"
        required={isTeacher}
        disabled={!isTeacher}
        setFieldValue={setFieldValue}
        error={error}
        loading={fetchAll.isLoading}
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

export default observer(CathedrasSelect);
