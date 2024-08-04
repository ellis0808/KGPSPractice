import { cardText } from "./alphabet-card-touch-lowercase-index.js";
import { alphabetObject } from "../alphabet-audio-object.js";

let correctCardID;

let randomNumber;
function updateRandomNumber() {
  randomNumber = Math.floor(Math.random() * cardText.length);

  return randomNumber;
}
function speak() {
  updateRandomNumber();

  const randomWord = cardText[randomNumber];

  setTimeout(function () {
    alphabetObject[randomWord].sound.play();
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
  startApp: new Howl({
    src: ["resources/audio/sfx/決定ボタンを押す43.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

export { cardTouchSfx, correctCardID, randomNumber, speak };
