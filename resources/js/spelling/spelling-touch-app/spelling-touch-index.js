/* Imports */
import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../../utilities/variables.js";
import { BufferLoader } from "../../../utilities/buffer-loader.js";
import { audioContext, finishedLoading, speak } from "./audio.js";
import { score } from "../../../utilities/score-object.js";
import {
  updateNegativeCount,
  updatePositiveCount,
} from "../../../utilities/update-score.js";

import { scoreDisplay } from "../../alphabet/alphabet-card-touch/alphabet-card-touch.js";
import { alphabet } from "../../alphabet/alphabet-card-touch/alphabet.js";

// import { speak } from "./audio.js";
import {
  displayMainPage,
  div4,
  startMainApp,
} from "../../general/start-main-app.js";
import {
  removeMenuPage,
  restoreMainMenu,
} from "../../../utilities/main-menu-display-toggle.js";
import { targetWordsArray } from "./target-words.js";

/* 
*****************
GENERAL VARIABLES
*****************
*/

// Main App Container
const appContainer = document.createElement("div");
appContainer.classList.add("container");
appContainer.classList.add("letter-matching-app");

// Button Container 1 (Timer & Score Display)
const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "1:00";

const grid = document.createElement("div");
grid.classList.add("grid");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
btnContainer2.classList.add("card-touch-app");
const startBtn = document.createElement("button");
startBtn.setAttribute("id", "start-btn");
const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startNewSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

// const container = document.querySelector(".container");
const letterDisplay = document.createElement("div");
// const streakCount = document.createElement("streak");
// streakCount.classList.add('streak')
// let streak = 0;
const getBoxes = () => document.querySelectorAll(".box");
const boxes = getBoxes();

function updateBoxes() {
  const updatedBoxes = getBoxes();
}
let selectedBoxes = document.querySelectorAll("[class^='selected']");

let word =
  targetWordsArray[Math.floor(Math.random() * targetWordsArray.length)];

const gridSize = 25;
const targetWord = [];
const userWord = [];
const userSelectedLetters = [];
const combinedLettersArray = [];
const currentLetters = [];
const comma = ",";

/* 
*****************
Main App
*****************
*/

function spellingTouchApp() {
  mainContainer.appendChild(appContainer);
  appContainer.appendChild(btnContainer2);
  btnContainer2.appendChild(startBtn);
  startBtn.textContent = "Start";
  appContainer.appendChild(grid);
  grid.classList.add("gridHide");

  removeMenuPage();

  stylesheet.setAttribute("href", "../../resources/css/spelling-touch.css");
  displayStartBtn();

  score.resetScore();
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");
}

function endApp() {
  endSession();
  setTimeout(() => {
    appContainer.removeChild(scoreDisplay);
    appContainer.removeChild(timer);
    mainContainer.removeChild(appContainer);
    stylesheet.setAttribute("href", "../resources/css/styles.css");
    displayMainPage();
    setTimeout(restoreMainMenu, 600);
  }, 500);
}
/* 
*****************
Sessions & Rounds
*****************
*/

function displayStartBtn() {
  if (startBtn.classList.contains("no-touch")) {
    startBtn.classList.remove("no-touch");
    startBtn.classList.remove("spinfade");
  }
  startBtn.addEventListener("click", startSession);
  score.resetScore();
}
function endSession() {
  clearBoard();
  appContainer.classList.add("hide");
  score.resetScore();
  document.querySelector(".end-messages-container").remove();
}
function startSession() {
  startBtn.classList.add("no-touch");
  startBtn.classList.add("spinfade");
  setTimeout(startNewRound, 950);
  setTimeout(() => {
    startTimer();
  }, 1000);
}
function startNewSession() {
  tryAgainBtn.classList.add("no-touch");
  finishBtn.classList.add("no-touch");
  setTimeout(() => {
    document.querySelector(".end-messages-container").remove();
    clearBoard();
    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    grid.classList.remove("blur");
    timer.classList.remove("blur");
    scoreDisplay.classList.remove("blur");
  }, 50);

  setTimeout(startSession, 300);
  setTimeout(() => {
    enableTouch();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 4000);
}

function startNewRound() {
  clearAll();

  grid.classList.remove("blur");
  timer.classList.remove("blur");
  scoreDisplay.classList.remove("blur");

  createGrid();

  appContainer.appendChild(scoreDisplay);
  appContainer.appendChild(timer);

  getNewWord();
  setTimeout(() => {
    updateBoxes();
    createFinalLettersArray();
    displayLetters();
    speak();
  }, 1000);

  setTimeout(() => {
    enableTouch();
  }, 300);
  setTimeout(() => {
    grid.classList.remove("gridHide");
  }, 100);
}
function start() {
  clearAll();
  createGrid();
  getNewWord();
  updateBoxes();
  createFinalLettersArray();
  displayLetters();
  speak();
}

function displayFinalScore() {
  const endGameMessagesContainer = document.createElement("div");
  endGameMessagesContainer.classList.add("end-messages-container");
  appContainer.appendChild(endGameMessagesContainer);
  const finalScoreAlert = document.createElement("div");
  finalScoreAlert.classList.add("final-score-alert");
  finalScoreAlert.innerText = `${score.currentScore} points!`;
  setTimeout(() => {
    endGameMessagesContainer.appendChild(finalScoreAlert);
    setTimeout(() => {
      finalScoreAlert.classList.add("flip");
    });
  }, 400);
}

/* 
*******
III. TIMER
*******
*/

let time;
const roundTime = 60;
function startTimer() {
  time = roundTime;
  setTimeout(displayTimer, 500);
}
function displayTimer() {
  const countDown = setInterval(() => {
    --time;
    if (time < 10) {
      timer.textContent = `0:0${time}`;
    } else {
      timer.textContent = `0:${time}`;
    }
    if (time < 0) {
      timer.textContent = "0:00";
      clearInterval(countDown);
      disableTouch();
      timer.classList.add("wobble");
      timer.classList.remove("wobble");
      timer.classList.add("wobble");
      timer.classList.remove("wobble");
      timer.classList.add("wobble");
      roundOver();
    }
  }, 1000);
}

function resetTimer() {
  timer.innerText = "1:00";
  timer.classList.remove("wobble");
}
function disableTouch() {
  const allTargets = document.querySelectorAll(".dot,.dot-enclosure");
  allTargets.forEach((target) => {
    target.classList.add("no-touch");
  });
}
function enableTouch() {
  const allTargets = document.querySelectorAll(".dot,.dot-enclosure");
  allTargets.forEach((target) => {
    target.classList.remove("no-touch");
  });
}

// BUTTON VARIABLES

// const startBtn = document.createElement("button");
// startBtn.setAttribute("id", "start-btn");
// const checkBtn = document.querySelector(".check-btn");
// const repeatBtn = document.querySelector(".repeat-btn");

// CREATE GRID
function createGrid() {
  for (let i = 0; i < gridSize; ++i) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", `box${i}`);
    grid.appendChild(box);
  }
}

// GET WORDS

function getNewWord() {
  targetWord.length = 0;
  currentLetters.length = 0;
  word = targetWordsArray[Math.floor(Math.random() * targetWordsArray.length)];
  targetWord.push(word);
  currentLetters.push(...targetWord[0].split(comma));
  return word;
}

// POPULATE GRID WORDS AND LETTERS
function createFinalLettersArray() {
  updateBoxes();
  console.log(boxes);
  pushTargetLetters();
  generateRandomLetter();
}

function pushTargetLetters() {
  combinedLettersArray.length = 0;
  for (let i = 0; i < currentLetters[0].split("").length; ++i) {
    combinedLettersArray.push(
      currentLetters[0].split("")[i].split(comma).toString()
    );
  }
}
function generateRandomLetter() {
  const maxElements = gridSize - currentLetters[0].split("").length;
  for (let i = 0; i < maxElements; i++) {
    combinedLettersArray.push(
      `${
        alphabet[
          Math.floor(
            Math.random() *
              (alphabet.length - currentLetters[0].split("").length)
          )
        ]
      }`
    );
  }
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function displayLetters() {
  updateBoxes();

  const shuffledArray = shuffleArray(combinedLettersArray);
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box, i) => {
    console.log("test");
    // const span = document.createElement("span");
    // const letter = box.appendChild(span);
    const randomLetter = shuffledArray[i];

    box.classList.add("letter");
    box.setAttribute("letter", randomLetter);
    box.textContent = randomLetter;
    box.addEventListener("click", letterTouch);
  });
}

// TOUCH FUNCTIONALITY

// Buttons
// startBtn.addEventListener("click", start);
// checkBtn.addEventListener("click", checkSpelling);
// repeatBtn.addEventListener("click", speak);

// Letter Selection
function letterTouch(e) {
  const oldBoxes = document.querySelectorAll(".newbox");
  const previousBoxes = document.querySelectorAll("[class^='previous']"); // selects every class that begins with 'previous'

  //  This takes the 'current selection' glow away
  if (e.currentTarget.parentElement.classList.contains("current")) {
    userSelectedLetters.pop(e.currentTarget.id);
    deselectBox(e);
    letterDisplay.textContent = `${userSelectedLetters.join("")}`;
  } else if (!e.currentTarget.parentElement.classList.contains("current")) {
    oldBoxEffect(oldBoxes);
    userSelectedLetters.push(e.currentTarget.id);
    letterDisplay.setAttribute("style", "max-width: 18ch;");
    letterDisplay.textContent = "";
    letterDisplay.textContent = `${userSelectedLetters.join("")}`;
    selectBox(e);

    bufferLoader = new BufferLoader(
      audioContext,
      ["./SFX/カーソル移動1.mp3"],
      finishedLoading
    );
    bufferLoader.load();
  }
}

//

function selectBox(e) {
  current(e);
  addSelectedClassToBox(e);
}
function deselectBox(e) {
  removeCurrent(e);
  removeSelectedClassFromBox(e);
  reselectPreviousBox();
}

function current(e) {
  e.currentTarget.classList.add("current");
  pulse(e);
  newBoxEffect(e);
}

function removeCurrent(e) {
  e.currentTarget.classList.remove("current");
  noPulse(e);
  noGlow(e);
}

function addSelectedClassToBox(e) {
  selectedBoxes = document.querySelectorAll("div[class*='selected'");
  e.currentTarget.classList.add(`selected${selectedBoxes.length + 1}`);
  return selectedBoxes;
}

function removeSelectedClassFromBox(e) {
  selectedBoxes = document.querySelectorAll("div[class*='selected'");
  e.currentTarget.classList.remove(`selected${selectedBoxes.length}`);
  selectedBoxes = document.querySelectorAll("div[class*='selected'");
  return selectedBoxes;
}

function removeAllSelections() {
  selectedBoxes = document.querySelectorAll("div[class*='selected'");
  selectedBoxes.forEach((box) => {
    for (let i = 0; i < 25; i++) {
      box.classList.remove(`selected${i}`);
    }
  });
}

// // moves current selection back to previous box
function reselectPreviousBox() {
  selectedBoxes = document.querySelectorAll("div[class*='selected'");
  let highestSelectedBox = document.querySelector(
    `.selected${selectedBoxes.length}`
  );
  selectedBoxes = document.querySelectorAll("div[class*='selected'");
  if (highestSelectedBox) {
    highestSelectedBox.classList.remove("oldbox");
    highestSelectedBox.classList.remove("oldboxglow");
    highestSelectedBox.classList.add("current");
    highestSelectedBox.classList.add("newbox");
  }

  return selectedBoxes;
}

// Add effects

// Letter Pulse Effect
function pulse(e) {
  e.currentTarget.preventDefault;
  e.currentTarget.classList.remove("pulse");
  void e.currentTarget.offsetWidth;
  e.currentTarget.classList.add("pulse");
}

// Last Selected Box Glow Effect
function newBoxEffect(e) {
  e.currentTarget.preventDefault;
  e.currentTarget.classList.remove("newbox");
  void e.currentTarget.offsetWidth;
  e.currentTarget.classList.add("newbox");
  e.currentTarget.classList.add("current");
}

// Previously Selected Box(es) Glow Effect
function oldBoxEffect(oldBoxes) {
  oldBoxes.forEach((oldBox) => {
    oldBox.preventDefault;
    oldBox.classList.remove("current");
    oldBox.classList.remove("newbox");
    void oldBox.offsetWidth;
    oldBox.classList.add("oldbox");
    oldBox.classList.add("oldboxglow");
  });
}
// Remove effects
function noPulse(e) {
  e.currentTarget.preventDefault;
  e.currentTarget.classList.remove("pulse");
}
function noGlow(e) {
  if (e.currentTarget.classList.contains("newbox")) {
    e.currentTarget.preventDefault;
    e.currentTarget.classList.remove("newbox");
  } else if (e.currentTarget.classList.contains("oldbox")) {
    e.currentTarget.preventDefault;
    e.currentTarget.classList.remove("oldbox");
  }
}

function clearEffects() {
  removeAllSelections();
  const letters = document.querySelectorAll(".letter");
  letters.forEach((item) => {
    item.classList.remove("pulse");
    item.classList.remove("oldbox");
    item.classList.remove("oldboxglow");
    item.classList.remove("newbox");
    item.classList.remove("current");
  });
  boxes.forEach((box) => {
    box.classList.remove("oldbox");
    box.classList.remove("newbox");
    box.classList.remove("current");
    box.classList.remove("oldboxglow");
  });
}

function clearGrid() {
  const oldLetters = document.querySelectorAll(".letter");
  oldLetters.forEach((item) => {
    item.remove();
  });
  userSelectedLetters.length = 0;
  removeAllSelections();
}

function newRound() {
  clearGridAndEffects();
  getNewWord();
  updateBoxes();
  createFinalLettersArray();
  displayLetters();
  speak();
}

function updateStreak() {
  streakCount.textContent = streak;
}
function clearDisplays() {
  //   updateStreak();
  clearUserSelectedLetters();
  clearEffects();
}
function clearUserSelectedLetters() {
  userSelectedLetters.length = 0;
  letterDisplay.textContent = "";
}
function clearGridAndEffects() {
  clearEffects();
  clearGrid();
  clearUserSelectedLetters();
}
function clearAll() {
  //   updateStreak();
  clearGridAndEffects();
}
function checkSpelling() {
  if (userSelectedLetters.join("") === word) {
    correctSFX.play();
    streak++;
    // updateStreak();
    setTimeout(function () {
      alert(`Correct! The word is ${word}!`);
    }, 500);
    setTimeout(newRound, 1500);
  } else {
    incorrectSFX.play();
    alert(`Sorry, that is not the correct spelling. Listen again:`);
    speak();
    streak = 0;
    clearDisplays();
    removeAllSelections();
  }
}

export { word, spellingTouchApp };
