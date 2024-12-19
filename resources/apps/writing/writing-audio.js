import { audio } from "../../utilities/audio.js";
import { writingApp } from "./writing.js";

class WritingAudio {
  constructor() {
    this.randomNumber = null;
    this.randomWord = null;
    this.repeat = this.repeat.bind(this);
  }
  updateRandomNumber = () => {
    this.randomNumber = Math.floor(
      Math.random() * writingApp.randomItemArray.length
    );
  };
  speak = () => {
    this.updateRandomNumber();
    console.log(writingApp.randomItemArray);

    this.randomWord = writingApp.randomItemArray[this.randomNumber];
    setTimeout(() => {
      console.log(this.randomWord);
      audio.audioObject[this.randomWord].sound.play();
    }, 1000);
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
      case 1:
        category = "numbers";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
        break;
      case 2:
        category = "numbers";
        grouping = 2;
        audio.getAudio(category, grouping, grouping2);
        break;
      case 3:
        category = "numbers";
        grouping = 3;
        grouping = 4;
        audio.getAudio(category, grouping, grouping2);
        break;
      case 7:
        category = "numbers";
        grouping = 1;
        grouping2 = 5;
        audio.getAudio(category, grouping, grouping2);
        break;
      case 9:
        category = "sight-words";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
        break;
      case 10:
        category = "sight-words";
        grouping = 1;
        grouping2 = 2;
        audio.getAudio(category, grouping, grouping2);
        break;
      case 11:
        category = "sight-words";
        grouping = 1;
        grouping2 = 3;
        audio.getAudio(category, grouping, grouping2);
        break;
    }
  }
}

const writingAudio = new WritingAudio();

export { writingAudio };
