/* Imports */
import { mainContainer, stylesheet } from "../../../utilities/variables.js";
import { BufferLoader } from "../../../utilities/buffer-loader.js";
import { audioContext, finishedLoading, speak } from "./audio.js";
import { score } from "../../../utilities/score-object.js";
import {
  updateNegativeCount,
  updatePositiveCount,
} from "../../../utilities/update-score.js";

import { scoreDisplay } from "../../alphabet/alphabet-card-touch/alphabet-card-touch-index.js";
import { alphabet } from "../../alphabet/alphabet-card-touch/alphabet.js";

import { displayMainPage } from "../../general/start-main-app.js";
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

/* SCORING */
const correctAnswerPoints = 5;
const incorrectAnswerPoints = 2;

/* Main App Container */
const appContainer = document.createElement("div");
appContainer.classList.add("container");
appContainer.classList.add("spelling-touch-app");

/* Common UI Elements */
const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "1:00";
const grid = document.createElement("div");
grid.classList.add("grid");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3");
const startBtn = document.createElement("div");
startBtn.setAttribute("id", "start-btn");
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("card-touch-app");
exitBtn.addEventListener("click", endApp);
const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startNewSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

/* App Specific Display Elements */
const letterDisplay = document.createElement("div");
letterDisplay.classList.add("letter-display");
const checkBtn = document.createElement("div");
checkBtn.classList.add("check-btn");
checkBtn.setAttribute("id", "check-btn");
checkBtn.textContent = "Check";
checkBtn.addEventListener("click", checkSpelling);
const repeatBtn = document.createElement("div");
repeatBtn.classList.add("repeat-btn");
repeatBtn.setAttribute("id", "repeat-btn");
repeatBtn.textContent = "Repeat";
repeatBtn.addEventListener("click", speak);
const deleteBtn = document.createElement("div");
deleteBtn.classList.add("delete-btn");
deleteBtn.setAttribute("id", "delete-btn");
deleteBtn.textContent = "Erase";
deleteBtn.addEventListener("click", deleteLastEntry);
// const clearBtn = document.createElement("div");
// clearBtn.classList.add("clear-btn");
// clearBtn.setAttribute("id", "clear-btn");
// clearBtn.textContent = "Erase All";
// clearBtn.addEventListener("click", deleteAllEntries);

/* Variables */

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
const vowelsAndConsonants = [
  "a",
  "e",
  "i",
  "o",
  "u",
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

/* 
*****************
Main App
*****************
*/

/* Starts Main App (exported to resources/js/general/app-launcher.js) */
function spellingTouchApp() {
  stylesheet.setAttribute("href", "../../resources/css/spelling-touch.css");

  setTimeout(() => {
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(btnContainer2);
    btnContainer2.appendChild(startBtn);
    startBtn.textContent = "Start";
    btnContainer2.appendChild(exitBtn);
    exitBtn.textContent = "\u2716";
    appContainer.appendChild(grid);
    grid.classList.add("gridHide");
  }, 0);

  displayStartBtn();

  removeMenuPage();

  score.resetScore();
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");
}

/* Removes Main App and Returns to Main Menu*/
function endApp() {
  endSession();
  setTimeout(() => {
    if (appContainer.contains(letterDisplay)) {
      appContainer.removeChild(letterDisplay);
      btnContainer3.removeChild(repeatBtn);
      btnContainer3.removeChild(checkBtn);
      btnContainer3.removeChild(deleteBtn);
      appContainer.removeChild(timer);
      appContainer.removeChild(scoreDisplay);
    }
    mainContainer.removeChild(appContainer);
    stylesheet.setAttribute("href", "../resources/css/styles.css");
    displayMainPage();
    setTimeout(restoreMainMenu, 100);
  }, 500);
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
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
    exitBtn.classList.remove("no-touch");
    exitBtn.classList.remove("hide2");
  }
  startBtn.addEventListener("click", startSession);
  score.resetScore();
}
function endSession() {
  clearGridAndEffects();
  appContainer.classList.add("hide");
  score.updateUserScore();
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
}
function startSession() {
  startBtn.classList.add("no-touch");
  startBtn.classList.remove("intro");
  startBtn.classList.add("spinfade");
  exitBtn.classList.add("no-touch");
  exitBtn.classList.add("hide2");
  exitBtn.classList.remove("intro");
  setTimeout(startNewRound, 950);
  setTimeout(resetTimer, 500);
  setTimeout(startTimer, 1000);
}
function startNewSession() {
  tryAgainBtn.classList.add("no-touch");
  finishBtn.classList.add("no-touch");
  setTimeout(() => {
    document.querySelector(".end-messages-container").remove();
    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    grid.classList.remove("blur");
    timer.classList.remove("blur");
    btnContainer3.classList.remove("blur");
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
  btnContainer3.classList.remove("blur");
  scoreDisplay.classList.remove("blur");
  letterDisplay.classList.remove("blur");

  createGrid();

  setTimeout(() => {
    appContainer.appendChild(scoreDisplay);
    appContainer.appendChild(timer);
    appContainer.appendChild(letterDisplay);
    appContainer.appendChild(btnContainer3);
    btnContainer3.appendChild(checkBtn);
    btnContainer3.appendChild(repeatBtn);
    btnContainer3.appendChild(deleteBtn);

    getNewWord();
    updateBoxes();
    speak();
  }, 400);

  setTimeout(() => {
    enableTouch();
  }, 300);
  setTimeout(() => {
    grid.classList.remove("gridHide");
  }, 300);
}

function roundOver() {
  disableTouch();
  displayFinalScore();
  setTimeout(disableTouch, 500);
  setTimeout(disableTouch, 1000);
  displayTryAgainAndFinishBtns();
  grid.classList.add("blur");
  timer.classList.add("blur");
  scoreDisplay.classList.add("blur");
  btnContainer3.classList.add("blur");
  letterDisplay.classList.add("blur");
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

function displayTryAgainAndFinishBtns() {
  const endGameMessagesContainer = document.querySelector(
    ".end-messages-container"
  );

  setTimeout(() => {
    endGameMessagesContainer.appendChild(tryAgainBtn);
    tryAgainBtn.classList.add("slideinfromleft");
    endGameMessagesContainer.appendChild(finishBtn);
    finishBtn.classList.add("slideinfromright");
  }, 1000);
}

/* 
*******
TIMER
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
  const allTargets = document.querySelectorAll(".box");
  allTargets.forEach((target) => {
    target.classList.add("no-touch");
  });
}
function enableTouch() {
  const allTargets = document.querySelectorAll(".box");
  allTargets.forEach((target) => {
    target.classList.remove("no-touch");
  });
}

// CREATE GRID
function createGrid() {
  for (let i = 0; i < gridSize; ++i) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", `box${i}`);
    if (i > 4) {
      box.classList.add("letter", "vowel");
    } else {
      box.classList.add("letter", "consonant");
    }
    box.setAttribute("letter", `${vowelsAndConsonants[i]}`);
    box.textContent = `${vowelsAndConsonants[i]}`;
    box.addEventListener("click", letterTouch);
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

/* POPULATE GRID WORDS AND LETTERS */

//sends the target word letters and random letters to the final array to be displayed
function createFinalLettersArray() {
  pushVowelLetters();
  updateBoxes();
}

// clears the combined letters array and feeds in the letters of the latest word to it
function pushVowelLetters() {
  let i;
  for (i = 0; i < vowelsAndConsonants.length; ++i) {
    let box = document.getElementById(`box${i}`);
    box.classList.add("letter");
    box.setAttribute("letter", `${vowels[i]}`);
    box.textContent = `${vowels[i]}`;
    console.log(box);
    box.addEventListener("click", letterTouch);
  }
}
/*
*******************
TOUCH FUNCTIONALITY
*******************
*/

/* LETTER SELECTION */

function letterTouch(e) {
  userSelectedLetters.push(e.currentTarget.getAttribute("letter"));

  letterDisplay.textContent = "";
  letterDisplay.textContent = `${userSelectedLetters.join("")}`;
  const bufferLoader = new BufferLoader(
    audioContext,
    ["resources/audio/sfx/カーソル移動1.mp3"],
    finishedLoading
  );
  bufferLoader.load();
}

/* LETTER DELETION */
function deleteLastEntry() {
  userSelectedLetters.pop();
  letterDisplay.textContent = `${userSelectedLetters.join("")}`;
  const bufferLoader = new BufferLoader(
    audioContext,
    ["resources/audio/sfx/カーソル移動2.mp3"],
    finishedLoading
  );
  bufferLoader.load();
}

function clearGrid() {
  const oldLetters = document.querySelectorAll(".letter");
  oldLetters.forEach((item) => {
    item.remove();
  });
  userSelectedLetters.length = 0;
}

function clearDisplays() {
  clearUserSelectedLetters();
}
function clearUserSelectedLetters() {
  userSelectedLetters.length = 0;
  letterDisplay.textContent = "";
}
function clearGridAndEffects() {
  clearGrid();
  clearUserSelectedLetters();
}
function clearAll() {
  clearGridAndEffects();
}

/* ANSWER VALIDATION */
function checkSpelling() {
  if (userSelectedLetters.join("") === word) {
    const bufferLoader = new BufferLoader(
      audioContext,
      ["resources/audio/sfx/クイズ正解5.mp3"],
      finishedLoading
    );
    bufferLoader.load();

    updatePositiveCount(correctAnswerPoints);
    setTimeout(startNewRound, 1500);
  } else {
    const bufferLoader = new BufferLoader(
      audioContext,
      ["resources/audio/sfx/クイズ不正解2.mp3"],
      finishedLoading
    );
    bufferLoader.load();
    updateNegativeCount(incorrectAnswerPoints);
    setTimeout(function () {
      alert(`Sorry, that is not the correct spelling. Listen again:`);
    }, 800);
    speak();
    clearDisplays();
  }
}

export { word, spellingTouchApp };
