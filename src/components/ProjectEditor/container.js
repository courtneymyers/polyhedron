import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
// components
import ProjectEditor from './index.js';

const ProjectEditorContainer = (props) => (
  <BlocksContext.Consumer>
    {({ blocks, addBlock, removeBlock }) => (
      <ProjectEditor
        {...props}
        blocks={blocks}
        addBlock={addBlock}
        removeBlock={removeBlock}
      />
    )}
  </BlocksContext.Consumer>
);

export default ProjectEditorContainer;
