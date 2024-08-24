import { cardTouchApp } from "../card-touch/card-touch-index.js";
import { alphabetMatchingApp } from "../matching/matching-index.js";
import { numberFluencyApp } from "../numbers/numbers-fluency/numbers-fluency.js";
import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

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
  }
}
function startMatchingApp() {
  mainMenuSfx.select2.play();
  alphabetMatchingApp();
}
function startSpellingTouchApp() {
  mainMenuSfx.select2.play();
  spellingTouchApp();
}
function startSpellingWritingApp() {
  mainMenuSfx.select2.play();
  spellingWritingApp();
}
function startNumberFluencyApp(set) {
  mainMenuSfx.select2.play();
  if (set === 0) {
    numberFluencyApp(0);
  } else if (set === 1) {
    numberFluencyApp(1);
  } else if (set === 2) {
    numberFluencyApp(2);
  } else if (set === 3) {
    numberFluencyApp(3);
  } else if (set === 4) {
    numberFluencyApp(4);
  }
}
function startNumberRecognitionApp() {
  mainMenuSfx.select2.play();
  numberRecognitionApp();
}
function startNumberWritingApp() {
  mainMenuSfx.select2.play();
  numberWritingApp();
}
function startnumberMathApp() {
  mainMenuSfx.select2.play();
  numberMathApp();
}

export {
  startCardTouchApp,
  startMatchingApp,
  startSpellingTouchApp,
  startNumberFluencyApp,
};
