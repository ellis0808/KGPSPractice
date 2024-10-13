import { cardTouchApp } from "../card-touch/card-touch.js";
import { matchingApp } from "../matching/matching.js";
import { fluencyApp } from "../fluency/fluency.js";
import { writingApp } from "../writing/writing.js";
// import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

class AppLauncher {
  // Card Touch App
  startCardTouchApp(set) {
    mainMenuSfx.select2.play();
    cardTouchApp(set);
  }
  // Matching App
  startMatchingApp(set) {
    mainMenuSfx.select2.play();
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
    mainMenuSfx.select2.play();
    fluencyApp(set);
  }
  // Writing App
  startWritingApp(set) {
    mainMenuSfx.select2.play();
    writingApp(set);
  }
}

const appLauncher = new AppLauncher();

export { appLauncher };
