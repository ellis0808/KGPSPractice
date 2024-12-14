import { cardTouchApp } from "../card-touch/card-touch.js";
import { fluencyApp } from "../fluency/fluency.js";
import { writingApp } from "../writing/writing.js";
import { audio } from "../../utilities/audio.js";

const appLauncher = {
  startCardTouchApp(set) {
    audio.navigationSfx.selectMenu.play();
    cardTouchApp(set);
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
