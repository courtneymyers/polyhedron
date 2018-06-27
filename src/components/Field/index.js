// @flow

import React from 'react';
import styled from 'styled-components';

// --- styled components
const Container = styled.div`
  padding: 0.5rem;
`;

const Label = styled.label`
  display: block;
  padding: 0.25rem 0.3125rem 0.125rem;
  border: 1px solid #ccbee4;
  border-bottom: none;
  font-size: 0.75rem;
  font-weight: bold;
  color: #360a80;
  background-color: #edeaf3;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 0.5rem;
  border: 1px solid #ccbee4;
  width: 100%;
  font-size: 0.875rem;
`;

const Textarea = Input.withComponent('textarea');

// --- components
type Props = {
  type: 'text' | 'textarea',
  label: string,
  text: string,
  updateText: (string) => void,
};

const Field = (props: Props) => {
  const field = `field-${props.label
    .split(' ')
    .join('-')
    .toLowerCase()}`;

  return (
    <Container {...props}>
      <Label htmlFor={field}>{props.label}</Label>

      {props.type === 'text' && (
        <Input
          type="text"
          id={field}
          value={props.text}
          onChange={(ev) => props.updateText(ev.target.value)}
        />
      )}

      {props.type === 'textarea' && (
        <Textarea
          rows={5}
          id={field}
          value={props.text}
          onChange={(ev) => props.updateText(ev.target.value)}
        />
      )}
    </Container>
  );
};

export default Field;
