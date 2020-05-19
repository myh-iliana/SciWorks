import React, { useEffect } from 'react';
import { Option } from 'semantic-react';
import PropTypes from 'prop-types';

import SelectField from '../SelectField/SelectField';
import { useStore } from '../../../stores/createStore';
import { observer } from 'mobx-react';

import s from './UsersSelect.module.scss';

const UsersSelect = ({ setFieldValue, error, ...props }) => {
  const store = useStore();
  const { fetchAll, items } = store.users;

  useEffect(() => {
    fetchAll.run();
  }, []);

  return (
    <SelectField
      oneValue={false}
      required
      multiple
      loading={fetchAll.isLoading}
      label="Select authors"
      name="subauthors"
      placeholder="Select authors"
      setFieldValue={setFieldValue}
      error={error}
      {...props}
    >
      {items.map(({ username,fullName, id }) => (
        <Option key={id} value={id}>
          {username} <span className={s.light_text}>({fullName})</span>
        </Option>
      ))}
    </SelectField>
  );
};

UsersSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  error: PropTypes.node,
};

export default observer(UsersSelect);
