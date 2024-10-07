let style;
let activityId;

function setStyle(set) {
  switch (set) {
    case "alphabet":
      style = 1;
      startAudioFetch(style);
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
