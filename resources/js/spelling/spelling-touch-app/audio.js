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

const correctSFX = new Audio("resources/audio/sfx/クイズ正解4.mp3");
const selectLetterSFX = new Audio("resources/audio/sfx/カーソル移動1.mp3");
const incorrectSFX = new Audio("resources/audio/sfx/ビープ音4.mp3");

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
