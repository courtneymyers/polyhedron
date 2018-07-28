import React from 'react';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';
// components
import AppDND from './index.js';

const AppDNDContainer = (props) => (
  <ProjectsContext.Consumer>
    {({ projects }) => (
      <BlocksContext.Consumer>
        {({ blocks }) => (
          <AppDND {...props} projects={projects} blocks={blocks} />
        )}
      </BlocksContext.Consumer>
    )}
  </ProjectsContext.Consumer>
);

export default AppDNDContainer;
