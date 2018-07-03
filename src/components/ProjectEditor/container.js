import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';
// components
import ProjectEditor from './index.js';

/* prettier-ignore */
const ProjectEditorContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ projects, activeProjectId, updateProjectFieldText, addBlockIdToProject }) => (
      <BlocksContext.Consumer>
        {({ blocks, addBlock, removeBlock }) => (
          <ProjectEditor
            {...props}
            projects={projects}
            activeProjectId={activeProjectId}
            addBlockIdToProject={addBlockIdToProject}
            updateProjectFieldText={updateProjectFieldText}
            blocks={blocks}
            addBlock={addBlock}
            removeBlock={removeBlock}
          />
        )}
      </BlocksContext.Consumer>
    )}
  </ProjectsContext.Consumer>
);

export default ProjectEditorContainer;
