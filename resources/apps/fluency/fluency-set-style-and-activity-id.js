import { fluencyAudio } from "./fluency-audio.js";

let style;
let activityId;

function setStyle(set) {
  switch (set) {
    case "numbers21-40":
      style = 1;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers21-40":
      style = 2;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers41-60":
      style = 3;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers61-80":
      style = 4;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case "numbers81-100":
      style = 5;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
  }
}

function setActivityId(style) {
  switch (style) {
    case 1:
      return (activityId = 11);
    case 2:
      return (activityId = 12);
    case 3:
      return (activityId = 13);
    case 4:
      return (activityId = 14);
    case 5:
      return (activityId = 15);
  }
}

export { setStyle, setActivityId, style, activityId };
