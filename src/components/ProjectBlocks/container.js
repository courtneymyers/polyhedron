import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
// components
import BlockLibrary from './index.js';

const BlockLibraryContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ removeBlockIdFromProject }) => (
      <BlockLibrary
        {...props}
        removeBlockIdFromProject={removeBlockIdFromProject}
      />
    )}
  </ProjectsContext.Consumer>
);

export default BlockLibraryContainer;
