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
  if (style === 1) {
    activityId = 1;
    return activityId;
  } else if (style === 2) {
    activityId = 2;
    return activityId;
  } else if (style === 3) {
    activityId = 4;
    return activityId;
  } else if (style === 4) {
    activityId = 5;
    return activityId;
  } else if (style === 5) {
    activityId = 6;
    return activityId;
  } else if (style === 6) {
    activityId = 16;
    return activityId;
  } else if (style === 7) {
    activityId = 8;
    return activityId;
  } else if (style === 8) {
    activityId = 9;
    return activityId;
  }
}
export { style, activityId, setStyle, setActivityId };
