import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.heading};
  text-shadow: -3px 3px 0 rgba(0,0,0,.7);
`;

const Header = () => {
    return     (<div>
      <Title>{`MakeAGif.online`}</Title>
      
    </div>);
}

export default Header;