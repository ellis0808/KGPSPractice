import { fluencyAudio } from "./fluency-audio.js";

let style;
let activityId;

function setStyle(set) {
  switch (set) {
    case 1:
      style = 1;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case 2:
      style = 2;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case 3:
      style = 3;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case 4:
      style = 4;
      fluencyAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
    case 5:
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
