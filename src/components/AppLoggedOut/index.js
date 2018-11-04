// @flow

import React from 'react';
import styled from 'styled-components';
// components
import {
  Container,
  Header,
  Heading,
  UserButton,
  Main,
} from 'components/AppUserInterface';

// --- styled components
const Paragraph = styled.p`
  flex: 1;
  padding: 3rem 1.5rem;
  text-align: center;
`;

// --- components
type Props = {};

const AppLoggedOut = (props: Props) => (
  <Container {...props}>
    <Header>
      <Heading>Polyhedron</Heading>
      <UserButton />
    </Header>

    <Main>
      <Paragraph>About Polyhedron...</Paragraph>
    </Main>
  </Container>
);

export default AppLoggedOut;
