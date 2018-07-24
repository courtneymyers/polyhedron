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
    //
  };

  onDragUpdate = (update: DragUpdate) => {
    //
  };

  onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) return;

    // TODO: reset item order...
    // from index: result.source.index
    // to index: result.destination.index
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
