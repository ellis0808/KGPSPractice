import { cardTouchApp } from "../card-touch/card-touch.js";
import { fluencyApp } from "../fluency/fluency.js";
import { writingApp } from "../writing/writing.js";
import { audio } from "../../utilities/audio.js";
import { MatchingApp } from "../../utilities/app-class.js";

console.log("test");
matchingApp = new MatchingApp();
const appLauncher = {
  startCardTouchApp(set) {
    audio.navigationSfx.selectMenu.play();
    cardTouchApp(set);
  },
  startMatchingApp(set) {
    audio.navigationSfx.selectMenu.play();
    matchingApp.start(set);
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
