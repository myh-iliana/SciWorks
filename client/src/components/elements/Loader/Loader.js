import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react'

const Loader = ({ active = false, size = 'big', text, ...props }) => {
  return (
    <SemanticLoader active={active} size={size} {...props}>
      {text}
    </SemanticLoader>
  );
};

export default Loader;
