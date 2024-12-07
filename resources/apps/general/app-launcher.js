import { cardTouchApp } from "../card-touch/card-touch.js";
import { fluencyApp } from "../fluency/fluency.js";
import { writingApp } from "../writing/writing.js";
import { audio } from "../../utilities/audio.js";
import { matchingApp } from "../../utilities/app-class.js";

console.log("test");
const appLauncher = {
  startCardTouchApp(set) {
    audio.navigationSfx.selectMenu.play();
    cardTouchApp(set);
  },
  startMatchingApp(set) {
    audio.navigationSfx.selectMenu.play();
    matchingApp.run(set, 60);
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
