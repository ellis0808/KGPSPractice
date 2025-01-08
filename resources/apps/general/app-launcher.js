import { cardTouchApp } from "../card-touch/card-touch.js";
import { fluencyApp } from "../fluency/fluency.js";
import { audio } from "../../utilities/audio.js";

const appLauncher = {
  startCardTouchApp(set) {
    cardTouchApp(set);
  },
  startFluencyApp(set) {
    fluencyApp(set);
  },
};

export { appLauncher };
