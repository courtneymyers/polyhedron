import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
import { ProjectsContext } from 'contexts/projects';
// components
import BlockLibrary from './index.js';

const BlockLibraryContainer = (props) => (
  <BlocksContext.Consumer>
    {({ blocks, removeBlock }) => (
      <ProjectsContext.Consumer>
        {({ removeBlockIdFromAllProjects }) => (
          <BlockLibrary
            {...props}
            blocks={blocks}
            removeBlock={removeBlock}
            removeBlockIdFromAllProjects={removeBlockIdFromAllProjects}
          />
        )}
      </ProjectsContext.Consumer>
    )}
  </BlocksContext.Consumer>
);

export default BlockLibraryContainer;
