// @flow

import React from 'react';
import styled from 'styled-components';

// --- styled components
const Container = styled.div`
  background-color: white;
`;

// --- components
type Props = {};

const ProjectPreview = (props: Props) => (
  <Container>
    <p>(Project Preview)</p>
  </Container>
);

export default ProjectPreview;
