import {
  PlinkoCanvasSizes,
  PlinkoConfig,
  PlinkoRateLimit,
  PlinkoRiskType,
  PlinkoRows,
} from '@/types/games/plinko';

export const MIN_PINS_ON_ROW: number = 3;
export const DEFAULT_BET_VALUE: number = 1;
export const DEFAULT_PEG_GAP_PX: number = 50;
export const DEFAULT_MULTIPLIER_WIDTH_PX: number = 50;
export const DEFAULT_BALL_SIZE_PX: number = 20;
export const DEFAULT_RISK: PlinkoRiskType = PlinkoRiskType.LOW;
export const DEFAULT_ROWS_COUNT: PlinkoRows = PlinkoRows.EIGHT;
export const DEFAULT_ACTIVE_BALLS_COUNT: number = 0;
export const DEFAULT_MULTIPLIER_ANIMATIONS_QUEUE: number[] = [];
export const DEFAULT_RATE_LIMIT: PlinkoRateLimit = {
  manualMs: 200,
  autoMs: 300,
};
export const DEFAULT_CONFIG: PlinkoConfig = {
  ...DEFAULT_RATE_LIMIT,
  minBet: 1,
  maxBet: 999999,
};

export const CANVAS_SIZES: PlinkoCanvasSizes = {
  height: 1002,
  width: 1336,
};
export const DEFAULT_LOCAL_BALANCE: number = 0;
export function getSizes(rowsCount: number) {
  let distance =
    (CANVAS_SIZES.height - DEFAULT_PEG_GAP_PX - DEFAULT_BALL_SIZE_PX) /
    ((rowsCount - 1) * 8 + 2);
  return {
    spacing: 8 * distance,
    pegRadius: distance,
    ballRadius: (Math.sqrt(rowsCount) / 2) * distance,
  };
}
