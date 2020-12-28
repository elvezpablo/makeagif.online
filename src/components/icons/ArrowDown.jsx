import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  color: white;
  :hover {
    color: grey;
    cursor: pointer;
  }
  :active {
    color: red;
  }
`;

const Gif = () => {
  return (
    <Icon
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
    >
      <path d="M7.5 13.5l4-4m-4 4l-4-4m4 4V1" stroke="currentColor"></path>
    </Icon>
  );
};

export default Gif;
