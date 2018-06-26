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
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 1.375rem;
  color: #fff;
`;

const Main = styled.main`
  display: flex;
  border: 1px solid #ccbee4;
  border-top: none;
`;

const Panel = styled.section`
  padding: 1rem;
`;

const SubHeading = styled.h2`
  margin: 0;
  border-bottom: 1px solid #ccbee4;
  font-size: 1.125rem;
  color: #360a80;
`;

const LeftPanel = Panel.extend`
  flex-grow: 1;
  border-right: 1px solid #ccbee4;
  background-color: #edeaf3;
`;

const RightPanel = Panel.extend`
  flex-basis: 20rem;
  background-color: #e2ddef;
`;

// --- components
type Props = {};

const App = (props: Props) => (
  <Container {...props}>
    <Header>
      <Heading>Polyhedron</Heading>
    </Header>

    <Main>
      <LeftPanel>
        <SubHeading>Story Editor</SubHeading>
        <StoryEditor />
      </LeftPanel>

      <RightPanel>
        <SubHeading>Block Library</SubHeading>
        <ContentLibrary />
      </RightPanel>
    </Main>
  </Container>
);

export default App;
