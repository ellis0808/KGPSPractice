import { audio } from "../../utilities/audio.js";

class MatchingAudio {
  constructor() {}
  startAudioFetch(set) {
    // the following three variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there. grouping and grouping2 set the minimum and maximum ranges for the grouping in the case that more than one set of audio is needed

    let category;
    let grouping;
    let grouping2 = null;
    if (set === "alphabet") {
      category = "alphabet";
      grouping = 1;
      audio.getAudio(category, grouping, grouping2);
    }
  }
}

const matchingAudio = new MatchingAudio();

export { matchingAudio };
