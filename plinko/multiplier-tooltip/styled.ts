import { Frequency } from '@/types/games/plinko';
import styled from 'styled-components';
import { getFrequecnyStyles } from '../styled';

export const PlinkoMultiplier = styled.div<{
  frequency: Frequency;
  isAnimationActive: boolean;
  withAdaptivness: boolean;
}>`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: center;
  place-items: center;
  height: 2.2rem;
  border-radius: 0.375rem;
  font-size: 12px;
  font-weight: 700;
  & span {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    color: var(--Blackjack, #0e1113);
    font-family: Rubik;
  }

  color: black;
  ${({ frequency }) => getFrequecnyStyles(frequency)}
  ${({ isAnimationActive, frequency }) =>
    isAnimationActive
      ? `
          animation: reached_${frequency} 0.2s;
          animation-iteration-count: 1;
        `
      : null}
  ${({ frequency }) => {
    const animationShadow =
      frequency === Frequency.NEVER
        ? 'box-shadow: -1px -4px 12px 0px rgba(187, 51, 51, 0.70);'
        : frequency === Frequency.HARDLYEVER
          ? 'box-shadow: -1px -4px 12px 0px rgba(209, 105, 86, 0.70);'
          : frequency === Frequency.SELDOM
            ? 'box-shadow: -1px -4px 12px 0px rgba(184, 103, 67, 0.70);'
            : frequency === Frequency.RARELY
              ? 'box-shadow: -1px -4px 12px 0px rgba(193, 134, 71, 0.70);'
              : frequency === Frequency.OCCASIONALLY
                ? 'box-shadow: -1px -4px 12px 0px rgba(226, 144, 75, 0.70);'
                : frequency === Frequency.SOMETIMES
                  ? 'box-shadow: -1px -4px 12px 0px rgba(218, 173, 88, 0.70);'
                  : frequency === Frequency.OFTEN
                    ? 'box-shadow: -1px -4px 12px 0px rgba(215, 194, 69, 0.70);'
                    : frequency === Frequency.FREQUENTLY
                      ? 'box-shadow: -1px -4px 12px 0px rgba(232, 196, 122, 0.70);'
                      : frequency === Frequency.USUALLY
                        ? 'box-shadow: -1px -4px 12px 0px rgba(255, 217, 159, 0.70);'
                        : null;

    return `  
    @keyframes reached_${frequency} {
  50% {
      transform: translateY(7px);
      ${animationShadow}
      }
  }
  100% {
    transform: translateY(0px);
  }`;
  }};
  ${({ withAdaptivness }) => {
    return withAdaptivness
      ? `
  @media (max-width: 1200px) {
    font-size: 10px;
    height: 2rem;
    & span:nth-child(2) {
      font-size: 10px;
    }
  }

  @media (max-width: 1024px) {
    font-size: 9px;
    height: 1.8rem;
    & span:nth-child(2) {
      font-size: 7px;
    }
  }

  @media (max-width: 800px) {
    font-size: 8px;
    height: 1.5rem;
    & span:nth-child(2) {
      font-size: 6px;
    }
      
    
  @media (max-width: 550px) {
    font-size: 6px;
    height: 1.3rem;
    & span:nth-child(2) {
      font-size: 4px;
    }
  }`
      : '';
  }}
`;
