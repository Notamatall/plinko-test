let pegId = 0;
const inactivePeg = '#BC0F48';
const activePeg = '#BC0F48 ';
const pegAura = '#E9F4FF1A';
const pegAuraAnimation = '#FF014E';

export default class Peg {
  constructor(
    x: number,
    y: number,
    radius: number,
    auraEffect: HTMLImageElement
  ) {
    this._id = ++pegId;
    this.colliding = false;
    this.animationProgress = 0;
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._auraEffect = auraEffect;
  }

  addCollision() {
    this.colliding ||
      ((this.colliding = true),
      setTimeout(() => {
        this.colliding = false;
      }, this._animationDuration));
  }

  show(ctx: CanvasRenderingContext2D) {
    if (this.colliding) this.handleCollision(ctx);
    else this.drawAura(ctx);
    this.drawPeg(ctx);
  }

  private drawAura(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = pegAura;
    ctx.arc(this._x, this._y, this._radius * 1.4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  private drawPeg(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    if (this.colliding) ctx.fillStyle = activePeg;
    else ctx.fillStyle = inactivePeg;
    ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  private handleCollision(ctx: CanvasRenderingContext2D) {
    const halfDuration = this.animationInterations / 2;
    const auraScale = 0.4;

    if (this.animationProgress < this.animationInterations) {
      this.animationProgress++;

      ctx.beginPath();
      ctx.fillStyle = pegAuraAnimation;

      let radius = this._radius * 1 + auraScale * this.animationProgress;
      if (this.animationProgress > halfDuration) {
        const backwardAnimationIteration =
          halfDuration - (this.animationProgress - halfDuration);
        radius = this._radius * 1 + auraScale * backwardAnimationIteration;
      }

      ctx.shadowBlur = this._radius * 4;
      ctx.shadowColor = pegAuraAnimation;
      ctx.arc(this._x, this._y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      this.drawParticles(ctx);
    } else this.animationProgress = 0;
    ctx.shadowBlur = 0;
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this._auraEffect,
      this._x - this._radius * 2,
      this._y - this._radius * 2.5,
      this._radius * 3,
      this._radius * 2
    );
  }

  private get animationInterations() {
    return (this._animationDuration / 100) * 6;
  }
  private _animationDuration = 520;
  private _id: number;
  private _auraEffect: HTMLImageElement;
  private colliding: boolean;
  private animationProgress: number = 0;
  private _x: number;
  private _y: number;
  private _radius: number;

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
