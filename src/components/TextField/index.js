// @flow

import React from 'react';
import styled from 'styled-components';

// --- styled components
const Container = styled.div`
  padding: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: bold;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-top: 0.125rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  width: 100%;
  font-size: 0.875rem;
`;

// --- components
type Props = {
  label: string,
};

const TextField = (props: Props) => (
  <Container {...props}>
    <Label>
      {props.label}
      <Input type="text" />
    </Label>
  </Container>
);

export default TextField;
