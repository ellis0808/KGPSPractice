import { audio } from "../../utilities/audio.js";
import { randomItemArray } from "./writing.js";

class WritingAudio {
  constructor() {
    this.randomNumber;
    this.randomWord;
    this.repeat = this.repeat.bind(this);
    this.writingSfx = {
      correct: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
      }),
      incorrect: new Howl({
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
  }
  updateRandomNumber = () => {
    this.randomNumber = Math.floor(Math.random() * randomItemArray.length);
    return this.randomNumber;
  };
  speak = () => {
    this.updateRandomNumber();
    this.randomWord = randomItemArray[this.randomNumber];
    setTimeout(() => {
      console.log(this.randomWord);
      audio.audioObject[this.randomWord].sound.play();
    }, 1000);
    return this.randomWord;
  };
  repeat = () => {
    setTimeout(() => {
      // if (!isPaused) {
      audio.audioObject[this.randomWord].sound.play();
      // }
    }, 30);
  };
  startAudioFetch(style) {
    // these three variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there. grouping is the lower end of the range you want to retrieve, and grouping2 is the higher end
    let category;
    let grouping;
    let grouping2 = null;
    switch (style) {
      case 9:
        category = "sight-words";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
    }
  }
}

const writingAudio = new WritingAudio();

export { writingAudio };
