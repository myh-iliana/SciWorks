import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = ({ errors, header = "Something went wrong", ...props }) => {
  return (
    <Message
      error
      header={header}
      content={errors.map((error) => (
        <span>
          {error.msg}
          <br />
        </span>
      ))}
      {...props}
    />
  );
};

export default ErrorMessage;
