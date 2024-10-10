import { cardTouchApp } from "../card-touch/card-touch-index.js";
import { matchingApp } from "../matching/matching-index.js";
import { numberFluencyApp } from "../numbers/numbers-fluency/numbers-fluency.js";
import { writingApp } from "../writing/writing.js";
// import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

// Card Touch App
function startCardTouchApp(set) {
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

export {
  startCardTouchApp,
  startMatchingApp,
  // startSpellingTouchApp,
  startNumberFluencyApp,
  startWritingApp,
};
