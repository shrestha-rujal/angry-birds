class Base {
  constructor(
    position,
    velocity,
    acceleration,
    mass,
    image,
    type,
    subtype,
    isRound = false,
  ) {
    this.id = Utils.getUniqueId();
    this.type = type;
    this.position = position;
    this.velocity = velocity
    this.mass = mass || BASE_MASS;
    this.angle = BASE_ANGLE;
    this.oldAngle = BASE_ANGLE;
    this.acceleration = acceleration;
    this.isDestructible = false;
    this.image = image;
    this.isDescending = false;
    this.isRound = isRound;
    this.subtype = subtype;
    this.animator = new Animator(this, this.subtype);
  }

  getCenter() {
    return Point.add(this.position, new Point(this.width / 2, this.height / 2));
  }

  adjustPositionToCenter() {
    const offset = this.isRound
      ? new Point(this.radius, this.radius)
      : new Point(this.width / 2, this.height / 2);

    this.position = Point.subtract(offset, this.position);
  }

  setPosition(point) {
    const bottomEdge = point.y + this.getHeight();
    this.position.x = point.x;

    this.position.y = (bottomEdge > GROUND_Y) ? (GROUND_Y - this.getHeight()) : point.y;
  }

  rotate(angle) {
    this.oldAngle = this.angle;
    this.angle = (this.angle + angle) % 360;
  }

  hasRotated() {
    const hasRotated = this.angle != this.oldAngle;
    this.oldAngle = this.angle;
    return hasRotated;
  }

  move(x, y) {
    const bottomPosition = this.position.y + this.getHeight();

    // topmost point of jump reached
    if (!this.isDescending && this.velocity.y >= 0) {
      this.isDescending = true;
    }

    // bounce
    if (this.isDescending && bottomPosition >= GROUND_Y) {

      if (this.type === ENTITY_TYPE.BIRD && !this.hasBounced) {
        Sound.play(BIRD_BOUNCE);
        this.hasBounced = true;
      }

      const { x, y } = this.velocity;
      this.position.y = GROUND_Y - this.getHeight();
      this.velocity.y = Base.isJumpNegligible(y) ? 0 : -y * DAMPING_Y;
      this.velocity.x = Base.isJumpNegligible(x) ? 0 : x * DAMPING_X;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  getHeight() {
    return this.isRound ? this.radius * 2 : this.height;
  }

  stickToMouse(canvas) {
    canvas.el.addEventListener('mousemove', (e) => {
      this.setPosition(Utils.getMousePos(canvas.el, e));
    });
  }

  render(ctx) {
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
    );
    ctx.rotate(Utils.toRadians(this.angle));
    ctx.beginPath();
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height /2,
      this.width,
      this.height,
    )
    ctx.closePath();
    ctx.restore();
  }

  static isJumpNegligible(value) {
    return Math.abs(value) < MIN_JUMP_VELOCITY;
  }
}
