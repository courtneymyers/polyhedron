// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';

// --- styled components
const Container = styled.div`
  /* */
`;

const RemoveButton = styled(BlockButton)`
  /* */
`;

const Block = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border: 1px solid #ccbee4;
  background-color: white;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 1.75rem;
  background-color: #ccbee4;
`;

const Text = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const Title = Paragraph.extend`
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
        <Handle>
          <RemoveButton
            text="–"
            href=""
            onClick={(ev) => {
              ev.preventDefault();
            }}
          />
        </Handle>
        <Text>
          <Title>{block.title}</Title>
        </Text>
      </Block>
    ))}
  </Container>
);

export default BlockLibrary;
