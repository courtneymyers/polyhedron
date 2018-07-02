import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
// components
import ProjectLibrary from './index.js';

const ProjectLibraryContainer = (props) => (
  <ProjectsContext.Consumer>
    {({
      projects,
      activeProjectId,
      addProject,
      removeProject,
      setActiveProjectId,
    }) => (
      <ProjectLibrary
        {...props}
        projects={projects}
        activeProjectId={activeProjectId}
        addProject={addProject}
        removeProject={removeProject}
        setActiveProjectId={setActiveProjectId}
      />
    )}
  </ProjectsContext.Consumer>
);

export default ProjectLibraryContainer;
