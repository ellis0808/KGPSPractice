import { writingAudio } from "./writing-audio.js";

let style;
let activityId;

// This function sets the style based on what the activity is. The "set" is retrieved from 'start-main-app', which is the main page that the user sees upon loging in.
function setStyle(set) {
  switch (set) {
    // Numbers
    case "numbers1-10":
      style = 1;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers11-20":
      style = 2;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers21-40":
      style = 3;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers41-60":
      style = 4;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers61-80":
      style = 5;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers81-100":
      style = 6;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers1-50":
      style = 7;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers1-100":
      style = 8;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    // Math
    case "sightwords1":
      style = 9;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "sightwords2":
      style = 10;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "sightwords3":
      style = 11;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers1-100":
      style = 5;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    // Letter Sounds
    case "numbers1-100":
      style = 5;
      writingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
  }
}

// This function sets the activity id. The activity id is used in recording the scoreFunction obtained in a given activity. (Separate scores are kept for each activity; the number the user sees scoreFunction is the total of all activity scores combined.)
function setActivityId(style) {
  if (style === 0) {
    writingaactivityId = 1;
    return activityId;
  } else if (style === 1) {
    writingaactivityId = 2;
    return activityId;
  } else if (style === 2) {
    writingaactivityId = 4;
    return activityId;
  } else if (style === 3) {
    writingaactivityId = 5;
    return activityId;
  } else if (style === 4) {
    writingaactivityId = 6;
    return activityId;
  } else if (style === 5) {
    writingaactivityId = 16;
    return activityId;
  } else if (style === 6) {
    writingaactivityId = 8;
    return activityId;
  } else if (style === 7) {
    writingaactivityId = 9;
    return activityId;
  } else if (style === 9) {
    writingaactivityId = 4;
    return activityId;
  }
}
export { style, activityId, setStyle, setActivityId };
