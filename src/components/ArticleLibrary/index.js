// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';
// types
import type { ArticleProps } from 'contexts/articles';

// --- styled components
const Container = styled.div`
  /* */
`;

const RemoveButton = styled(BlockButton)`
  /* */
`;

/* -------------------------------------------------------------------------- */
/* TODO: DRY repeated code below (copied from components/BlockLibrary) */
/* -------------------------------------------------------------------------- */
const Article = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border: 1px solid #ccbee4;
  border-radius: 3px;
  background-color: white;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 1.75rem;
  background-color: #ccbee4;
`;

const Text = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  user-select: none;
  cursor: move;
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const Title = Paragraph.extend`
  font-weight: bold;
  color: #360a80;
`;
/* -------------------------------------------------------------------------- */
/* TODO: DRY repeated code above (copied from components/BlockLibrary) */
/* -------------------------------------------------------------------------- */

// --- components
type Props = {
  // context props
  articles: Array<ArticleProps>,
  removeArticle: (string) => void,
};

const ArticleLibrary = (props: Props) => (
  <Container {...props}>
    {props.articles.map((article) => (
      <Article key={article.id}>
        <Handle>
          <RemoveButton
            text="–"
            href=""
            title="Remove Article"
            onClick={(ev) => {
              ev.preventDefault();
              props.removeArticle(article.id);
            }}
          />
        </Handle>
        <Text>
          <Title>{article.title === '' ? '\u00A0' : article.title}</Title>
        </Text>
      </Article>
    ))}
  </Container>
);

export default ArticleLibrary;
