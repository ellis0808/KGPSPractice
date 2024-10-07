import { getAudio } from "../../utilities/audio.js";
import { cardText } from "./card-touch-index.js";
let audioObject = {};
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
    audioObject[randomWord].sound.play();
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

// these three variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there. grouping and grouping2 set the minimum and maximum ranges for the grouping in the case that more than one set of audio is needed
let category;
let grouping;
let grouping2 = null;
if (style === 1 || style === 2) {
  category = "alphabet";
  grouping = 1;
  getAudio(category, grouping);
}
if (style === 3) {
  category = "sight-words";
  grouping = 2;
  getAudio(category, grouping);
}
if (style === 4) {
  category = "sight-words";
  grouping = 2;
  grouping2 = 3;
  getAudio(category, grouping, grouping2);
}
if (style === 5) {
  category = "sight-words";
  grouping = 2;
  grouping2 = 4;
  getAudio(category, grouping, grouping2);
}
if (style === 6) {
  category = "phonics";
  grouping = 1;
  getAudio(category, grouping);
}

export { audioObject, cardTouchSfx, correctCardID, randomNumber, speak };
