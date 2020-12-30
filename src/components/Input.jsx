import styled from 'styled-components';

const Input = styled.input`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: ${({ theme }) => theme.fontSizes[4]};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  outline: none;
  text-align: center;
  :hover {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderActive};
  }
  width: 60px;
`;


export default Input;