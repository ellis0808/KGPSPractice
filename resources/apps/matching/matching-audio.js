import { audioObject, getAudio } from "../../utilities/audio.js";

const matchingSfx = {
  validConnection: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-poppop-1.mp3"],
    volume: 0.8,
  }),
  invalidConnection: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-cancel-1.mp3"],
    volume: 0.8,
  }),
  allCorrect: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
    volume: 0.8,
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
  // the following three variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there. grouping and grouping2 set the minimum and maximum ranges for the grouping in the case that more than one set of audio is needed

  let category;
  let grouping;
  let grouping2 = null;
  if (style === 1) {
    category = "alphabet";
    grouping = 1;
    getAudio(category, grouping, grouping2);
  }
}

export { matchingSfx, startAudioFetch };
