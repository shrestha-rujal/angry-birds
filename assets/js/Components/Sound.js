class Sound {

  static async loadTracks(loader) {
    Sound.tracks = {
      THEME: await Utils.loadSound(AUDIO_THEME),
      BUTTON: await Utils.loadSound(AUDIO_BUTTON),
      BIRD_LAUNCH: await Utils.loadSound(AUDIO_BIRD_LAUNCH),
      BIRD_SELECT: await Utils.loadSound(AUDIO_BIRD_SELECT),
      RUBBER: await Utils.loadSound(AUDIO_RUBBER),
      RUBBER_RELEASE: await Utils.loadSound(AUDIO_RUBBER_RELEASE),
      ARMORED_PIG: await Utils.loadSound(AUDIO_PIG_HURT),
      UNARMORED_PIG: await Utils.loadSound(AUDIO_PIG_HURT),
      WOOD: await Utils.loadSound(AUDIO_WOOD),
      STONE: await Utils.loadSound(AUDIO_STONE),
      ICE: await Utils.loadSound(AUDIO_ICE),
      GAME_START: await Utils.loadSound(AUDIO_GAME_START),
      GAME_WON: await Utils.loadSound(AUDIO_GAME_WON),
      GAME_LOST: await Utils.loadSound(AUDIO_GAME_LOST),
    };

    Sound.checkTracksLoaded(loader);
  }

  static async checkTracksLoaded(loader) {
    await Promise.all(Object.values(Sound.tracks));
    loader.hasSoundLoaded = true;
  }

  static play(sound) {
    const track = Sound.tracks[sound];

    track.currentTime = 0;
    track.play();
  }

  static stop(sound) {
    Sound.tracks[sound].pause();
  }

}
