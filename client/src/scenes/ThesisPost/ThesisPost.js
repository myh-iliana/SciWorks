import React from 'react';
import { observer } from 'mobx-react';

import { useThesisCollection } from '../../stores/posts/thesisCollection';
import Post, { Record } from '../../components/Post/Post';
import * as Api from '../../api';

const PeriodicPost = () => {
  return (
    <Post useCollection={useThesisCollection} apiMethodForPostEdit={Api.Posts.editThesis}>
      <Record label="UDC" field="udc" />
      <Record label="ISSN" field="issn" maybeNull />
      <Record label="DOI" field="doi" maybeNull />
      <Record label="Conference" field="conference" />
      <Record label="City" field="city" />
      <Record label="Dates" field="dates" />
      <Record label="Collection pages" field="collectionPages" />
      <Record label="Pages" field="pages" />
    </Post>
  );
};

export default observer(PeriodicPost);
