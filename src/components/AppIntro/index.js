// @flow

import React from 'react';
import styled from 'styled-components';
// components
import UserLoginButton from 'components/UserLoginButton/container.js';

// --- styled components
const buttonHeight = 1.5;
const headerPadding = 1;
const headerHeight = buttonHeight + 2 * headerPadding;

const Container = styled.div`
  margin: 0 auto;
  max-width: 80rem;
`;

const Header = styled.header`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${headerHeight}rem;
  display: flex;
  align-items: center;
  padding: ${headerPadding}rem;
  background-color: #360a80;
`;

const UserButton = styled(UserLoginButton)`
  margin-left: 1rem;
  padding: 0 0.625rem;
  width: auto;
  height: ${buttonHeight}rem;
  font-size: 0.8125rem;
  line-height: ${buttonHeight}rem;
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
  margin-top: ${headerHeight}rem;
  border: 1px solid #ccbee4;
  border-top: none;
`;

// --- components
type Props = {};

const AppIntro = (props: Props) => (
  <Container {...props}>
    <Header>
      <Heading>Polyhedron</Heading>
      <UserButton />
    </Header>

    <Main>
      <p>[About Polyhedron]</p>
    </Main>
  </Container>
);

export default AppIntro;
