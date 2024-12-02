import { matchingAudio } from "./matching-audio.js";

let style;
let activityId;

function setStyle(set) {
  switch (set) {
    case "alphabet":
      style = 1;
      matchingAudio.startAudioFetch(style);
      setActivityId(style);
      return style;
  }
}

function setActivityId(style) {
  switch (style) {
    case 1:
      return (activityId = 3);
  }
}

export { activityId, style, setActivityId, setStyle };
