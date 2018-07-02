// @flow

import React from 'react';
import styled from 'styled-components';
// components
import LibraryItem from 'components/LibraryItem';
// types
import type { ArticleProps } from 'contexts/articles';

// --- styled components
const Container = styled.div`
  /* */
`;

// --- components
type Props = {
  // context props
  articles: Array<ArticleProps>,
  removeArticle: (string) => void,
};

const ProjectLibrary = (props: Props) => (
  <Container {...props}>
    {props.articles.map((article) => (
      <LibraryItem
        key={article.id}
        id={article.id}
        label="Article"
        title={article.title}
        desc={article.desc}
        removeItem={props.removeArticle}
      />
    ))}
  </Container>
);

export default ProjectLibrary;
