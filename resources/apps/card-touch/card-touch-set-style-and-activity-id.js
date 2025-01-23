import { cardTouchAudio } from "./card-touch-audio.js";
import { images } from "../../utilities/images.js";
let style;
let activityId;

// This function sets the style based on what the activity is. The "set" is retrieved from 'start-main-app', which is the main page that the user sees upon loging in.
function setStyle(set) {
  switch (set) {
    case "alphabet-capitals":
      style = 1;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "alphabet-lowercase":
      style = 2;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "sightwords1":
      style = 3;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "sightwords2":
      style = 4;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "sightwords3":
      style = 5;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "letter-sounds-asmf-letters":
      style = 6;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "letter-sounds-asmf-words":
      style = 7;
      cardTouchAudio.startAudioFetch(style);
      return style;
    case "vocabulary-unit1":
      style = 8;
      cardTouchAudio.startAudioFetch(style);
      images.getImages("my_classroom", 1, null);
      return style;
  }
}

// This function sets the activity id. The activity id is used in recording the scoreFunction obtained in a given activity. (Separate scores are kept for each activity; the number the user sees scoreFunction is the total of all activity scores combined.)
function setActivityId(style) {
  switch (style) {
    case 1:
      return (activityId = 1);
    case 2:
      return (activityId = 2);
    case 3:
      return (activityId = 4);
    case 4:
      return (activityId = 5);
    case 5:
      return (activityId = 6);
    case 6:
      return (activityId = 16);
    case 7:
      return (activityId = 17);
    case 8:
      return (activityId = 9);
  }
}
export { style, activityId, setStyle, setActivityId };
