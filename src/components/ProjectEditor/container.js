import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';
// components
import ProjectEditor from './index.js';

const ProjectEditorContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ projects, addProject }) => (
      <BlocksContext.Consumer>
        {({ blocks, addBlock, removeBlock }) => (
          <ProjectEditor
            {...props}
            projects={projects}
            addProject={addProject}
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
