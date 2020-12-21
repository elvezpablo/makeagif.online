import React from 'react';
import styled from 'styled-components';
import Play from './icons/Play';

const Title = styled.h1``;

const Header = () => {
    return     (<div>
      <Title>{`MakeAGif.online (MaGo)`}</Title>
      <Play/>
    </div>);
}

export default Header;