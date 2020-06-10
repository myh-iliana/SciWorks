import React, { useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { Container, Segment, Message, Form } from 'semantic-ui-react';
import { Option } from 'semantic-react';
import { observer } from 'mobx-react';

import s from './CreatePost.module.scss';
import { useStore } from '../../stores/createStore';
import SelectField from '../../components/Form/SelectField/SelectField';
import MonographForm from '../../components/PostForms/MonographForm';
import PeriodicityForm from '../../components/PostForms/PeriodicityForm';
import ThesisForm from '../../components/PostForms/ThesisForm';
import { routes } from '../routes';

const CreatePost = () => {
  const store = useStore();
  const history = useHistory();
  const { addPeriodic, addThesis, addMonograph } = store.userPosts;
  const user = store.viewer.user;
  const DEFAULT_VALUE = 'periodicity';
  const [selected, setSelected] = useState(DEFAULT_VALUE);
  const types = [
    { value: 'periodicity', text: 'Periodicity' },
    { value: 'thesis', text: 'Thesis' },
    { value: 'monograph', text: 'Monograph' },
  ];

  const submitForm = async ({ author, ...data }) => {
    author = author ? author : user.id;
    if (selected === 'periodicity') addPeriodic.run({author, ...data});
    if (selected === 'thesis') addThesis.run({author, ...data});
    if (selected === 'monograph') addMonograph.run({author, ...data});

    history.push(generatePath(routes.account, { username: store.viewer.user.username }))
  };

  return (
    <Container>
      <div className={s.form}>
        <Message attached header="Here you can create your post!" size="huge" />
        <Segment padded="very" attached>
          {/* --- Select post type --- */}
          <Form style={{ marginBottom: '17px' }}>
            <SelectField
              getValue={(val) => setSelected(val[0])}
              formik={false}
              label="Choose post type"
              defaultValue={[DEFAULT_VALUE]}
            >
              {types.map(({ value, text }) => (
                <Option key={value} value={value}>
                  {text}
                </Option>
              ))}
            </SelectField>
          </Form>
          {/* --------- */}

          {selected === 'monograph' && (
            <MonographForm onSubmit={submitForm} isAdmin={user.isAdmin} />
          )}
          {selected === 'periodicity' && (
            <PeriodicityForm onSubmit={submitForm} isAdmin={user.isAdmin} />
          )}
          {selected === 'thesis' && (
            <ThesisForm onSubmit={submitForm} isAdmin={user.isAdmin} />
          )}
        </Segment>
      </div>
    </Container>
  );
};

export default observer(CreatePost);
