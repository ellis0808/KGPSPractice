import { cardTouchApp } from "../card-touch/card-touch.js";
import { matchingApp } from "../matching/matching.js";
import { fluencyApp } from "../fluency/fluency.js";
import { writingApp } from "../writing/writing.js";
// import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { audio } from "../../utilities/audio.js";

console.log("test");

const appLauncher = {
  startCardTouchApp(set) {
    audio.navigationSfx.selectMenu.play();
    cardTouchApp(set);
  },
  startMatchingApp(set) {
    audio.navigationSfx.selectMenu.play();
    matchingApp.startApp(set);
  },
  startFluencyApp(set) {
    audio.navigationSfx.selectMenu.play();
    fluencyApp(set);
  },

  startWritingApp(set) {
    audio.navigationSfx.selectMenu.play();
    writingApp(set);
  },
};

export { appLauncher };
