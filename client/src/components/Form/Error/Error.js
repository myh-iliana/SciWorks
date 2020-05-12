import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Error = ({ children }) => {
  return (
    <Label basic color="red" pointing>
      {children}
    </Label>
  );
};

Error.propTypes = {
  children: PropTypes.node,
};

export default Error;
