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
    // dropped outside the list
    if (!result.destination) return;

    // TODO: pass new order to react contexts
    // reordered blocks inside project
    if (result.source.droppableId === result.destination.droppableId) {
      console.log('--- reordered blocks inside project ---');
      console.log('from index', result.source.index);
      console.log('to index', result.destination.index);
      // moved block from block library into project
    } else {
      console.log('--- block added to project from block library ---');
      console.log('new block id', result.draggableId);
      console.log('to index', result.destination.index);
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
