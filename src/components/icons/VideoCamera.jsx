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
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M21.5 6.1C21.2 5.9 20.8 5.9 20.5 6.1L16.1 9.1V7C16.1 5.9 15.2 5 14.1 5H4C2.9 5 2 5.9 2 7V17C2 18.1 2.9 19 4 19H14C15.1 19 16 18.1 16 17V14.9L20.4 17.9C20.6 18 20.8 18.1 21 18.1C21.2 18.1 21.3 18.1 21.5 18C21.8 17.8 22 17.5 22 17.1V7C22 6.6 21.8 6.3 21.5 6.1ZM14 17H4V7H14V11V13V17ZM20 15.1L16 12.4V11.5L20 8.8V15.1Z"
        fill="#0D0D0D"
      ></path>
    </Icon>
  );
};

export default Gif;
