// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
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

const LoggedOutHeader = styled(Header)`
  display: block;
`;

const LoginButton = styled(UserButton)`
  display: inline-block;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

function AppLoggedOut() {
  return (
    <Container>
      <LoggedOutHeader>
        <Heading>Polyhedron</Heading>
        <LoginButton />
      </LoggedOutHeader>

      <Main>
        <ThreeIcosahedron />
      </Main>
    </Container>
  );
}

export default AppLoggedOut;
