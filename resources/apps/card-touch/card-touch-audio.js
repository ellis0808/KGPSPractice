import { audio } from "../../utilities/audio.js";
import { cardText, isPaused } from "./card-touch.js";

class CardTouchAudio {
  constructor() {
    this.randomNumber = null;
    this.randomWord = null;
    this.correctCardID = null;
    this.repeat = this.repeat.bind(this);
  }
  updateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * cardText.length);

    return this.randomNumber;
  }
  speak() {
    this.updateRandomNumber();
    this.randomWord = cardText[this.randomNumber];
    setTimeout(() => {
      audio.audioObject[this.randomWord].sound.play();
    }, 1000);

    return (this.correctCardID = this.randomNumber);
  }
  repeat() {
    setTimeout(() => {
      if (!isPaused) {
        audio.audioObject[this.randomWord].sound.play();
      }
    }, 30);
  }
  startAudioFetch(style) {
    // the following three variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there. grouping and grouping2 set the minimum and maximum ranges for the grouping in the case that more than one set of audio is needed

    let category;
    let grouping;
    let grouping2 = null;
    if (style === 1 || style === 2) {
      category = "alphabet";
      grouping = 1;
      audio.getAudio(category, grouping, grouping2);
    }
    if (style === 3) {
      category = "sight-words";
      grouping = 1;
      audio.getAudio(category, grouping, grouping2);
    }
    if (style === 4) {
      category = "sight-words";
      grouping = 1;
      grouping2 = 2;
      audio.getAudio(category, grouping, grouping2);
    }
    if (style === 5) {
      category = "sight-words";
      grouping = 1;
      grouping2 = 3;
      audio.getAudio(category, grouping, grouping2);
    }
    if (style === 6) {
      category = "letter-sounds";
      grouping = 1;
      audio.getAudio(category, grouping, grouping2);
    }
  }
}

const cardTouchAudio = new CardTouchAudio();

export { cardTouchAudio };
