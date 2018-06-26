// @flow

import React from 'react';
import styled, { injectGlobal } from 'styled-components';

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
  max-width: 60rem;
`;

// --- components
type Props = {};

const App = (props: Props) => (
  <Container>
    <h1>Polyhedron</h1>
  </Container>
);

export default App;
