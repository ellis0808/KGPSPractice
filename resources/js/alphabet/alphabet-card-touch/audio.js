import { cardText } from "./alphabet-card-touch-index.js";

let correctCardID;

let randomNumber;
function updateRandomNumber() {
  randomNumber = Math.floor(Math.random() * cardText.length);

  return randomNumber;
}
function speak() {
  updateRandomNumber();

  const synth = window.speechSynthesis;
  const randomWord = cardText[randomNumber];

  let speakWord = new SpeechSynthesisUtterance(randomWord);
  setTimeout(function () {
    synth.speak(speakWord);
  }, 1000);

  return (correctCardID = randomNumber);
}

const cardTouchSfx = {
  correcCard: new Howl({
    src: ["resources/audio/sfx/クイズ正解5.mp3"],
  }),
  incorrectCard: new Howl({
    src: ["resources/audio/sfx/クイズ不正解2.mp3"],
  }),
};

export { cardTouchSfx, correctCardID, randomNumber, speak };
