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
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-poppop-1.mp3"],
    volume: 0.8,
  }),
  invalidConnection: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-cancel-1.mp3"],
    volume: 0.8,
  }),
  allCorrect: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
    volume: 0.8,
  }),
  startApp: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-select-3.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

export { matchingSfx, speak };
