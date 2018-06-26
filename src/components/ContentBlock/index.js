// @flow

import React from 'react';
import styled from 'styled-components';
// components
import TextField from 'components/TextField';

// --- styled components
const Container = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 1px solid #eee;
`;

// --- components
type Props = {};

const ContentBlock = (props: Props) => (
  <Container {...props}>
    <TextField label="Title" />
    {/* <TextField label="Id" /> */}
    {/* <TextField label="User" /> */}
    {/* <TextField label="Time" /> */}
    <TextField label="Description" />
    <TextField label="Body" />
    {/* tags */}
  </Container>
);

export default ContentBlock;
