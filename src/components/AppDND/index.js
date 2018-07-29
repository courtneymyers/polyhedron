// @flow

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// components
import AppUI from 'components/AppUI';
// types
import type { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
import type { ProjectProps } from 'contexts/projects';

// --- components
type Props = {
  // context props
  projects: Array<ProjectProps>,
  activeProjectId: string,
  addBlockIdToProject: (string, string) => void,
  reorderBlocksInProject: (string, number, number) => void,
};

type State = {};

class AppDND extends React.Component<Props, State> {
  onDragStart = (start: DragStart) => {
    // console.log(start);
  };

  onDragUpdate = (update: DragUpdate) => {
    // console.log(update);
  };

  onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    const {
      activeProjectId,
      reorderBlocksInProject,
      addBlockIdToProject,
    } = this.props;

    // dropped block outside of project editor
    if (!destination) return;

    // reordered block inside project editor
    if (source.droppableId === destination.droppableId) {
      // moved block back to original position
      if (source.index === destination.index) return;

      reorderBlocksInProject(activeProjectId, source.index, destination.index);
    }

    // moved block from block library into project editor
    // INFO: (draggableId === block.id)
    if (source.droppableId !== destination.droppableId) {
      // TODO:
      // addBlockIdToProject(activeProjectId, draggableId);

      console.log('new block id', draggableId);
      console.log('to index', destination.index);
    }
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <AppUI />
      </DragDropContext>
    );
  }
}

export default AppDND;
