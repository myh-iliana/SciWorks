import React from 'react';

import s from './Avatar.module.scss';
import { Icon, Image } from 'semantic-ui-react';

const Avatar = ({ src  }) => {
  return (
    <div>
      {src ? <Image avatar src={src} /> : <Icon size='large' name="user circle" />}
    </div>
  );
};

export default Avatar;
