import Peg from './peg';
import Ball from './ball';
import { PegBoundaries, PlinkoRows } from '@/types/games/plinko';
import { CANVAS_SIZES, DEFAULT_BALL_SIZE_PX, getSizes } from './config';

export default class PlinkoEngine {
  constructor(rowsCount: PlinkoRows) {
    this._rowsCount = rowsCount;
  }

  ballsArr: Ball[] = [];
  pegsArr: Peg[] = [];
  pegsBoundaries: PegBoundaries[] = [];

  private reportedBallsArr: number[] = [];
  private _rowsCount: PlinkoRows;

  get rowsCount() {
    return this._rowsCount;
  }

  launchEngine(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    renderFrameId: any
  ): void {
    const fixedDelta = 1000 / 90;
    let time = 0;
    let alpha = 0;
    let elapsed = 0;
    let accumulator = 0;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.showObjects(ctx);
      this.checkPegBallCollision();
    };

    const updateWithDelta = () => {
      if (
        ((renderFrameId.current = requestAnimationFrame(updateWithDelta)),
        (elapsed = Math.round(
          (alpha = (time = Date.now()) - accumulator) / fixedDelta
        )),
        alpha > fixedDelta)
      ) {
        if (elapsed > 60 && elapsed < 300)
          for (let t = 0; t < elapsed; t++) update();
        else update();
        accumulator = time - (alpha % fixedDelta);
      }
    };

    updateWithDelta();
  }

  private checkPegBallCollision() {
    let balls: Ball[] = [];
    let pegs: Peg[] = [];

    for (let ball of this.ballsArr) balls.push(ball);
    for (let peg of this.pegsArr) pegs.push(peg);

    const collidedPinsIds: number[] = [];
    balls.forEach((ball) => {
      pegs.forEach((peg) => {
        const dx = ball.x - peg.x;
        const dy = ball.y - peg.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius + peg.radius) {
          collidedPinsIds.push(peg.id);
        }
      });
    });
    collidedPinsIds.length && this.addCollision(collidedPinsIds);
  }

  addCollision(collidedPegsIds: number[]) {
    this.pegsArr.forEach((peg) => {
      collidedPegsIds.includes(peg.id) && peg.addCollision();
    });
  }

  setRowsCount(rowsCount: PlinkoRows) {
    this._rowsCount = rowsCount;
  }

  addPeg(e: Peg) {
    this.pegsArr.push(e);
  }

  addBall(e: Ball) {
    this.ballsArr.push(e);
  }

  clearPegs() {
    this.pegsArr = [];
  }

  clearBalls() {
    this.ballsArr = [];
  }

  filterBalls() {
    this.ballsArr = this.ballsArr.filter((ball) => {
      const isLastAnimationFrame = ball.isLastAnimationFrame;
      if (isLastAnimationFrame) {
        ball.onEnd();
        return false;
      }

      const isOffScreen = ball.isOffScreen();
      const isWithinXBounds = ball.isWithinXBounds();

      return !isOffScreen || (isWithinXBounds && ball.onEnd(), false);
    });
  }

  private getLastRowPegsBoundaries(): PegBoundaries[] {
    if (this.pegsBoundaries.length === this.rowsCount + 1)
      return this.pegsBoundaries;
    const pegsCount = this.rowsCount + 1;
    const pegsBoundaries: PegBoundaries[] = [];
    const { spacing, pegRadius } = getSizes(this.rowsCount);
    const startingPosition =
      (CANVAS_SIZES.width - pegsCount * spacing) / 2 + pegRadius;
    for (let index = 0; index < pegsCount; index++) {
      const left = startingPosition + index * spacing,
        right = left + spacing - 2 * pegRadius;
      pegsBoundaries.push(new PegBoundaries(left, right));
    }
    return pegsBoundaries;
  }

  private getMultiplierIndexByBallPosition(
    pegsBoundaries: PegBoundaries[],
    ballXPostion: number
  ) {
    for (let index = 0; index < pegsBoundaries.length; index++) {
      if (
        ballXPostion > pegsBoundaries[index].left &&
        ballXPostion < pegsBoundaries[index].right
      )
        return index;
    }
    return -1;
  }

  showObjects(ctx: CanvasRenderingContext2D) {
    this.filterBalls();
    this.pegsBoundaries = this.getLastRowPegsBoundaries();
    this.ballsArr.forEach((ball: Ball) => {
      ball.update(ctx);
      this.wrongPositionFallCheck(ball);
    });
    this.pegsArr.forEach((peg) => peg.show(ctx));
  }

  private wrongPositionFallCheck(ball: Ball) {
    if (ball.y > CANVAS_SIZES.height - DEFAULT_BALL_SIZE_PX) {
      let ballFellIndex = this.getMultiplierIndexByBallPosition(
        this.pegsBoundaries,
        ball.x
      );
      if (
        ballFellIndex !== ball.endPointIndex &&
        !this.reportedBallsArr.includes(ball.id)
      ) {
        this.reportedBallsArr.push(ball.id);
      }
    }
  }
}
