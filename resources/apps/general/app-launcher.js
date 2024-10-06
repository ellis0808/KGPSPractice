import { cardTouchApp } from "../card-touch/card-touch-index.js";
import { matchingApp } from "../matching/matching-index.js";
import { numberFluencyApp } from "../numbers/numbers-fluency/numbers-fluency.js";
import { writingApp } from "../writing/writing.js";
// import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

// Card Touch App
function startCardTouchApp(set) {
  mainMenuSfx.select2.play();
  if (set === "capitals") {
    cardTouchApp("capitals");
  } else if (set === "lowercase") {
    cardTouchApp("lowercase");
  } else if (set === "sightwords1") {
    cardTouchApp("sightwords1");
  } else if (set === "sightwords2") {
    cardTouchApp("sightwords2");
  } else if (set === "sightwords3") {
    cardTouchApp("sightwords3");
  } else if (set === "letter-sounds-asmf") {
    cardTouchApp("letter-sounds-asmf");
  }
}

// Matching App
function startMatchingApp(set) {
  mainMenuSfx.select2.play();
  if (set === "alphabet") {
    matchingApp(set);
  }
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
  if (set === 1) {
    numberFluencyApp(1);
  } else if (set === 2) {
    numberFluencyApp(2);
  } else if (set === 3) {
    numberFluencyApp(3);
  } else if (set === 4) {
    numberFluencyApp(5);
  } else if (set === 5) {
    numberFluencyApp(5);
  }
}

// Writing App
// function startWritingApp(set) {
//   mainMenuSfx.select2.play();
//   writingApp(set);
// }

export {
  startCardTouchApp,
  startMatchingApp,
  // startSpellingTouchApp,
  startNumberFluencyApp,
  startWritingApp,
};
