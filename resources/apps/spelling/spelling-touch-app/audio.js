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

const correctSFX = new Audio("/resources/audio/sfx/クイズ正解4.mp3");
const selectLetterSFX = new Audio("/resources/audio/sfx/カーソル移動1.mp3");
const incorrectSFX = new Audio("/resources/audio/sfx/ビープ音4.mp3");

const spellingSfx = {
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
