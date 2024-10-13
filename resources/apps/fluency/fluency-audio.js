const numbersFluencySfx = {
  restoreHeartSFX: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-poppop-1.mp3"],
    volume: 0.8,
  }),
  incorrect: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-cancel-1.mp3"],
    volume: 0.8,
  }),
  correct: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
    volume: 0.8,
  }),
  startApp: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-3.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
  newRound: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-success-1.mp3"],
    volume: 0.5,
  }),
};

export { numbersFluencySfx };
