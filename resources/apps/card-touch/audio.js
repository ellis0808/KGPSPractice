import { cardText, style } from "./card-touch-index.js";
import { audioObject } from "./card-touch-index.js";

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
    // if (style === 0 || style === 1) {
    audioObject[randomWord].sound.play();
    // } else if (style === 2 || style === 3 || style === 4) {
    // sightWordsAudioObject[randomWord].sound.play();
    // }
  }, 1000);

  return (correctCardID = randomNumber);
}

const cardTouchSfx = {
  correcCard: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
  }),
  incorrectCard: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-incorrect-1.mp3"],
  }),
  startApp: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-3.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

export { cardTouchSfx, correctCardID, randomNumber, speak };
