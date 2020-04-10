import React from 'react';
import { Label } from 'semantic-ui-react';

const Error = ({ children }) => {
  return (
    <Label basic color="red" pointing>
      {children}
    </Label>
  );
};

export default Error;
