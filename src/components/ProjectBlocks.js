// @flow

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled/macro';
// components
import Block from 'components/Block';
// contexts
import { ProjectsContext } from 'contexts/projects';
// types
import type { BlockProps } from 'contexts/blocks';

const DropContainer = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#9b88c1' : 'transparent'};
  transition: background-color 0.2s ease;
`;

const DragContainer = styled.div``;

type Props = {
  projectId: string,
  blocks: Array<BlockProps>,
};
type State = {};

class ProjectBlocks extends React.Component<Props, State> {
  static contextType = ProjectsContext;

  render() {
    const { removeBlockIdFromProject } = this.context;
    const { blocks, projectId } = this.props;

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
}

export default ProjectBlocks;
