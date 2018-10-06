import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
// components
import ProjectBlocks from './index.js';

const ProjectBlocksContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ removeBlockIdFromProject }) => (
      <ProjectBlocks
        {...props}
        removeBlockIdFromProject={removeBlockIdFromProject}
      />
    )}
  </ProjectsContext.Consumer>
);

export default ProjectBlocksContainer;
