const numbersFluencySfx = {
  restoreHeartSFX: new Howl({
    src: ["http://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/パパッ.mp3"],
    volume: 0.8,
  }),
  incorrect: new Howl({
    src: ["http://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/キャンセル5.mp3"],
    volume: 0.8,
  }),
  correct: new Howl({
    src: ["http://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/クイズ正解5.mp3"],
    volume: 0.8,
  }),
  startApp: new Howl({
    src: [
      "http://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/決定ボタンを押す43.mp3",
    ],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
  newRound: new Howl({
    src: ["http://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/ちゃんちゃん♪1.mp3"],
    volume: 0.5,
  }),
};

export { numbersFluencySfx };
