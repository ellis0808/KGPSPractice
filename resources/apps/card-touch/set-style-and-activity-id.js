import { getAudio } from "./card-touch-index";
let style;
let activityId;

// This function sets the style based on what the activity is. The "set" is retrieved from 'start-main-app', which is the main page that the user sees upon loging in.
function setStyle(set) {
  switch (set) {
    case "capitals":
      style = 0;
      getAudio(style);
      setActivityId(style);
      return style;
    case "lowercase":
      style = 1;
      getAudio(style);
      setActivityId(style);
      return style;
    case "sightwords1":
      style = 2;
      getAudio(style);
      setActivityId(style);
      return style;
    case "sightwords2":
      style = 3;
      getAudio(style);
      setActivityId(style);
      return style;
    case "sightwords3":
      style = 4;
      getAudio(style);
      setActivityId(style);
      return style;
    case "phonics1":
      style = 5;
      getAudio(style);
      setActivityId(style);
      return style;
  }
}

function setActivityId(style) {
  if (style === 0) {
    activityId = 1;
    return activityId;
  } else if (style === 1) {
    activityId = 2;
    return activityId;
  } else if (style === 2) {
    activityId = 4;
    return activityId;
  } else if (style === 3) {
    activityId = 5;
    return activityId;
  } else if (style === 4) {
    activityId = 6;
    return activityId;
  } else if (style === 5) {
    activityId = 7;
    return activityId;
  } else if (style === 6) {
    activityId = 8;
    return activityId;
  } else if (style === 7) {
    activityId = 9;
    return activityId;
  }
}
export { style, activityId, setStyle, setActivityId };
