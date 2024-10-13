import { cardTouchApp } from "../card-touch/card-touch.js";
import { matchingApp } from "../matching/matching.js";
import { numberFluencyApp } from "../fluency/fluency.js";
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
  function startMatchingApp(set) {
    mainMenuSfx.select2.play();
    matchingApp(set);
}
// function startSpellingTouchApp() {
//   mainMenuSfx.select2.play();
//   spellingTouchApp();
// }
// function startSpellingWritingApp() {
//   mainMenuSfx.select2.play();
//   spellingWritingApp();
// }
// Number Fluency App
function startNumberFluencyApp(set) {
  mainMenuSfx.select2.play();
  numberFluencyApp(set);
}

// Writing App
function startWritingApp(set) {
  mainMenuSfx.select2.play();
  writingApp(set);
}
}

const appLauncher = new AppLauncher

export {

};
