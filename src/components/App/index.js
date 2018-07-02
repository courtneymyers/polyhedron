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
  flex: 1;
  margin: 0.1875rem 0.75rem 0;
  font-size: 1.3125rem;
  font-weight: normal;
  text-align: center;
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
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccbee4;
  font-size: 1.125rem;
  color: #360a80;

  :first-of-type {
    margin-top: 0;
  }
`;

const LeftPanel = Panel.extend`
  flex-basis: 15rem;
  border-right: 1px solid #ccbee4;
  background-color: #e2ddef;
`;

const MiddlePanel = Panel.extend`
  flex-grow: 1;
  background-color: #edeaf3;
`;

const RightPanel = Panel.extend`
  flex-basis: 15rem;
  border-left: 1px solid #ccbee4;
  background-color: #e2ddef;
`;

// --- components
type Props = {};

type State = {
  leftPanelShown: boolean,
  rightPanelShown: boolean,
};

class App extends React.Component<Props, State> {
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      leftPanelShown: true,
      rightPanelShown: false,
    };

    this.toggleLeftPanel = () => {
      this.setState((prevState) => ({
        leftPanelShown: !prevState.leftPanelShown,
      }));
    };

    this.toggleRightPanel = () => {
      this.setState((prevState) => ({
        rightPanelShown: !prevState.rightPanelShown,
      }));
    };
  }

  render() {
    return (
      <Container {...this.props}>
        <Header>
          <ToggleButton
            text="☰"
            href="#library"
            title="Toggle Library"
            onClick={(ev) => {
              ev.preventDefault();
              this.toggleLeftPanel();
            }}
          />
          <Heading>Polyhedron</Heading>
          <ToggleButton
            text="☰"
            href="#preview"
            title="Toggle Preview"
            onClick={(ev) => {
              ev.preventDefault();
              this.toggleRightPanel();
            }}
          />
        </Header>

        <Main>
          {this.state.leftPanelShown && (
            <LeftPanel>
              <SubHeading>Project Library</SubHeading>
              <ArticleLibrary />

              <SubHeading>Block Library</SubHeading>
              <BlockLibrary />
            </LeftPanel>
          )}

          <MiddlePanel>
            <SubHeading>Project Editor</SubHeading>
            <ProjectEditor />
          </MiddlePanel>

          {this.state.rightPanelShown && (
            <RightPanel>
              <SubHeading>Project Preview</SubHeading>
            </RightPanel>
          )}
        </Main>
      </Container>
    );
  }
}

export default App;
