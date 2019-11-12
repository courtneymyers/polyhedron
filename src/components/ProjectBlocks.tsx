import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled/macro';
// components
import Block from 'components/Block';
// contexts
import { useProjectsContext } from 'contexts/projects';
import { BlockProps } from 'contexts/blocks';

const DropContainer = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#9b88c1' : 'transparent'};
  transition: background-color 0.2s ease;
`;

const DragContainer = styled.div``;

type Props = {
  projectId: string;
  blocks: Array<BlockProps>;
};

function ProjectBlocks({ projectId, blocks }: Props) {
  const { removeBlockIdFromProject } = useProjectsContext();

  return (
    <Droppable droppableId={`project-blocks`}>
      {(provided, snapshot) => (
        <DropContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver} // custom prop for styling
        >
          {blocks.map((block, index) => (
            <Draggable
              key={block.id}
              draggableId={`${projectId}-${block.id}`}
              index={index}
            >
              {(provided, snapshot) => (
                <DragContainer
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Block
                    id={block.id}
                    meta={block.meta}
                    type="plainText"
                    body={block.body}
                    removeBlock={(blockId) =>
                      removeBlockIdFromProject(projectId, blockId)
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
  );
}

export default ProjectBlocks;
