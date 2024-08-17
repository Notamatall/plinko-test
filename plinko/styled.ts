import { Frequency } from '@/types/games/plinko';
import styled, { css } from 'styled-components';

export const PlinkoResultMultiplier = styled.button<{ frequency: Frequency }>`
  border: 0;
  border-radius: 0.375rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6875rem;
  width: 2.125rem;
  font-size: 0.75rem;
  position: relative;
  color: #000;
  ${({ frequency }) => getFrequecnyStyles(frequency)}
`;

const neverStyles = css`
  background: linear-gradient(
    109deg,
    #a10303 4.59%,
    #d25f5f 50.21%,
    #a10303 95.83%
  );
`;

const hardlyEverStyles = css`
  background: linear-gradient(
    105deg,
    #842019 11.67%,
    #ed836c 53.85%,
    #842019 103.7%
  );
`;

const seldomStyles = css`
  background: linear-gradient(
    105deg,
    #842c19 11.67%,
    #eda26c 53.85%,
    #842c19 103.7%
  );
`;

const rarelyStyles = css`
  background: linear-gradient(
    105deg,
    #8e531d 11.67%,
    #edb26c 53.85%,
    #8e531d 103.7%
  );
`;

const occasionallyStyles = css`
  background: linear-gradient(
    105deg,
    #b56608 11.67%,
    #ffce95 53.85%,
    #b56608 103.7%
  );
`;

const sometimesStyles = css`
  background: linear-gradient(
    105deg,
    #efab28 5.4%,
    #ffe1c2 43.56%,
    #efab28 97.48%
  );
`;

const oftenStyles = css`
  background: linear-gradient(
    105deg,
    #efc326 11.67%,
    #fff7e5 53.85%,
    #efc326 103.7%
  );
`;

const frequentlyStyles = css`
  background: linear-gradient(
    106deg,
    #daa242 -13.96%,
    #fffedb 47.23%,
    #daa242 101.54%
  );
`;

const usuallyStyles = css`
  background: linear-gradient(
    21deg,
    #ffe9af -7.99%,
    #ffebd0 46.78%,
    #ffe9af 101.55%
  );
`;

export const getFrequecnyStyles = (frequency: Frequency) => {
  switch (frequency) {
    case Frequency.NEVER:
      return neverStyles;
    case Frequency.HARDLYEVER:
      return hardlyEverStyles;
    case Frequency.SELDOM:
      return seldomStyles;
    case Frequency.RARELY:
      return rarelyStyles;
    case Frequency.OCCASIONALLY:
      return occasionallyStyles;
    case Frequency.SOMETIMES:
      return sometimesStyles;
    case Frequency.OFTEN:
      return oftenStyles;
    case Frequency.FREQUENTLY:
      return frequentlyStyles;
    case Frequency.USUALLY:
      return usuallyStyles;
  }
};
