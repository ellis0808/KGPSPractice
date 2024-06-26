import { alphabetCardTouchApp } from "../alphabet/alphabet-card-touch/alphabet-card-touch-index.js";
import { alphabetMatchingApp } from "../alphabet/alphabet-matching/alphabet-matching-index.js";
import { numberFluency1to20App } from "../numbers/numbers-fluency/numbers-fluency-1-20.js";
import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

function startAlphabetCardTouchApp() {
  mainMenuSfx.select2.play();
  alphabetCardTouchApp();
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
function startNumberFluency1to20App() {
  mainMenuSfx.select2.play();
  numberFluency1to20App();
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
  startNumberFluency1to20App,
};
