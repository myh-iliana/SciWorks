import React, { useEffect, useState } from 'react';
import { Accordion, Header, Icon, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/createStore';
import UsersList from '../UsersList/UsersList';

const CathedrasList = () => {
  const [activeIndex, setActiveIndex] = useState();
  const store = useStore();
  const { fetchAll, items } = store.cathedras;

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex)
  };

  useEffect(() => {
    fetchAll.run();
  }, []);

  if (!fetchAll.isLoading && !items[0]) {
    return <Header as='h4' textAlign='center'>No cathedras</Header>
  }

  return (
    <Accordion fluid styled>
      <Loader active={fetchAll.isLoading} />
      {items.map(({ id, name, workers }) => (
        <React.Fragment>
          <Accordion.Title
            active={activeIndex === id}
            index={id}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            {name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === id}>
            <UsersList loading={fetchAll.isLoading} items={workers} />
          </Accordion.Content>
        </React.Fragment>
      ))}
    </Accordion>
  );
};

export default observer(CathedrasList);
