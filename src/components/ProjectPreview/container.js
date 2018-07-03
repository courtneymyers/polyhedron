import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';
// components
import ProjectPreview from './index.js';

const ProjectPreviewContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ projects, activeProjectId }) => (
      <BlocksContext.Consumer>
        {({ blocks }) => (
          <ProjectPreview
            {...props}
            projects={projects}
            activeProjectId={activeProjectId}
            blocks={blocks}
          />
        )}
      </BlocksContext.Consumer>
    )}
  </ProjectsContext.Consumer>
);

export default ProjectPreviewContainer;
