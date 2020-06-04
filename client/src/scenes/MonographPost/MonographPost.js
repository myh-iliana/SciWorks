import React from 'react';
import { observer } from 'mobx-react';

import { useMonographsCollection } from '../../stores/posts/monographsCollection';
import Post, { Record } from '../../components/Post/Post';
import * as Api from '../../api';

const PeriodicPost = () => {
  return (
    <Post useCollection={useMonographsCollection} apiMethodForPostEdit={Api.Posts.editMonograph}>
      <Record label="Section" field="section" maybeNull />
      <Record label="ISBN" field="isbn" maybeNull />
      <Record label="DOI" field="doi" maybeNull />
      <Record label="Pages" field="monographPages" />
      <Record label="Print pages" field="printPages" />
      <Record label="Pages" field="pages" />
      <Record label="Year" field="year" />
    </Post>
  );
};

export default observer(PeriodicPost);
