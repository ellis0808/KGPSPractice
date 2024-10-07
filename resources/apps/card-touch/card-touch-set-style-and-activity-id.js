import { startAudioFetch } from "./card-touch-audio";
let style;
let activityId;

// This function sets the style based on what the activity is. The "set" is retrieved from 'start-main-app', which is the main page that the user sees upon loging in.
function setStyle(set) {
  switch (set) {
    case "capitals":
      style = 1;
      startAudioFetch(style);
      setActivityId(style);
      return style;
    case "lowercase":
      style = 2;
      startAudioFetch(style);
      setActivityId(style);
      return style;
    case "sightwords1":
      style = 3;
      startAudioFetch(style);
      setActivityId(style);
      return style;
    case "sightwords2":
      style = 4;
      startAudioFetch(style);
      setActivityId(style);
      return style;
    case "sightwords3":
      style = 5;
      startAudioFetch(style);
      setActivityId(style);
      return style;
    case "letter-sounds-asmf":
      style = 6;
      startAudioFetch(style);
      setActivityId(style);
      return style;
  }
}

// This function sets the activity id. The activity id is used in recording the score obtained in a given activity. (Separate scores are kept for each activity; the number the user sees score is the total of all activity scores combined.)
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
      return (activityId = 8);
    case 8:
      return (activityId = 9);
  }
}
export { style, activityId, setStyle, setActivityId };
