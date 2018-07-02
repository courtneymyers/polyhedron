import React from 'react';
// contexts
import { ArticlesContext } from 'contexts/articles';
// components
import ProjectLibrary from './index.js';

const ProjectLibraryContainer = (props) => (
  <ArticlesContext.Consumer>
    {({ articles, removeArticle }) => (
      <ProjectLibrary
        {...props}
        articles={articles}
        removeArticle={removeArticle}
      />
    )}
  </ArticlesContext.Consumer>
);

export default ProjectLibraryContainer;
