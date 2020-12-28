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

const Unlinked = () => {
  return (
    <Icon
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
    >
      <path
        d="M4.5 6.5L1.328 9.672a2.828 2.828 0 104 4L8.5 10.5m2-2l3.172-3.172a2.829 2.829 0 00-4-4L6.5 4.5m-2 6l6-6"
        stroke="currentColor"
      ></path>
    </Icon>
  );
};

export default Unlinked;
