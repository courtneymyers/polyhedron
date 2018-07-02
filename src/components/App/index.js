// @flow

import React from 'react';
import styled, { injectGlobal } from 'styled-components';
// components
import BlockButton from 'components/BlockButton';
import ArticleLibrary from 'components/ArticleLibrary/container.js';
import ProjectEditor from 'components/ProjectEditor/container.js';
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
  display: flex;
  padding: 1rem;
  background-color: #360a80;
`;

const ToggleButton = styled(BlockButton)`
  margin-right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  background-color: #60449a;

  :hover,
  :focus {
    background-color: #60449a;
  }
`;

const Heading = styled.h1`
  margin-top: 0.1875rem;
  margin-bottom: 0;
  font-size: 1.3125rem;
  font-weight: normal;
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

type State = {
  articleLibraryShown: boolean,
};

class App extends React.Component<Props, State> {
  toggleArticleLibrary: () => void;
  hideArticleLibrary: () => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      articleLibraryShown: false,
    };

    this.toggleArticleLibrary = () => {
      this.setState((prevState) => ({
        articleLibraryShown: !prevState.articleLibraryShown,
      }));
    };
  }

  render() {
    return (
      <Container {...this.props}>
        <Header>
          <ToggleButton
            text="☰"
            href=""
            title="Toggle Article Library"
            onClick={(ev) => {
              ev.preventDefault();
              this.toggleArticleLibrary();
            }}
          />
          <Heading>Polyhedron</Heading>
        </Header>

        <Main>
          {this.state.articleLibraryShown && (
            <LeftPanel>
              <SubHeading>Article Library</SubHeading>
              <ArticleLibrary />
            </LeftPanel>
          )}

          <MiddlePanel>
            <SubHeading>Project Editor</SubHeading>
            <ProjectEditor />
          </MiddlePanel>

          <RightPanel>
            <SubHeading>Block Library</SubHeading>
            <BlockLibrary />
          </RightPanel>
        </Main>
      </Container>
    );
  }
}

export default App;
