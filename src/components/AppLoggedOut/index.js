// @flow

import React from 'react';
// components
import ThreeIcosahedron from 'components/ThreeIcosahedron';
// styled components
import {
  Container,
  Header,
  Heading,
  UserButton,
  Main,
} from 'components/AppUserInterface';

// --- components
type Props = {};

const AppLoggedOut = ({ ...props }: Props) => (
  <Container {...props}>
    <Header>
      <Heading>Polyhedron</Heading>
      <UserButton />
    </Header>

    <Main>
      <ThreeIcosahedron />
    </Main>
  </Container>
);

export default AppLoggedOut;
