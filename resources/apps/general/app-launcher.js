import { cardTouchApp } from "../card-touch/card-touch.js";
import { matchingApp } from "../matching/matching.js";
import { fluencyApp } from "../fluency/fluency.js";
import { writingApp } from "../writing/writing.js";
// import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { audio } from "../../utilities/audio.js";

class AppLauncher {
  // Card Touch App
  startCardTouchApp(set) {
    audio.navigationSfx.selectMenu.play();
    cardTouchApp(set);
  }
  // Matching App
  startMatchingApp(set) {
    audio.navigationSfx.selectMenu.play();
    matchingApp(set);
  }
  //  startSpellingTouchApp() {
  //   mainMenuSfx.select2.play();
  //   spellingTouchApp();
  // }
  //  startSpellingWritingApp() {
  //   mainMenuSfx.select2.play();
  //   spellingWritingApp();
  // }
  // Fluency App
  startFluencyApp(set) {
    audio.navigationSfx.selectMenu.play();
    fluencyApp(set);
  }
  // Writing App
  startWritingApp(set) {
    audio.navigationSfx.selectMenu.play();
    writingApp(set);
  }
}

const appLauncher = new AppLauncher();

export { appLauncher };
