// @flow

import React from 'react';
import styled from 'styled-components';
// components
import Field from 'components/Field';

// --- styled components
const Container = styled.div`
  display: flex;
  margin-top: 1.25rem;
  border: 1px solid #ccbee4;
`;

const Fields = styled.fieldset`
  flex-grow: 1;
  margin: 0;
  padding: 0;
  border: 0;
`;

const Handle = styled.div`
  flex-basis: 1.25rem;
  background-color: #ccbee4;
`;

// --- components
type Props = {
  time: number,
  title: string,
  desc: string,
  body: string,
};

const ContentBlock = (props: Props) => (
  <Container {...props}>
    <Handle />
    <Fields>
      {/* TODO: user, tags */}
      <Field type="text" label="Title" text={props.title} />
      <Field type="text" label="Description" text={props.desc} />
      <Field type="textarea" label="Body" text={props.body} />
    </Fields>
  </Container>
);

export default ContentBlock;
