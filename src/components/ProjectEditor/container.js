import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';
// components
import ProjectEditor from './index.js';

const ProjectEditorContainer = (props) => (
  <ProjectsContext.Consumer>
    {({
      projects,
      activeProjectId,
      updateProjectFieldText,
      addBlockIdToProject,
    }) => (
      <BlocksContext.Consumer>
        {({ blocks, addBlock }) => (
          <ProjectEditor
            {...props}
            projects={projects}
            activeProjectId={activeProjectId}
            updateProjectFieldText={updateProjectFieldText}
            addBlockIdToProject={addBlockIdToProject}
            blocks={blocks}
            addBlock={addBlock}
          />
        )}
      </BlocksContext.Consumer>
    )}
  </ProjectsContext.Consumer>
);

export default ProjectEditorContainer;
