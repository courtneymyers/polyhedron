import React from 'react';
import styled from '@emotion/styled/macro';

const Container = styled.div`
  margin: 0.5rem;
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
  display: block;
  padding: 0.5rem;
  border: 1px solid #ccbee4;
  width: 100%;
  font-size: 0.875rem;
`;

const Textarea = Input.withComponent('textarea');

type Props = {
  type: 'text' | 'textarea';
  label: string;
  text: string;
  updateText: (text: string) => void;
};

function Field({ type, label, text, updateText, ...props }: Props) {
  const field = `field-${label
    .split(' ')
    .join('-')
    .toLowerCase()}`;

  return (
    <Container {...props}>
      <Label htmlFor={field}>{label}</Label>

      {type === 'text' && (
        <Input
          type="text"
          id={field}
          value={text}
          onChange={(ev) => updateText(ev.target.value)}
        />
      )}

      {type === 'textarea' && (
        <Textarea
          rows={5}
          id={field}
          value={text}
          /* TODO: remove 'any' type below once emotion.js updates and properly
            supports withComponent with TypeScript
            (see: https://github.com/emotion-js/emotion/pull/1501)
          */
          onChange={(ev: any) => updateText(ev.target.value)}
        />
      )}
    </Container>
  );
}

export default Field;
