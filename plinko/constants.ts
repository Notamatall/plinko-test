import { Frequency, PlinkoRiskType, PlinkoRows } from '@/types/games/plinko';

export const MULTIPLIERS_FREQUENCIES = {
  [PlinkoRows.EIGHT]: [
    Frequency.NEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.NEVER,
  ],
  [PlinkoRows.NINE]: [
    Frequency.NEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.NEVER,
  ],
  [PlinkoRows.TEN]: [
    Frequency.NEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.OFTEN,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.OFTEN,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.NEVER,
  ],
  [PlinkoRows.ELEVEN]: [
    Frequency.NEVER,
    Frequency.HARDLYEVER,
    Frequency.SELDOM,
    Frequency.SOMETIMES,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.SOMETIMES,
    Frequency.SELDOM,
    Frequency.HARDLYEVER,
    Frequency.NEVER,
  ],
  [PlinkoRows.TWELVE]: [
    Frequency.NEVER,
    Frequency.HARDLYEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.SOMETIMES,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.SOMETIMES,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.HARDLYEVER,
    Frequency.NEVER,
  ],
  [PlinkoRows.THIRTEEN]: [
    Frequency.NEVER,
    Frequency.HARDLYEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.SOMETIMES,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.SOMETIMES,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.HARDLYEVER,
    Frequency.NEVER,
  ],
  [PlinkoRows.FOURTEEN]: [
    Frequency.NEVER,
    Frequency.HARDLYEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.SOMETIMES,
    Frequency.SOMETIMES,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.SOMETIMES,
    Frequency.SOMETIMES,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.HARDLYEVER,
    Frequency.NEVER,
  ],
  [PlinkoRows.FIFTEEN]: [
    Frequency.NEVER,
    Frequency.HARDLYEVER,
    Frequency.SELDOM,
    Frequency.OCCASIONALLY,
    Frequency.SOMETIMES,
    Frequency.SOMETIMES,
    Frequency.OFTEN,
    Frequency.USUALLY,
    Frequency.USUALLY,
    Frequency.OFTEN,
    Frequency.SOMETIMES,
    Frequency.SOMETIMES,
    Frequency.OCCASIONALLY,
    Frequency.SELDOM,
    Frequency.HARDLYEVER,
    Frequency.NEVER,
  ],
  [PlinkoRows.SIXTEEN]: [
    Frequency.NEVER,
    Frequency.HARDLYEVER,
    Frequency.SELDOM,
    Frequency.RARELY,
    Frequency.OCCASIONALLY,
    Frequency.SOMETIMES,
    Frequency.OFTEN,
    Frequency.FREQUENTLY,
    Frequency.USUALLY,
    Frequency.FREQUENTLY,
    Frequency.OFTEN,
    Frequency.SOMETIMES,
    Frequency.OCCASIONALLY,
    Frequency.RARELY,
    Frequency.SELDOM,
    Frequency.HARDLYEVER,
    Frequency.NEVER,
  ],
};

export const MULTIPLIERS = {
  [PlinkoRows.EIGHT]: {
    [PlinkoRiskType.LOW]: [5.4, 2, 1.2, 0.9, 0.5, 0.9, 1.2, 2, 5.4],
    [PlinkoRiskType.MEDIUM]: [12.9, 2.9, 1.4, 0.6, 0.4, 0.6, 1.4, 2.9, 12.9],
    [PlinkoRiskType.HIGH]: [29.5, 3.8, 1.4, 0.3, 0.2, 0.3, 1.4, 3.8, 29.5],
    [PlinkoRiskType.EXTREME]: [59, 4.1, 0.4, 0.2, 0.1, 0.2, 0.4, 4.1, 59],
  },
  [PlinkoRows.NINE]: {
    [PlinkoRiskType.LOW]: [5.5, 2, 1.5, 1.1, 0.6, 0.6, 1.1, 1.5, 2, 5.5],
    [PlinkoRiskType.MEDIUM]: [
      19.7, 3.8, 1.7, 0.8, 0.5, 0.5, 0.8, 1.7, 3.8, 19.7,
    ],
    [PlinkoRiskType.HIGH]: [42, 7.1, 2, 0.5, 0.2, 0.2, 0.5, 2, 7.1, 42],
    [PlinkoRiskType.EXTREME]: [84, 4.9, 1.3, 0.4, 0.2, 0.2, 0.4, 1.3, 4.9, 84],
  },
  [PlinkoRows.TEN]: {
    [PlinkoRiskType.LOW]: [9, 2.7, 1.4, 1.1, 1, 0.4, 1, 1.1, 1.4, 2.7, 9],
    [PlinkoRiskType.MEDIUM]: [
      22, 4.9, 1.9, 1.3, 0.6, 0.4, 0.6, 1.3, 1.9, 4.9, 22,
    ],
    [PlinkoRiskType.HIGH]: [75, 10, 2.9, 0.8, 0.3, 0.2, 0.3, 0.8, 2.9, 10, 75],
    [PlinkoRiskType.EXTREME]: [
      150, 16, 1.2, 0.4, 0.2, 0.1, 0.2, 0.4, 1.2, 16, 150,
    ],
  },
  [PlinkoRows.ELEVEN]: {
    [PlinkoRiskType.LOW]: [9, 2.8, 1.9, 1.4, 1, 0.6, 0.6, 1, 1.4, 1.9, 2.8, 9],
    [PlinkoRiskType.MEDIUM]: [25, 6, 3, 1.8, 0.6, 0.5, 0.5, 0.6, 1.8, 3, 6, 25],
    [PlinkoRiskType.HIGH]: [
      125, 13.2, 5.2, 1.4, 0.3, 0.2, 0.2, 0.3, 1.4, 5.2, 13.2, 125,
    ],
    [PlinkoRiskType.EXTREME]: [
      250, 18, 3.8, 1, 0.2, 0.1, 0.1, 0.2, 1, 3.8, 18, 250,
    ],
  },
  [PlinkoRows.TWELVE]: {
    [PlinkoRiskType.LOW]: [9, 3, 1.5, 1.4, 1.1, 1, 0.4, 1, 1.1, 1.4, 1.5, 3, 9],
    [PlinkoRiskType.MEDIUM]: [
      34, 13, 4, 1.8, 1.2, 0.5, 0.3, 0.5, 1.2, 1.8, 4, 13, 34,
    ],
    [PlinkoRiskType.HIGH]: [
      165, 25, 8, 2.1, 0.6, 0.2, 0.2, 0.2, 0.6, 2.1, 8, 25, 165,
    ],
    [PlinkoRiskType.EXTREME]: [
      330, 56, 6.2, 1.2, 0.3, 0.1, 0.1, 0.1, 0.3, 1.2, 6.2, 56, 330,
    ],
  },
  [PlinkoRows.THIRTEEN]: {
    [PlinkoRiskType.LOW]: [
      9, 3.7, 2.8, 1.8, 1.1, 0.9, 0.7, 0.7, 0.9, 1.1, 1.8, 2.8, 3.7, 9,
    ],
    [PlinkoRiskType.MEDIUM]: [
      45, 12.5, 5.7, 2.9, 1.4, 0.6, 0.4, 0.4, 0.6, 1.4, 2.9, 5.7, 12.5, 45,
    ],
    [PlinkoRiskType.HIGH]: [
      280, 36, 11.2, 3.9, 0.9, 0.2, 0.2, 0.2, 0.2, 0.9, 3.9, 11.2, 36, 280,
    ],
    [PlinkoRiskType.EXTREME]: [
      560, 72, 6.2, 3.5, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 3.5, 6.2, 72, 560,
    ],
  },
  [PlinkoRows.FOURTEEN]: {
    [PlinkoRiskType.LOW]: [
      7, 4.1, 1.7, 1.4, 1.2, 1.1, 0.9, 0.6, 0.9, 1.1, 1.2, 1.4, 1.7, 4.1, 7,
    ],
    [PlinkoRiskType.MEDIUM]: [
      59, 14, 7.3, 4.2, 1.8, 0.8, 0.5, 0.3, 0.5, 0.8, 1.8, 4.2, 7.3, 14, 59,
    ],
    [PlinkoRiskType.HIGH]: [
      425, 63, 16, 5.1, 1.7, 0.3, 0.2, 0.2, 0.2, 0.3, 1.7, 5.1, 16, 63, 425,
    ],
    [PlinkoRiskType.EXTREME]: [
      850, 126, 8, 4, 1.2, 0.3, 0.2, 0.2, 0.2, 0.3, 1.2, 4, 8, 126, 850,
    ],
  },
  [PlinkoRows.FIFTEEN]: {
    [PlinkoRiskType.LOW]: [
      16, 8.7, 3.2, 2.3, 1.4, 1.1, 0.9, 0.7, 0.7, 0.9, 1.1, 1.4, 2.3, 3.2, 8.7,
      16,
    ],
    [PlinkoRiskType.MEDIUM]: [
      85, 16, 12, 5.6, 2.6, 1.4, 0.4, 0.3, 0.3, 0.4, 1.4, 2.6, 5.6, 12, 16, 85,
    ],
    [PlinkoRiskType.HIGH]: [
      585, 81, 27, 9, 3, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 3, 9, 27, 81, 585,
    ],
    [PlinkoRiskType.EXTREME]: [
      1170, 162, 26, 8, 2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 2, 8, 27, 162, 1170,
    ],
  },
  [PlinkoRows.SIXTEEN]: {
    [PlinkoRiskType.LOW]: [
      15, 9, 2.4, 1.6, 1.4, 1.2, 1.1, 0.9, 0.5, 0.9, 1.1, 1.2, 1.4, 1.6, 2.4, 9,
      15,
    ],
    [PlinkoRiskType.MEDIUM]: [
      111, 44, 8.1, 4.5, 3.1, 1.6, 1, 0.4, 0.3, 0.4, 1, 1.6, 3.1, 4.5, 8.1, 44,
      111,
    ],
    [PlinkoRiskType.HIGH]: [
      1000, 140, 25, 8, 4, 1.9, 0.2, 0.2, 0.2, 0.2, 0.2, 1.9, 4, 8, 25, 140,
      1000,
    ],
    [PlinkoRiskType.EXTREME]: [
      2000, 280, 11, 7, 5, 1.1, 0.2, 0.2, 0.1, 0.2, 0.2, 1.1, 5, 7, 11, 280,
      2000,
    ],
  },
};
