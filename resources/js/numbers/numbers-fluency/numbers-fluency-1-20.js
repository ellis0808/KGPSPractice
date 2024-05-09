/* Imports */
import { mainContainer, stylesheet } from "../../../utilities/variables.js";
import { score } from "../../../utilities/score-object.js";
import {
  updateNegativeCount,
  updatePositiveCount,
} from "../../../utilities/update-score.js";

import { scoreDisplay } from "../../alphabet/alphabet-card-touch/alphabet-card-touch-index.js";

import { displayMainPage } from "../../general/start-main-app.js";
import {
  removeMenuPage,
  restoreMainMenu,
} from "../../../utilities/main-menu-display-toggle.js";
import { BufferLoader } from "../../../utilities/buffer-loader.js";
import { finishedLoading } from "./audio.js";

let interval = 3000; // initial condition
let run;
function startInterval() {
  run = setInterval(speakingInterval, interval); // start setInterval as "run"
  return run;
}

let currentArray = [];
let round = 3;
let currentItem;
let randNumber;
function arrayGenerator() {
  currentArray.length = 0;
  if (round === 1) {
    for (let i = 0; i < 7; ++i) {
      randNumber = Math.floor(Math.random() * 10 + 1);
      currentArray.push(randNumber);
    }
    ++round;
    return;
  }
  if (round === 2) {
    for (let i = 0; i < 10; ++i) {
      randNumber = Math.floor(Math.random() * 10 + 1);
      currentArray.push(randNumber);
    }
    ++round;
    return;
  }
  if (round === 3) {
    for (let i = 0; i < 17; ++i) {
      randNumber = Math.floor(Math.random() * 10 + 1);
      currentArray.push(randNumber);
    }
    ++round;
    return;
  }
  if (round === 4) {
    for (let i = 0; i < 25; ++i) {
      randNumber = Math.floor(Math.random() * 10 + 1);
      currentArray.push(randNumber);
    }
    ++round;
    return;
  }
}
let loop = 0;
function speakingInterval() {
  getCurrentItem();
  clearInterval(run);

  // change interval
  interval = interval - 300;
  if (interval < 1500) {
    interval = 1500;
  }

  speak(currentItem);
  run = setInterval(speakingInterval, interval, currentItem);
  ++loop;

  //stop interval
  if (loop === currentArray.length) {
    clearInterval(run);
  }
}
// function chooseCurrentItem() {
//   return randNumber;
// }

/* AUDIO */
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let source = null;

function getCurrentItem() {
  let newRandNumber = Math.floor(Math.random() * currentArray.length);
  currentItem = currentArray[newRandNumber].toString();
  return currentItem;
}
function speak(currentItem) {
  const synth = window.speechSynthesis;
  let itemToBeSpoken = new SpeechSynthesisUtterance(currentItem);
  synth.speak(itemToBeSpoken);
}

/* GRID */

function createGrid() {
  for (let i = 0; i < gridSize; ++i) {
    const box = document.createElement("div");
    box.classList.add("box", "btn");
    box.setAttribute("id", `box${i}`);
    if (i < 10) {
      box.classList.add("item", "under11");
    } else {
      box.classList.add("item", "under21");
    }
    box.setAttribute("item", `${i + 1}`);
    box.textContent = `${i + 1}`;
    box.addEventListener("click", userTouch);
    grid.appendChild(box);
  }
}

/* 
*****************
GENERAL VARIABLES
*****************
*/

/* SCORING */
const correctAnswerPoints = 1;
const incorrectAnswerPoints = 1;

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
const mainDisplay = document.createElement("div");
mainDisplay.classList.add("main-display");

/* Variables */

const gridSize = 20;

/* 
*****************
Main App
*****************
*/

/* Starts Main App (exported to resources/js/general/app-launcher.js) */
function numberFluency1to20App() {
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

  stylesheet.setAttribute(
    "href",
    "../../resources/css/number-fluency-1-20.css"
  );
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
    if (appContainer.contains(mainDisplay)) {
      appContainer.removeChild(mainDisplay);
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
  grid.classList.remove("blur");
  timer.classList.remove("blur");
  scoreDisplay.classList.remove("blur");

  createGrid();
  arrayGenerator();
  startInterval();
  setTimeout(() => {
    appContainer.appendChild(scoreDisplay);
    appContainer.appendChild(timer);
    appContainer.appendChild(mainDisplay);
    appContainer.appendChild(btnContainer3);
  }, 600);
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
const roundTime = 30;
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

function userTouch(event) {
  let currentAnswer = event.target.getAttribute("item");
  checkAnswer(currentAnswer);
}

function checkAnswer(currentAnswer) {
  if (currentAnswer === currentItem) {
    const bufferLoader = new BufferLoader(
      audioContext,
      ["resources/audio/sfx/クイズ正解5.mp3"],
      finishedLoading
    );
    bufferLoader.load();

    updatePositiveCount(correctAnswerPoints);
  } else {
    const bufferLoader = new BufferLoader(
      audioContext,
      ["resources/audio/sfx/クイズ不正解2.mp3"],
      finishedLoading
    );
    bufferLoader.load();
    updateNegativeCount(incorrectAnswerPoints);
  }
}

export { numberFluency1to20App };
