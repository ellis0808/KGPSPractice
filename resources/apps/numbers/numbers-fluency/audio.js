const numbersFluencySfx = {
  restoreHeartSFX: new Howl({
    src: ["/resources/audio/sfx/パパッ.mp3"],
    volume: 0.8,
  }),
  incorrect: new Howl({
    src: ["/resources/audio/sfx/キャンセル5.mp3"],
    volume: 0.8,
  }),
  correct: new Howl({
    src: ["/resources/audio/sfx/クイズ正解5.mp3"],
    volume: 0.8,
  }),
  startApp: new Howl({
    src: ["/resources/audio/sfx/決定ボタンを押す43.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
  newRound: new Howl({
    src: ["/resources/audio/sfx/ちゃんちゃん♪1.mp3"],
    volume: 0.5,
  }),
};

export { numbersFluencySfx };
