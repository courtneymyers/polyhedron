// @flow

import React from 'react';
import styled, { injectGlobal } from 'styled-components';
// components
import StoryEditor from 'components/StoryEditor';
import ContentLibrary from 'components/ContentLibrary';

// --- global stylesheet
injectGlobal`
  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 1;
    color: #444;
    background-color: #fff;
  }
`;

// --- styled components
const Container = styled.div`
  margin: 0 auto;
  max-width: 80rem;
`;

const Header = styled.header`
  padding: 1rem;
  background-color: #360a80;

  h1 {
    margin: 0;
    font-size: 1.375rem;
    color: #fff;
  }
`;

const Main = styled.main`
  display: flex;
  border: 1px solid #eee;
`;

const Panel = styled.section`
  padding: 0.5rem;

  h2 {
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
`;

const LeftPanel = Panel.extend`
  flex-grow: 1;
`;

const RightPanel = Panel.extend`
  flex-basis: 20rem;
  background-color: #eee;
`;

// --- components
type Props = {};

const App = (props: Props) => (
  <Container {...props}>
    <Header>
      <h1>Polyhedron</h1>
    </Header>

    <Main>
      <LeftPanel>
        <h2>Story Editor</h2>
        <StoryEditor />
      </LeftPanel>

      <RightPanel>
        <h2>Content Library</h2>
        <ContentLibrary />
      </RightPanel>
    </Main>
  </Container>
);

export default App;
