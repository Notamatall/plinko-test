import { Position } from '@/types/games/plinko';
import { CANVAS_SIZES } from './config';
let ballId = 0;
export default class Ball {
  constructor(
    x: number,
    y: number,
    radius: number,
    onEnd: () => void,
    endPointIndex: number,
    image: HTMLImageElement,
    animation: Position[]
  ) {
    this._id = ++ballId;
    this._x = x;
    this._y = y;
    this._radius = radius;

    this.onEnd = onEnd;
    this.endPointIndex = endPointIndex;
    this.ballImg = image;
    this.animation = animation;
  }

  animationIteration = 0;
  animation: Position[];
  onEnd: () => void;
  endPointIndex: number;

  private _id: number;
  private _y: number;
  private _x: number;
  private _radius: number;
  private ballImg: HTMLImageElement;

  get isLastAnimationFrame() {
    return this.animationIteration === this.animation.length - 1;
  }

  update(e: CanvasRenderingContext2D) {
    const position = this.animation[this.animationIteration];
    this.updatePosition(position);
    this.animationIteration++;
    e.drawImage(
      this.ballImg,
      position.x - this._radius,
      position.y - this._radius,
      2 * this._radius,
      2 * this._radius
    );
  }

  private updatePosition(position: Position) {
    this._x = position.x;
    this._y = position.y;
  }

  isOffScreen() {
    return (
      this._x < 0 ||
      this._x > CANVAS_SIZES.width ||
      this._y > CANVAS_SIZES.height
    );
  }

  isWithinXBounds() {
    return this._x > 0 && this._x < CANVAS_SIZES.width;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get id() {
    return this._id;
  }

  get radius() {
    return this._radius;
  }
}
