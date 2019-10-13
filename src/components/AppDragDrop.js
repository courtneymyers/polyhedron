// @flow

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
// components
import AppUserInterface from 'components/AppUserInterface';
// contexts
import { ProjectsContext } from 'contexts/projects';

type Props = {};

function AppDragDrop({ ...props }: Props) {
  const {
    activeProjectId,
    reorderBlocksInProject,
    addBlockIdToProject,
  } = React.useContext(ProjectsContext);

  function onDragStart(start: DragStart) {
    // console.log(start);
  }

  function onDragUpdate(update: DragUpdate) {
    // console.log(update);
  }

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

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
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <AppUserInterface />
    </DragDropContext>
  );
}

export default AppDragDrop;
