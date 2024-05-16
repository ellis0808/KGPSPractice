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

function determineInterval() {
  console.log(round);
  if (round === 1) {
    interval = interval;
  } else if (round > 1) {
    interval = interval * 0.9;
  }
  // return interval;
}
let interval = 2500;
let run;
let currentArray = [];
let round = 0;
let maxRounds = 10;
let currentItem;
let randNumber;
let loop = 0;
let arrayItemCounter = 0;
let numberOfWrongAnswers = 0;
let numberOfRightAnswers = 0;
let maxWrongAnswers = 5;

function startInterval() {
  // run = setInterval(speakingInterval, interval); // start setInterval as "run"
  // return run;
  // if (round === 1) {
  //   interval = round1Ineterval;
  // }
  // if (round === 2) {
  //   interval = round2Ineterval;
  // }
  // if (round === 3) {
  //   interval = round3Ineterval;
  // }
  // if (round === 4) {
  //   interval = round4Ineterval;
  // }
  // if (round === 5) {
  //   interval = round5Ineterval;
  // }
  console.log(interval);
  run = setInterval(speakingInterval, interval); // start setInterval as "run"
  return run;
}

function arrayGenerator() {
  currentArray.length = 0;
  // if (round === 1) {
  currentArray.length = 0;
  for (let i = 0; i < 10; ++i) {
    randNumber = Math.floor(Math.random() * 20 + 1);
    currentArray.push(randNumber);
  }
  console.log(currentArray);
  return;
  // }
  // if (round === 2) {
  //   console.log("test 2");
  //   currentArray.length = 0;
  //   for (let i = 0; i < 10; ++i) {
  //     randNumber = Math.floor(Math.random() * 20 + 1);
  //     currentArray.push(randNumber);
  //   }
  //   console.log(currentArray);
  //   return;
  // }
  // if (round === 3) {
  //   console.log("test 3");
  //   currentArray.length = 0;
  //   for (let i = 0; i < 17; ++i) {
  //     randNumber = Math.floor(Math.random() * 20 + 1);
  //     currentArray.push(randNumber);
  //   }
  //   console.log(currentArray);
  //   return;
  // }
  // if (round === 4) {
  //   console.log("test 4");
  //   currentArray.length = 0;
  //   for (let i = 0; i < 25; ++i) {
  //     randNumber = Math.floor(Math.random() * 20 + 1);
  //     currentArray.push(randNumber);
  //   }
  //   console.log(currentArray);
  //   return;
  // }
}
function speakingInterval() {
  getCurrentItem();
  // clearInterval(run);

  // change interval
  // interval = interval - 300;
  // if (interval < 1500) {
  //   interval = 1500;
  // }

  speak(currentItem);
  // run = setInterval(speakingInterval, interval, currentItem);
  ++loop;

  //stop interval
  if (loop === currentArray.length) {
    clearInterval(run);
    setTimeout(newRound, 3000);
  }
}
function resetLoop() {
  loop = 0;
  return loop;
}
function resetArrayItemCounter() {
  arrayItemCounter = 0;
  return arrayItemCounter;
}
function resetPenalties() {
  numberOfWrongAnswers = 0;
  return numberOfWrongAnswers;
}
function resetInterval() {
  interval = 0;
  return interval;
}
// function chooseCurrentItem() {
//   return randNumber;
// }

/* AUDIO */
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let source = null;

function getCurrentItem() {
  currentItem = currentArray[arrayItemCounter].toString();
  ++arrayItemCounter;
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
timer.textContent = `Round 1`;
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
const answerDisplay = document.createElement("div");
answerDisplay.classList.add("answer-display");

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
}
function startNewSession() {
  tryAgainBtn.classList.add("no-touch");
  finishBtn.classList.add("no-touch");
  resetRoundNumberAndRoundDisplay();
  setTimeout(() => {
    document.querySelector(".end-messages-container").remove();
    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    grid.classList.remove("blur");
    timer.classList.remove("blur");
    scoreDisplay.classList.remove("blur");
  }, 50);
  resetPenalties();
  resetInterval();
  setTimeout(newRound, 300);
  setTimeout(() => {
    enableTouch();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 4000);
}

function resetRoundNumberAndRoundDisplay() {
  round = 0;
  timer.textContent = "Round 1";
}
function newRound() {
  clearInterval(run);
  resetArrayItemCounter();
  resetLoop();
  ++round;
  determineInterval();

  if (round > maxRounds) {
    sessionOver();
    return;
  }
  displayRound(round);
  currentArray.length = 0;
  arrayGenerator();
  startInterval();
}

function startNewRound() {
  grid.classList.remove("blur");
  timer.classList.remove("blur");
  scoreDisplay.classList.remove("blur");

  appContainer.appendChild(scoreDisplay);
  appContainer.appendChild(timer);
  appContainer.appendChild(mainDisplay);
  appContainer.appendChild(btnContainer3);
  btnContainer3.appendChild(answerDisplay);
  createGrid();
  setTimeout(newRound, 1000);
  setTimeout(() => {
    enableTouch();
  }, 300);
  setTimeout(() => {
    grid.classList.remove("gridHide");
  }, 300);
}

function sessionOver() {
  disableTouch();
  displayFinalScore();
  setTimeout(disableTouch, 500);
  setTimeout(disableTouch, 1000);
  displayTryAgainAndFinishBtns();
  grid.classList.add("blur");
  timer.classList.add("blur");
  scoreDisplay.classList.add("blur");
}
function gameOver() {
  if (numberOfWrongAnswers === maxWrongAnswers) {
    setTimeout(() => {
      disableTouch();
    }, 300);
    setTimeout(() => {
      alert("GAME OVER. Sorry, you missed more than five answers");
    }, 1000);
  }
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
ROUND DISPLAY
*******
*/

function displayRound(round) {
  timer.textContent = `Round ${round}`;
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
    ++numberOfRightAnswers;
  } else {
    const bufferLoader = new BufferLoader(
      audioContext,
      ["resources/audio/sfx/クイズ不正解2.mp3"],
      finishedLoading
    );
    bufferLoader.load();
    ++numberOfWrongAnswers;
    wrongAnswerCountArray.push("\u2716");
    displayWrongAnswerCount();
    gameOver();
  }
}
let wrongAnswerCountArray = [];
function displayWrongAnswerCount() {
  answerDisplay.textContent = `${wrongAnswerCountArray.join("")}`;
}

export { numberFluency1to20App };
