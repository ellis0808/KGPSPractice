import { audio } from "../../utilities/audio.js";
import { writingApp } from "./writing.js";

class WritingAudio {
  constructor() {
    this.arrayItemNumber = 0;
    this.randomWord = null;
    this.repeat = this.repeat.bind(this);
  }
  increaseArrayItemNumber = () => {
    ++this.arrayItemNumber;
  };
  resetArrayItemNumber() {
    this.arrayItemNumber = 0;
    console.log(this.arrayItemNumber);
  }
  speak = () => {
    // this.updateRandomNumber();

    this.randomWord = writingApp.randomItemArray[this.arrayItemNumber];
    setTimeout(() => {
      audio.audioObject[this.randomWord].sound.play();
    }, 1000);
    this.increaseArrayItemNumber();
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
      case "numbers1-10":
        category = "numbers";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers11-20":
        category = "numbers11-20";
        grouping = 2;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers21-40":
        category = "numbers";
        grouping = 3;
        grouping = 4;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers41-60":
        category = "numbers";
        grouping = 5;
        grouping = 6;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers61-80":
        category = "numbers";
        grouping = 7;
        grouping = 8;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers81-100":
        category = "numbers";
        grouping = 9;
        grouping = 10;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers1-50":
        category = "numbers";
        grouping = 1;
        grouping2 = 5;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers51-100":
        category = "numbers";
        grouping = 6;
        grouping2 = 10;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "numbers1-100":
        category = "numbers";
        grouping = 1;
        grouping2 = 10;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "sightwords1":
        category = "sight-words";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "sightwords2":
        category = "sight-words";
        grouping = 1;
        grouping2 = 2;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "sightwords3":
        category = "sight-words";
        grouping = 1;
        grouping2 = 3;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "letter-sounds-asmf-letters":
        category = "letter-sounds-letters";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
        break;
      case "letter-sounds-asmf-words":
        category = "letter-sounds-words";
        grouping = 1;
        audio.getAudio(category, grouping, grouping2);
        break;
    }
  }
}

const writingAudio = new WritingAudio();

export { writingAudio };
