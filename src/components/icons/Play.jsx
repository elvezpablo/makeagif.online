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
`

const Play = () => {
  return (
    <Icon
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm6.249-2.432a.5.5 0 01.5-.002l3.5 2a.5.5 0 010 .868l-3.5 2A.5.5 0 016 9.5v-4a.5.5 0 01.249-.432z"
        fill="currentColor"
      ></path>
    </Icon>
  );
};

export default Play;
