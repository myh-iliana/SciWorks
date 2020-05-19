import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Segment, Message, Form } from 'semantic-ui-react';
import { Select, Option } from 'semantic-react';

import s from './CreatePost.module.scss';
import MonographForm from './components/MonographForm/MonographForm';
import SelectField from '../../components/Form/SelectField/SelectField';
import PeriodicityForm from './components/PeriodicityForm/PeriodicityForm';
import ThesisForm from './components/ThesisForm/ThesisForm';
import { useStore } from '../../stores/createStore';

const CreatePost = () => {
  const store = useStore();
  const DEFAULT_VALUE = 'periodicity';
  const [selected, setSelected] = useState(DEFAULT_VALUE);
  const submitForm = () => {};
  const types = [
    { value: 'periodicity', text: 'Periodicity' },
    { value: 'thesis', text: 'Thesis' },
    { value: 'monograph', text: 'Monograph' },
  ];

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

          {selected === 'monograph' && <MonographForm onSubmit={submitForm} />}
          {selected === 'periodicity' && <PeriodicityForm onSubmit={submitForm} />}
          {selected === 'thesis' && <ThesisForm onSubmit={submitForm} />}
        </Segment>
      </div>
    </Container>
  );
};

export default CreatePost;
