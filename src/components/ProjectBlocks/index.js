// @flow

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// components
import Block from 'components/Block/container.js';
// types
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const DropContainer = styled.div`
  /* */
`;

const DragContainer = styled.div`
  /* */
`;

// --- components
type Props = {
  projectId: string,
  blocks: Array<BlockProps>,
  // context props
  removeBlockIdFromProject: (string, string) => void,
};

type State = {};

class ProjectBlocks extends React.Component<Props, State> {
  render() {
    const { blocks, projectId, removeBlockIdFromProject } = this.props;

    return (
      <Droppable droppableId={`project-blocks`}>
        {(provided, snapshot) => (
          <DropContainer
            innerRef={provided.innerRef}
            style={{ background: snapshot.isDraggingOver && '#9b88c1' }}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            {blocks.map((block, index) => (
              <Draggable
                key={block.id}
                draggableId={`${projectId}-${block.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <DragContainer
                    innerRef={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Block
                      id={block.id}
                      time={block.time}
                      title={block.title}
                      desc={block.desc}
                      body={block.body}
                      removeBlock={(blockId) =>
                        removeBlockIdFromProject(projectId, blockId)
                      }
                    />
                  </DragContainer>
                )}
              </Draggable>
            ))}
          </DropContainer>
        )}
      </Droppable>
    );
  }
}

export default ProjectBlocks;
