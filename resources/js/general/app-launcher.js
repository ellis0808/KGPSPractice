import { alphabetCapitalsCardTouchApp } from "../alphabet/alphabet-card-touch/alphabet-card-touch-capitals-index.js";
import { alphabetLowercaseCardTouchApp } from "../alphabet/alphabet-card-touch/alphabet-card-touch-lowercase-index.js";
import { alphabetMatchingApp } from "../alphabet/alphabet-matching/alphabet-matching-index.js";
import { numberFluency1to20App } from "../numbers/numbers-fluency/numbers-fluency-1-20.js";
import { spellingTouchApp } from "../spelling/spelling-touch-app/spelling-touch-index.js";
import { mainMenuSfx } from "./start-main-app.js";

function startCapitalsAlphabetCardTouchApp() {
  mainMenuSfx.select2.play();
  alphabetCapitalsCardTouchApp();
}
function startLowercaseAlphabetCardTouchApp() {
  mainMenuSfx.select2.play();
  alphabetLowercaseCardTouchApp();
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
  startCapitalsAlphabetCardTouchApp,
  startLowercaseAlphabetCardTouchApp,
  startAlphabetMatchingApp,
  startSpellingTouchApp,
  startNumberFluency1to20App,
};
