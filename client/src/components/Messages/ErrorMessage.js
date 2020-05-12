import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

ErrorMessage.propTypes = {
  errors: PropTypes.array.isRequired,
  header: PropTypes.string,
};

export default ErrorMessage;
