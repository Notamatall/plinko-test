import styled from 'styled-components';

export const InputWrapper = styled.div<{ inError: boolean }>`
  border: ${({ inError }) =>
    inError ? ' 1px solid var(--color-error)' : 'none'};
  background: #131620;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  & > input {
    font-family: 'Golos Text';
    min-width: 2ch;
    border: none;
    outline: none;
    color: #e9f4ff;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    background: transparent;
  }
`;
