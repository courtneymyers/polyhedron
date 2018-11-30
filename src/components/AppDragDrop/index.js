// @flow

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// components
import AppUserInterface from 'components/AppUserInterface';
// contexts
import { ProjectsContext } from 'contexts/projects';

// --- components
type Props = {};
type State = {};

class AppDragDrop extends React.Component<Props, State> {
  static contextType = ProjectsContext;

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
    } = this.context;

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
