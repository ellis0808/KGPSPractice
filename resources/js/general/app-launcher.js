import { alphabetCardTouchApp } from "../alphabet/alphabet-card-touch/alphabet-card-touch-index.js";
import { alphabetMatchingApp } from "../alphabet/alphabet-matching/alphabet-matching-index.js";
import { numberFluencyApp } from "../numbers/numbers-fluency/numbers-fluency.js";
import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

function startAlphabetCardTouchApp(capitals) {
  mainMenuSfx.select2.play();
  if (capitals) {
    alphabetCardTouchApp(capitals);
  } else {
    alphabetCardTouchApp();
  }
}
function startAlphabetMatchingApp() {
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
function startNumberFluencyApp(style) {
  mainMenuSfx.select2.play();
  if (style === 0) {
    numberFluencyApp(0);
  } else if (style === 1) {
    numberFluencyApp(1);
  } else if (style === 2) {
    numberFluencyApp(2);
  } else if (style === 3) {
    numberFluencyApp(3);
  } else if (style === 4) {
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
  startAlphabetCardTouchApp,
  startAlphabetMatchingApp,
  startSpellingTouchApp,
  startNumberFluencyApp,
};
