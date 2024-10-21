import { audio } from "../../utilities/audio.js";

class FluencyAudio {
  constructor() {}
  speak(currentItem) {
    audio.audioObject[currentItem].sound.play();
  }
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
      case 2:
        category = "numbers";
        grouping = 2;
        audio.getAudio(category, grouping, grouping2);
      case 3:
        category = "numbers";
        grouping = 3;
        audio.getAudio(category, grouping, grouping2);
      case 4:
        category = "numbers";
        grouping = 4;
        audio.getAudio(category, grouping, grouping2);
      case 5:
        category = "numbers";
        grouping = 5;
        audio.getAudio(category, grouping, grouping2);
    }
  }
}

const fluencyAudio = new FluencyAudio();

export { fluencyAudio };
