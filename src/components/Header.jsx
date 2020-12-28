import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({theme}) => theme.colors.heading};
`;

const Header = () => {
    return     (<div>
      <Title>{`MakeAGif.online`}</Title>
      
    </div>);
}

export default Header;