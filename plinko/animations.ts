import eight from './animations/eight-rows-animation.json';
import nine from './animations/nine-rows-animation.json';
import ten from './animations/ten-rows-animation.json';
import eleven from './animations/eleven-rows-animation.json';
import twelve from './animations/twelve-rows-animation.json';
import thirteen from './animations/thirteen-rows-animation.json';
import fourteen from './animations/fourteen-rows-animation.json';
import fifteen from './animations/fifteen-rows-animation.json';
import sixteen from './animations/sixteen-rows-animation.json';
import { PlinkoRows, Position } from '@/types/games/plinko';

export type PlinkoMultiplierAnimations = {
  [key in number]: { x: number; y: number }[][];
};

export type PlinkoRowAnimations = {
  [key in string]: PlinkoMultiplierAnimations;
};

export type PlinkoCharacteristics = {
  [key in number]: PlinkoPositionCharacteristics;
};

export interface PlinkoPositionCharacteristics {
  startPosition: number;
  numberOfFrames?: number;
  multiplierIndex: number;
  rowsCount: PlinkoRows;
  frames?: Position[];
}

export const ANIMATIONS: PlinkoRowAnimations = {
  ...JSON.parse(eight),
  ...JSON.parse(nine),
  ...JSON.parse(ten),
  ...JSON.parse(eleven),
  ...JSON.parse(twelve),
  ...JSON.parse(thirteen),
  ...JSON.parse(fourteen),
  ...JSON.parse(fifteen),
  ...JSON.parse(sixteen),
};
