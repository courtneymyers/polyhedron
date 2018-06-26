// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';
import Field from 'components/Field';

// --- styled components
const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  border: 1px solid #ccbee4;
`;

const Fields = styled.fieldset`
  order: 2;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  border: 0;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 1.75rem;
  background-color: #ccbee4;
`;

const RemoveButton = styled(BlockButton)`
  /* */
`;

// --- components
type Props = {
  time: number,
  title: string,
  desc: string,
  body: string,
  removeBlock: (number) => void,
};

const Block = (props: Props) => (
  <Container {...props}>
    <Fields>
      {/* TODO: user, tags */}
      <Field type="text" label="Title" text={props.title} />
      <Field type="text" label="Description" text={props.desc} />
      <Field type="textarea" label="Body" text={props.body} />
    </Fields>

    <Handle>
      <RemoveButton
        text="–"
        href=""
        onClick={(ev) => {
          ev.preventDefault();
          props.removeBlock(props.time);
        }}
      />
    </Handle>
  </Container>
);

export default Block;
