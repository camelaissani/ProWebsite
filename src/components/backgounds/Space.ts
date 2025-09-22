import Star from '@/components/backgounds/Star';

const starNumber = 30;

export default class Space {
  static #instance: Space | null = null;

  canvas!: HTMLCanvasElement;
  stars!: Star[];
  ctx!: CanvasRenderingContext2D;
  animationFrameId!: number;
  spaceColor!: string;

  static bigBang(canvas: HTMLCanvasElement) {
    if (!canvas) return;

    if (!Space.#instance) {
      Space.#instance = new Space(canvas);
    }

    return Space.#instance;
  }

  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) return;
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    this.spaceColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-background')
      .trim();

    this.stars = Array.from({ length: starNumber }, () => new Star(this));

    this.animate();
  }

  get height() {
    if (!this.canvas) return 0;
    return this.canvas.height;
  }

  get width() {
    if (!this.canvas) return 0;
    return this.canvas.width;
  }

  animate() {
    if (!this.canvas || !this.ctx || !this.stars) return;
    // Clear the canvas to prepare for the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const star of this.stars) {
      star.update();
      star.draw(this.ctx);
    }

    // draw small rectangle 10% reatio of the canvas
    // background color is from var(--color-background)
    // It hides the origin of the stars
    this.ctx.fillStyle = this.spaceColor;
    const width = this.canvas.width * 0.1;
    const height = this.canvas.height * 0.1;
    this.ctx.fillRect(
      this.canvas.width / 2 - width / 2,
      this.canvas.height / 2 - height / 2,
      width,
      height,
    );

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    if (!this.canvas || !this.stars) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    for (const star of this.stars) {
      star.resize();
    }
  }

  destroy() {
    if (!this.animationFrameId) return;
    cancelAnimationFrame(this.animationFrameId);
    Space.#instance = null;
  }
}
