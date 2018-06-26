// @flow

import React from 'react';
import styled from 'styled-components';
// components
import TextField from 'components/TextField';

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
  id: number,
  title: string,
  desc: string,
  body: string,
};

const ContentBlock = (props: Props) => (
  <Container {...props}>
    <Handle />
    <Fields>
      <TextField label="Title" text={props.title} />
      {/* <TextField label="Id" /> */}
      {/* <TextField label="User" /> */}
      {/* <TextField label="Time" /> */}
      <TextField label="Description" text={props.desc} />
      <TextField label="Body" text={props.body} />
      {/* tags */}
    </Fields>
  </Container>
);

export default ContentBlock;
