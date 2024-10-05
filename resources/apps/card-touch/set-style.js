import { style, getAudio, setActivityId } from "./card-touch-index";

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

export { setStyle };
