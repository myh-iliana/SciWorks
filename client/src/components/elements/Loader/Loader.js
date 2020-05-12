import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const Loader = ({ active = false, size = 'big', text, ...props }) => {
  return (
    <SemanticLoader active={active} size={size} {...props}>
      {text}
    </SemanticLoader>
  );
};

Loader.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.string,
  text: PropTypes.node,
};

export default Loader;
