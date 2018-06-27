// @flow

import React from 'react';
import styled, { injectGlobal } from 'styled-components';
// components
import ArticleLibrary from 'components/ArticleLibrary';
import ArticleEditor from 'components/ArticleEditor/container.js';
import BlockLibrary from 'components/BlockLibrary/container.js';

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
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccbee4;
  font-size: 1.125rem;
  color: #360a80;
`;

const LeftPanel = Panel.extend`
  flex-basis: 20rem;
  border-right: 1px solid #ccbee4;
  background-color: #e2ddef;
`;

const MiddlePanel = Panel.extend`
  flex-grow: 1;
  background-color: #edeaf3;
`;

const RightPanel = Panel.extend`
  flex-basis: 20rem;
  border-left: 1px solid #ccbee4;
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
      {/*
      <LeftPanel>
        <SubHeading>Article Library</SubHeading>
        <ArticleLibrary />
      </LeftPanel>
      */}

      <MiddlePanel>
        <SubHeading>Article Editor</SubHeading>
        <ArticleEditor />
      </MiddlePanel>

      <RightPanel>
        <SubHeading>Block Library</SubHeading>
        <BlockLibrary />
      </RightPanel>
    </Main>
  </Container>
);

export default App;
