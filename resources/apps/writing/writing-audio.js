import { getAudio, audioObject } from "../../utilities/audio.js";
import { randomItemArray } from "./writing.js";
let correctCardID;
let randomNumber;

const updateRandomNumber = () => {
  console.log(randomItemArray);

  randomNumber = Math.floor(Math.random() * randomItemArray.length);
  return randomNumber;
};

const speak = () => {
  updateRandomNumber();

  const randomWord = randomItemArray[randomNumber];

  setTimeout(function () {
    console.log(randomWord);
    audioObject[randomWord].sound.play();
  }, 1000);
};

const repeat = () => {
  const randomItem = randomItemArray[randomNumber];

  setTimeout(() => {
    // if (!isPaused) {
    audioObject[randomItem].sound.play();
    // }
  }, 30);
};

const writingSfx = {
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

function startAudioFetch(style) {
  // these two variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there
  let category;
  let grouping;
  let grouping2;
  if (style === 1) {
    category = "sight-words";
    grouping = 1;
    getAudio(category, grouping, grouping2);
  }
}

export {
  audioObject,
  writingSfx,
  correctCardID,
  randomNumber,
  speak,
  getAudio,
  startAudioFetch,
};
