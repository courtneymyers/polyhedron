import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';
// components
import ProjectEditor from './index.js';

const ProjectEditorContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ projects, activeProjectId }) => (
      <BlocksContext.Consumer>
        {({ blocks, addBlock, removeBlock }) => (
          <ProjectEditor
            {...props}
            projects={projects}
            activeProjectId={activeProjectId}
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
