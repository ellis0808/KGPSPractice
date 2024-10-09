import { getAudio } from "../../utilities/audio.js";
import { randomItem } from "./writing.js";
let audioObject = {};
let correctCardID;
let randomNumber;

function speak() {
  setTimeout(function () {
    audioObject[randomItem].sound.play();
  }, 1000);
}

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
  loadAudio,
  startAudioFetch,
};
