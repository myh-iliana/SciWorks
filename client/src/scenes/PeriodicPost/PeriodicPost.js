import React from 'react';
import { observer } from 'mobx-react';

import { usePeriodicityCollection } from '../../stores/posts/periodicityCollection';
import Post, { Record } from '../../components/Post/Post';
import * as Api from '../../api';

const PeriodicPost = () => {
  return (
    <Post
      useCollection={usePeriodicityCollection}
      apiMethodForDelete={Api.Posts.deletePeriodicity}
      apiMethodForPostEdit={Api.Posts.editPeriodicity}
    >
      <Record label="UDC" field="udc" />
      <Record label="ISSN" field="issn" maybeNull />
      <Record label="DOI" field="doi" maybeNull />
      <Record label="Journal" field="journal" />
      <Record label="Issue number" field="issueNumber" />
      <Record label="Journal pages" field="journalPages" />
      <Record label="Pages" field="pages" />
    </Post>
  );
};

export default observer(PeriodicPost);
