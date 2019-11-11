import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled/macro';
// components
import LibraryItem from 'components/LibraryItem';
// contexts
import { BlocksContext } from 'contexts/blocks';
import { ProjectsContext } from 'contexts/projects';

const Container = styled.div``;
const DropContainer = styled.div``;
const DragContainer = styled.div``;

type Props = {};

function BlockLibrary({ ...props }: Props) {
  const { blocks, removeBlock } = React.useContext(BlocksContext);
  const { removeBlockIdFromAllProjects } = React.useContext(ProjectsContext);

  return (
    <Container>
      <Droppable droppableId={`block-library`} isDropDisabled>
        {(provided, snapshot) => (
          <DropContainer ref={provided.innerRef} {...provided.droppableProps}>
            {blocks.map((block, index) => (
              <Draggable key={block.id} draggableId={block.id} index={index}>
                {(provided, snapshot) => (
                  <DragContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <LibraryItem
                      id={block.id}
                      label="Block"
                      title={block.meta.title}
                      desc={block.meta.desc}
                      removeItem={(blockId) => {
                        removeBlock(blockId);
                        removeBlockIdFromAllProjects(blockId);
                      }}
                      setActiveItem={(blockId) =>
                        console.log(`Block "${blockId}" clicked`)
                      }
                    />
                  </DragContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DropContainer>
        )}
      </Droppable>
    </Container>
  );
}

export default BlockLibrary;
