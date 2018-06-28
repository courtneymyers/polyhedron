import React from 'react';
// contexts
import { ArticlesContext } from 'contexts/articles';
// components
import ArticleLibrary from './index.js';

const ArticleLibraryContainer = (props) => (
  <ArticlesContext.Consumer>
    {({ articles, removeArticle }) => (
      <ArticleLibrary
        {...props}
        articles={articles}
        removeArticle={removeArticle}
      />
    )}
  </ArticlesContext.Consumer>
);

export default ArticleLibraryContainer;
