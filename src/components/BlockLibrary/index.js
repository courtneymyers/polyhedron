// @flow

import React from 'react';
import styled from 'styled-components';
// components
import LibraryItem from 'components/LibraryItem';
// types
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const Container = styled.div`
  /* */
`;

// --- components
type Props = {
  // context props
  blocks: Array<BlockProps>,
  removeBlock: (string) => void,
  removeBlockIdFromAllProjects: (string) => void,
};

const BlockLibrary = (props: Props) => (
  <Container {...props}>
    {props.blocks.map((block) => (
      <LibraryItem
        key={block.id}
        id={block.id}
        label="Block"
        title={block.title}
        desc={block.desc}
        removeItem={(blockId) => {
          props.removeBlock(blockId);
          props.removeBlockIdFromAllProjects(blockId);
        }}
        setActiveItem={(blockId) => console.log(`Block "${blockId}" clicked`)}
      />
    ))}
  </Container>
);

export default BlockLibrary;
