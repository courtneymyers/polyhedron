// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';
import Field from 'components/Field';

// --- styled components
const Container = styled.div`
  display: flex;
  margin-top: 1.25rem;
  border: 1px solid #ccbee4;
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

const Fields = styled.fieldset`
  flex-grow: 1;
  margin: 0;
  padding: 0;
  border: 0;
`;

// --- components
type Props = {
  time: number,
  title: string,
  desc: string,
  body: string,
  removeBlock: (number) => void,
};

const ContentBlock = (props: Props) => (
  <Container {...props}>
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
    <Fields>
      {/* TODO: user, tags */}
      <Field type="text" label="Title" text={props.title} />
      <Field type="text" label="Description" text={props.desc} />
      <Field type="textarea" label="Body" text={props.body} />
    </Fields>
  </Container>
);

export default ContentBlock;
