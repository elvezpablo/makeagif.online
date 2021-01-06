import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  background-color: ${(props) =>
      props.isError ? `rgba(200, 0, 0, 0.1)` : `rgba(0, 0, 0, 0.2)`};
  border: 1px solid
    ${(props) =>
      props.isError ? `rgba(200, 0, 0, 0.4)` : `rgba(120, 120, 120, 0.3)`};
  border-radius: 2px;
  margin: 8px 0 0 0;
  padding: 8px 8px 8px 8px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.25);
`;

const Message = styled.div`
  margin-bottom: 8px;
  color: ${(props) => props.isError ? props.theme.colors.error : props.theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[0]};
`;

const Title = styled(Message)`
  font-size: ${({ theme }) => theme.fontSizes[2]};
`;

const Messaging = ({isError, title, message, children}) => {
    return (
      <Container isError={isError}>
        <Title isError={isError}>{title}</Title>
        <Message isError={isError}>{message}</Message>
        {children}
      </Container>
    );
}

export default Messaging;