import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
// components
import AppDND from './index.js';

const AppDNDContainer = (props) => (
  <ProjectsContext.Consumer>
    {({
      projects,
      activeProjectId,
      addBlockIdToProject,
      reorderBlocksInProject,
    }) => (
      <AppDND
        {...props}
        projects={projects}
        activeProjectId={activeProjectId}
        addBlockIdToProject={addBlockIdToProject}
        reorderBlocksInProject={reorderBlocksInProject}
      />
    )}
  </ProjectsContext.Consumer>
);

export default AppDNDContainer;
