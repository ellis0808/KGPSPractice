const numbersFluencySfx = {
  restoreHeartSFX: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-poppop-1.mp3"],
    volume: 0.8,
  }),
  incorrect: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-cancel-1.mp3"],
    volume: 0.8,
  }),
  correct: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-correct-2.mp3"],
    volume: 0.8,
  }),
  startApp: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-seelct-3.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
  newRound: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-success-1.mp3"],
    volume: 0.5,
  }),
};

export { numbersFluencySfx };
