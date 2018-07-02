import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
// components
import ProjectLibrary from './index.js';

const ProjectLibraryContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ projects, removeProject }) => (
      <ProjectLibrary
        {...props}
        projects={projects}
        removeProject={removeProject}
      />
    )}
  </ProjectsContext.Consumer>
);

export default ProjectLibraryContainer;
