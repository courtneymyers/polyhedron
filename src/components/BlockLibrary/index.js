// @flow

import React from 'react';
import styled from 'styled-components';

// --- styled components
const Container = styled.div`
  /* */
`;

const Block = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccbee4;
  background-color: white;
`;

const Text = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const Title = Text.extend`
  font-weight: bold;
  color: #360a80;
`;

// --- components
type Props = {
  blocks: Array<{
    time: number,
    title: string,
    desc: string,
    body: string,
  }>,
};

const BlockLibrary = (props: Props) => (
  <Container {...props}>
    {props.blocks.map((block) => (
      <Block key={block.time}>
        <Title>{block.title}</Title>
      </Block>
    ))}
  </Container>
);

export default BlockLibrary;
