import styled from 'styled-components';

export const Button = styled.button<{ active?: boolean; height: number }>`
  cursor: pointer;
  background: #1d2234;
  border-radius: 4px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 32px;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  color: #e9f4ff80;
  border: none;
  height: ${({ height }) => `${height}px`};
  ${({ active }) =>
    active
      ? `
          background: #7e8eb880;
          border: 1px solid #131620;
          box-shadow: 0px 0px 0px 1px #464F6A;
        `
      : ''}

  &:hover {
    background: #7e8eb840;
  }

  &:active {
    background: #7e8eb880;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.8;
  }
`;

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

  ${Button} {
    padding: 0 5px;
    font-size: 12px;
  }

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

  &:disabled {
    ${Button} {
      pointer-events: none;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Golos Text';
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  & button {
    &:disabled {
      color: rgb(73, 76, 104);
      cursor: not-allowed;
      opacity: 1;
    }
  }
  & input {
    &:disabled {
      color: rgb(73, 76, 104);
      cursor: not-allowed;
      opacity: 1;
    }
  }
`;
