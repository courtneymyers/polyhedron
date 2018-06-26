// @flow

import React from 'react';
import styled from 'styled-components';
// components
import ContentBlock from 'components/ContentBlock';

// --- styled components
const Container = styled.div`
  /* */
`;

const AddButton = styled.a`
  display: block;
  margin: 0.5rem auto;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: bold;
  color: #fff;
  background-color: #360a80;
  text-align: center;
  text-decoration: none;

  :hover,
  :focus {
    background-color: #360ccc;
  }
`;

// --- components
type Props = {};

const StoryEditor = (props: Props) => (
  <Container {...props}>
    <ContentBlock />
    <AddButton
      href=""
      onClick={(ev) => {
        ev.preventDefault();
      }}
    >
      +
    </AddButton>
  </Container>
);

export default StoryEditor;
