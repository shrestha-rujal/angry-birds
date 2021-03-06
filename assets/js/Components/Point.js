class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = POINT_FILL_COLOR;
    ctx.strokeStyle = POINT_STROKE_COLOR;
    ctx.lineWidth = POINT_LINE_WIDTH;
    ctx.arc(this.x, this.y, POINT_RADIUS, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  static pointsToPlot = [];

  static getOrigin() {
    return new Point(0, 0);
  }

  static getDistanceBetween(p1, p2) {
    const xDiff = p2.x - p1.x;
    const yDiff = p2.y - p1.y;

    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  }

  static add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  static subtract(p1, p2) {
    return new Point(p2.x - p1.x, p2.y - p1.y)
  }

  static plotPoints(ctx, points2Plot) {

    const points = [...Point.pointsToPlot, ...points2Plot];

    points.forEach((point) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = POINT_FILL_COLOR;
      ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    });
  }

  static rotatePoint(point, angle) {
    const { x, y } = point;
    const angleRadians = Utils.toRadians(angle);

    return new Point(
      x * Math.cos(angleRadians) - y * Math.sin(angleRadians),
      x * Math.sin(angleRadians) + y * Math.cos(angleRadians),
    );
  }

  static getAngle(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p1.y - p2.y;
    const angle = Math.atan2(dy, dx);

    return angle;
  }
}
