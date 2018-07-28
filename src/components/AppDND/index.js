// @flow

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// components
import App from 'components/App';
// types
import type { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';

// --- components
type Props = {};
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

    // dropped outside of list
    if (!destination) return;

    // reordered blocks inside project
    if (source.droppableId === destination.droppableId) {
      // moved block back to original position
      if (source.index === destination.index) return;

      console.log('--- reordered blocks inside project ---');
      console.log('from index', source.index);
      console.log('to index', destination.index);
    }

    // moved block from block library into project
    if (source.droppableId !== destination.droppableId) {
      console.log('--- block added to project from block library ---');
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
        <App />
      </DragDropContext>
    );
  }
}

export default AppDND;
