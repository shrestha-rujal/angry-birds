class Main {
  constructor() {
    this.canvas = new Canvas(this);
    this.ctx = this.canvas.ctx;
    this.fps = new FrameThrottler(this, TARGET_FPS);
    this.animateId = undefined;
    this.levelsData = undefined;
    this.loader = new Loader(this);
    this.gameState = GAME_STATES.LOADING;

    this
      .loader
      .init()
      .then(this.init);

    this.start();
  }

  init = async () => {
    this.game = new Game(this);
    this.menu = new Menu(this);
    this.levels = new Levels(this);
    this.gamePlayLevel = LEVEL_ONE;
    this.results = new Results(this);
    this.builder = new Builder(this);
    this.playerScore = undefined;
    this.maxScore = undefined;
    this.gameEndStatus = GAME_LOST;
  }

  runGame(time) {
    this.animateId = undefined;

    if(this.fps.shouldRenderNextFrame(time)) {
      this.clearScreen();

      switch(this.gameState) {
        case GAME_STATES.LOADING:
          this.loader.render();
          break;

        case GAME_STATES.MENU:
          this.menu.render();
          break;

        case GAME_STATES.LEVEL_SELECTION:
          this.levels.render();
          break;

        case GAME_STATES.BUILDING:
          this.builder.render();
          break;

        case GAME_STATES.PLAYING:
          this.game.render();
          break;

        case GAME_STATES.RESULTS:
          this.results.render();
          break;
      }
    }

    this.start();
  }

  start() {
    if (!this.animateId) {
      this.animateId = window.requestAnimationFrame(this.runGame.bind(this));
    }
  }

  stop() {
    if (this.animateId) {
      window.cancelAnimationFrame(this.animateId);
    }
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
