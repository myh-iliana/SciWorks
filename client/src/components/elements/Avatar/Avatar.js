import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Image } from 'semantic-ui-react';

const Avatar = ({ src }) => {
  return (
    <div>
      {src ? <Image avatar src={src} /> : <Icon size='large' name="user circle" />}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Avatar;
