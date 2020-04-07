import React from 'react';

import s from './Error.module.scss';

const Error = ({ children }) => {
  return <div className={s.error}>{children}</div>;
};

export default Error;
