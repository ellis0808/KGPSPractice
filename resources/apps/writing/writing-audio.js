import { getAudio, audioObject } from "../../utilities/audio.js";
import { randomItemArray } from "./writing.js";
let correctCardID;
let randomNumber;

const updateRandomNumber = () => {
  randomNumber = Math.floor(Math.random() * randomItemArray.length);
  return randomNumber;
};

const speak = () => {
  updateRandomNumber();
  console.log(audioObject);

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
  // these three variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there. grouping is the lower end of the range you want to retrieve, and grouping2 is the higher end
  let category;
  let grouping;
  let grouping2 = null;
  switch (style) {
    case 9:
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
  startAudioFetch,
};
