import { cardText } from "./alphabet-card-touch.js";

// Audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let source = null;
let correctCardID;

function stopAudio() {
  source.stop();
}

function finishedLoading(bufferList) {
  source = audioContext.createBufferSource();
  source.buffer = bufferList[0];
  source.connect(audioContext.destination);
  source.start(0);
}

let randomNumber;
function updateRandomNumber() {
  randomNumber = Math.floor(Math.random() * cardText.length);

  return randomNumber;
}
function speak() {
  updateRandomNumber();

  const synth = window.speechSynthesis;
  // SpeechSynthesisVoice.name();
  console.log(SpeechSynthesis.getVoices);
  const randomWord = cardText[randomNumber];

  let speakWord = new SpeechSynthesisUtterance(randomWord);
  setTimeout(function () {
    synth.speak(speakWord);
  }, 1000);

  return (correctCardID = randomNumber);
}

export {
  audioContext,
  correctCardID,
  randomNumber,
  speak,
  stopAudio,
  finishedLoading,
};
