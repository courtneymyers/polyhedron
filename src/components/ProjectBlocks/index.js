// @flow

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// components
import Block from 'components/Block/container.js';
// types
import type { BlockProps } from 'contexts/blocks';

// --- components
type Props = {
  blocks: Array<BlockProps>,
  projectId: string,
  removeBlockIdFromProject: (string, string) => void,
};

type State = {};

class ProjectBlocks extends React.Component<Props, State> {
  render() {
    const { blocks, projectId, removeBlockIdFromProject } = this.props;

    return (
      <Droppable droppableId={`project-${projectId}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ background: snapshot.isDraggingOver && 'lightblue' }}
          >
            {blocks.map((block) => (
              <Draggable key={block.id} draggableId={block.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={provided.draggableProps.style}
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
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    );
  }
}

export default ProjectBlocks;
