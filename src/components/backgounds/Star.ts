import type Space from '@/components/backgounds/Space';

const speed = 0.5;
const minStarSize = 1;
const maxStarSize = minStarSize + 6;
const fontFactor = 5;
const starChar = '\ueffe'; // Unicode character for a star

export default class Star {
  space: Space;
  height!: number;
  width!: number;
  halfHeight!: number;
  halfWidth!: number;
  x!: number;
  y!: number;
  directionX!: number;
  directionY!: number;

  constructor(space: Space) {
    this.space = space;
    this.resize();
    this.reset();
  }

  resize() {
    this.height = this.space.height;
    this.width = this.space.width;
    this.halfHeight = this.height / 2;
    this.halfWidth = this.width / 2;
  }

  reset({ centerStar = false } = {}) {
    if (centerStar) {
      this.x = this.halfWidth;
      this.y = this.halfHeight;

      // Random direction for the star's movement
      const angle = Math.random() * 2 * Math.PI;
      this.directionX = Math.cos(angle);
      this.directionY = Math.sin(angle);
    } else {
      this.x = Math.abs(Math.random() * this.width - this.width);
      this.y = Math.abs(Math.random() * this.height - this.height);

      let angle: number;
      if (this.x > this.halfWidth && this.y > this.halfHeight) {
        // Right down
        angle = (Math.random() * Math.PI) / 2;
      } else if (this.x > this.halfWidth && this.y < this.halfHeight) {
        // Right up
        angle = (Math.random() * Math.PI) / 2 + (3 * Math.PI) / 2;
      } else if (this.x < this.halfWidth && this.y > this.halfHeight) {
        //Left down
        angle = (Math.random() * Math.PI) / 2 + Math.PI / 2;
      } else {
        // Left up
        angle = (Math.random() * Math.PI) / 2 + Math.PI;
      }

      this.directionX = Math.cos(angle);
      this.directionY = Math.sin(angle);
    }
  }

  computeScale() {
    // Compute the scale factor based on the distance from the edges
    // max scale = 1 when close to the edges

    // left right edges
    let xScale: number;
    if (this.x <= this.halfWidth) {
      xScale = 1 - this.x / this.halfWidth;
    } else {
      xScale = 1 - (this.width - this.x) / this.halfWidth;
    }

    // top bottom edges
    let yScale: number;
    if (this.y <= this.halfHeight) {
      yScale = 1 - this.y / this.halfHeight;
    } else {
      yScale = 1 - (this.height - this.y) / this.halfHeight;
    }

    return Math.max(xScale, yScale);
  }

  update() {
    // accelerate the star when close to the edges
    const scaleSpeed = speed * Math.exp(this.computeScale());

    this.x += this.directionX * scaleSpeed;
    this.y += this.directionY * scaleSpeed;

    // Once the star reaches the edge reset it
    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x > this.width ||
      this.y > this.height
    ) {
      // Reset star to the center of the canvas
      this.reset({ centerStar: true });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const size =
      (minStarSize + (maxStarSize - minStarSize) * this.computeScale()) *
      fontFactor;

    ctx.save();
    ctx.font = `${size}px icofont`;
    ctx.fillStyle = 'lightgray';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(starChar, this.x, this.y);
    ctx.restore();
  }
}
