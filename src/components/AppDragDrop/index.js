// @flow

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// components
import AppUserInterface from 'components/AppUserInterface';
// types
import type { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
import type { ProjectProps } from 'contexts/projects';

// --- components
type Props = {
  // context props
  projects: Array<ProjectProps>,
  activeProjectId: string,
  addBlockIdToProject: (string, string, ?number) => void,
  reorderBlocksInProject: (string, number, number) => void,
};

type State = {};

class AppDragDrop extends React.Component<Props, State> {
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
    if (source.droppableId !== destination.droppableId) {
      // INFO: draggableId === block.id
      addBlockIdToProject(activeProjectId, draggableId, destination.index);
    }
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <AppUserInterface />
      </DragDropContext>
    );
  }
}

export default AppDragDrop;
