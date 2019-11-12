import React from 'react';
import styled from '@emotion/styled/macro';

const ButtonLink = styled.a`
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: #360a80;
  text-align: center;
  text-decoration: none;
  user-select: none;

  :hover,
  :focus {
    background-color: #360ccc;
  }
`;

type Props = {
  text: string;
  // anchor props
  href: string;
  title: string;
  onClick(event: React.MouseEvent<HTMLAnchorElement>): void;
};

function BlockButton({ text, ...props }: Props) {
  return <ButtonLink {...props}>{text}</ButtonLink>;
}

export default BlockButton;
