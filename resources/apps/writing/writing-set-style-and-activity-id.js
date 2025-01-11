import { writingAudio } from "./writing-audio.js";
import { writingApp } from "./writing.js";

let style;
let activityId;

// This function sets the style based on what the activity is. The "set" is retrieved from 'start-main-app', which is the main page that the user sees upon loging in.
function setStyle(set) {
  switch (set) {
    // Numbers
    case "numbers1-10":
      writingAudio.startAudioFetch(1);
      writingApp.activityId = 2;
    case "numbers11-20":
      writingAudio.startAudioFetch(2);
      writingApp.activityId = 4;
    case "numbers21-40":
      writingAudio.startAudioFetch(3);
      writingApp.activityId = 5;
    case "numbers41-60":
      writingAudio.startAudioFetch(4);
      writingApp.activityId = 6;
    case "numbers61-80":
      writingAudio.startAudioFetch(5);
      writingApp.activityId = 16;
    case "numbers81-100":
      writingAudio.startAudioFetch(6);
      writingApp.activityId = 8;
    case "numbers1-50":
      writingAudio.startAudioFetch(7);
      writingApp.activityId = 9;
    case "numbers1-100":
      writingAudio.startAudioFetch(8);
      writingApp.activityId = 15;
    // Sight Words
    case "sightwords1":
      writingAudio.startAudioFetch(9);
      writingApp.activityId = 4;
    case "sightwords2":
      writingAudio.startAudioFetch(10);
      writingApp.activityId = 5;
    case "sightwords3":
      writingAudio.startAudioFetch(11);
      writingApp.activityId = 6;

    // Letter Sounds
    case "letter-sounds-asmf-letters":
      writingAudio.startAudioFetch(20);
      writingApp.activityId = 20;
    case "letter-sounds-asmf-words":
      writingAudio.startAudioFetch(21);
      writingApp.activityId = 20;
  }
}

// This function sets the activity id. The activity id is used in recording the scoreFunction obtained in a given activity. (Separate scores are kept for each activity; the number the user sees scoreFunction is the total of all activity scores combined.)
function setActivityId(style) {
  if (style === 0) {
    activityId = 1;
    return activityId;
  } else if (style === 1) {
  } else if (style === 2) {
  } else if (style === 3) {
  } else if (style === 4) {
  } else if (style === 5) {
  } else if (style === 6) {
  } else if (style === 7) {
  } else if (style === 9) {
  } else if (style === 20) {
  } else if (style === 21) {
  }
}
export { style, activityId, setStyle, setActivityId };
