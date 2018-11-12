import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
// components
import AppDragDrop from './index.js';

const AppDragDropContainer = (props) => (
  <ProjectsContext.Consumer>
    {({
      projects,
      activeProjectId,
      addBlockIdToProject,
      reorderBlocksInProject,
    }) => (
      <AppDragDrop
        {...props}
        projects={projects}
        activeProjectId={activeProjectId}
        addBlockIdToProject={addBlockIdToProject}
        reorderBlocksInProject={reorderBlocksInProject}
      />
    )}
  </ProjectsContext.Consumer>
);

export default AppDragDropContainer;
