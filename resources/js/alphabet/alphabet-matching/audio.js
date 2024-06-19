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
    src: ["resources/audio/sfx/パパッ.mp3"],
    volume: 0.8,
  }),
  invalidConnection: new Howl({
    src: ["resources/audio/sfx/キャンセル5.mp3"],
    volume: 0.8,
  }),
  allCorrect: new Howl({
    src: ["resources/audio/sfx/クイズ正解5.mp3"],
    volume: 0.8,
  }),
};

export { matchingSfx, speak };
