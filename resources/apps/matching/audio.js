// Audio

function speak(event) {
  const synth = window.speechSynthesis;
  let letterToBeSpoken;
  if (event.target) {
    letterToBeSpoken = new SpeechSynthesisUtterance(
      event.target.getAttribute("contentId")
    );
  } else {
    let dot = event;
    letterToBeSpoken = new SpeechSynthesisUtterance(dot);
  }
  synth.speak(letterToBeSpoken);
}

const matchingSfx = {
  validConnection: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/パパッ.mp3"],
    volume: 0.8,
  }),
  invalidConnection: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/キャンセル5.mp3"],
    volume: 0.8,
  }),
  allCorrect: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/クイズ正解5.mp3"],
    volume: 0.8,
  }),
  startApp: new Howl({
    src: [
      "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/決定ボタンを押す43.mp3",
    ],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

export { matchingSfx, speak };
