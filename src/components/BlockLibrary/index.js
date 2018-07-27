// @flow

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// components
import LibraryItem from 'components/LibraryItem';
// types
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const Container = styled.div`
  /* */
`;

const DropContainer = styled.div`
  /* */
`;

const DragContainer = styled.div`
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
    <Droppable droppableId={`block-library`} isDropDisabled>
      {(provided, snapshot) => (
        <DropContainer
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          {provided.placeholder}
          {props.blocks.map((block, index) => (
            <Draggable key={block.id} draggableId={block.id} index={index}>
              {(provided, snapshot) => (
                <DragContainer
                  innerRef={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <LibraryItem
                    id={block.id}
                    label="Block"
                    title={block.title}
                    desc={block.desc}
                    removeItem={(blockId) => {
                      props.removeBlock(blockId);
                      props.removeBlockIdFromAllProjects(blockId);
                    }}
                    setActiveItem={(blockId) =>
                      console.log(`Block "${blockId}" clicked`)
                    }
                  />
                </DragContainer>
              )}
            </Draggable>
          ))}
        </DropContainer>
      )}
    </Droppable>
  </Container>
);

export default BlockLibrary;
