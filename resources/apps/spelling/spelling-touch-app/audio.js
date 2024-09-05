// Audio
import { word } from "./spelling-touch-index.js";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let source = null;

function stopAudio() {
  source.stop();
}

function finishedLoading(bufferList) {
  source = audioContext.createBufferSource();
  source.buffer = bufferList[0];
  source.connect(audioContext.destination);
  source.start(0);
}

const correctSFX = new Audio(
  "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-correct-2.mp3"
);
const selectLetterSFX = new Audio(
  "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-cursor-move-1.mp3"
);
const incorrectSFX = new Audio(
  "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-beep-1.mp3"
);

const spellingSfx = {
  restoreHeartSFX: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-poppop-1.mp3"],
    volume: 0.8,
  }),
  incorrect: new Howl({
    src: ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-cancel-1.mp3"],
    volume: 0.8,
  }),
  correct: new Howl({
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

function speak() {
  let newWord = word;
  const synth = window.speechSynthesis;
  let speakWord = new SpeechSynthesisUtterance(newWord);
  setTimeout(function () {
    synth.speak(speakWord);
  }, 1000);
  return newWord;
}

export { audioContext, speak, stopAudio, finishedLoading };
