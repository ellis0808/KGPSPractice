/* Imports */
import { mainContainer, stylesheet } from "../../../utilities/variables.js";
import { BufferLoader } from "../../../utilities/buffer-loader.js";
import { audioContext, finishedLoading, speak } from "./audio.js";
import { score } from "../../../utilities/score-object.js";
import {
  updateNegativeCount,
  updatePositiveCount,
} from "../../../utilities/update-score.js";
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
const homeBtnContainer = document.createElement("div");
homeBtnContainer.classList.add("home-btn-container", "hide");
const homeBtn = document.createElement("button");
homeBtn.classList.add("home-btn");
homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
homeBtn.addEventListener("click", goHome);
const pauseBtn = document.createElement("div");
pauseBtn.classList.add("pause-btn");
pauseBtn.innerHTML = `<i class="fa-solid fa-pause fa-1x"></i>`;
pauseBtn.addEventListener("click", pause);
appContainer.appendChild(homeBtnContainer);
const reallyGoHomeContainer = document.createElement("div");
reallyGoHomeContainer.classList.add("go-home-container", "card-touch-app");
const reallyGoHomeMessageContainer = document.createElement("div");
reallyGoHomeMessageContainer.classList.add("go-home-message");
reallyGoHomeMessageContainer.textContent = "Go back to Menu?";
reallyGoHomeContainer.appendChild(reallyGoHomeMessageContainer);
const reallyGoHomeBtn = document.createElement("button");
reallyGoHomeBtn.classList.add("go-home-btn");
reallyGoHomeBtn.textContent = "Yes";
reallyGoHomeBtn.addEventListener("click", endApp);
const cancelGoHomeBtn = document.createElement("button");
cancelGoHomeBtn.classList.add("cancel-go-home-btn");
cancelGoHomeBtn.textContent = "Cancel";
cancelGoHomeBtn.addEventListener("click", returnToApp);

/* Common UI Elements */
const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "1:00";
const scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("score-display");
scoreDisplay.setAttribute("id", "score-display");
toggleScoreDisplayHide();
scoreDisplay.textContent = `${score.currentScore}`;
const grid = document.createElement("div");
grid.classList.add("grid");
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3");
const startBtn = document.createElement("div");
startBtn.setAttribute("id", "start-btn");
startBtn.textContent = "Start";
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("card-touch-app", "hide");
exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
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
let isPaused = false;
let appStarted = false;
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
    btnContainer2.appendChild(exitBtn);
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
      appContainer.removeChild(btnContainer1);
    }
    mainContainer.removeChild(appContainer);
    stylesheet.setAttribute("href", "../resources/css/styles.css");
    displayMainPage();
    setTimeout(restoreMainMenu, 100);
  }, 500);

  resetTimer();
  resetNavigationBtns();
  scoreDisplay.innerText = score.currentScore;
}

// pauses app
function pause() {
  isPaused = true;
  disableTouch();
  pauseBtn.removeEventListener("click", pause);
  setTimeout(() => {
    btnContainer1.classList.add("strong-blur");
    btnContainer3.classList.add("strong-blur");
    grid.classList.add("strong-blur");
  }, 50);
  pauseBtn.addEventListener("click", unpause);
}
function unpause() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  removeBlur();
  setTimeout(() => {
    isPaused = false;
  }, 500);
  setTimeout(speak, 200);
  pauseBtn.addEventListener("click", pause);
}
function unpause2() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  btnContainer1.classList.remove("strong-blur");
  btnContainer3.classList.remove("strong-blur");
  grid.classList.remove("strong-blur");
  setTimeout(() => {
    isPaused = false;
  }, 500);
  pauseBtn.addEventListener("click", pause);
}
let homeBtnIsGoHome = true;
let pauseBtnPauses = true;

function resetNavigationBtns() {
  homeBtnIsGoHome = true;
  pauseBtnPauses = true;
  homeBtn.removeEventListener("click", returnToApp);
  homeBtn.addEventListener("click", goHome);
  pauseBtn.removeEventListener("click", returnToApp);
  pauseBtn.addEventListener("click", pause);
  homeBtnReturnToNormal();
}
function goHome() {
  pause();
  homeBtnEnlarge();
  displayGoHomeConfirmation();
  if (homeBtnIsGoHome) {
    homeBtnIsGoHome = false;
    pauseBtnPauses = false;
    homeBtn.removeEventListener("click", goHome);
    homeBtn.addEventListener("click", returnToApp);
    pauseBtn.removeEventListener("click", unpause);
    pauseBtn.addEventListener("click", returnToApp);
  }
}
function homeBtnEnlarge() {
  homeBtn.classList.add("home-btn-enlarge");
}
function homeBtnReturnToNormal() {
  homeBtn.classList.remove("home-btn-enlarge");
}
function displayGoHomeConfirmation() {
  appContainer.appendChild(reallyGoHomeContainer);
  reallyGoHomeContainer.appendChild(reallyGoHomeBtn);
  reallyGoHomeContainer.appendChild(cancelGoHomeBtn);
}
function returnToApp() {
  appContainer.removeChild(reallyGoHomeContainer);
  homeBtnReturnToNormal();
  unpause();
  homeBtnIsGoHome = true;
  pauseBtnPauses = true;
  homeBtn.removeEventListener("click", returnToApp);
  homeBtn.addEventListener("click", goHome);
  pauseBtn.removeEventListener("click", returnToApp);
  pauseBtn.addEventListener("click", pause);
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
  exitBtn.classList.remove("hide");
  startBtn.addEventListener("click", startSession);
  score.resetScore();
}

document.addEventListener("keydown", (event) => {
  if (appStarted) {
    if (event.key === "Escape") {
      if (homeBtnIsGoHome) {
        goHome();
      } else {
        returnToApp();
      }
    }
  } else {
    return;
  }
});

function endSession() {
  unpause2();
  clearGridAndEffects();
  appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  appStarted = false;
  removeBlur();
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
  setTimeout(() => {
    appStarted = true;
  }, 1);
  setTimeout(startTimer, 1000);
}
function startNewSession() {
  tryAgainBtn.classList.add("no-touch");
  finishBtn.classList.add("no-touch");
  setTimeout(() => {
    document.querySelector(".end-messages-container").remove();
    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    removeBlur();
  }, 50);

  setTimeout(startSession, 300);
  setTimeout(() => {
    enableTouch();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 4000);
}

function startNewRound() {
  numberOfAttempts = 0;
  clearAll();
  removeBlur();

  createGrid();

  setTimeout(() => {
    appContainer.appendChild(btnContainer1);
    btnContainer1.appendChild(scoreDisplay);
    btnContainer1.appendChild(timer);
    appContainer.appendChild(letterDisplay);
    appContainer.appendChild(btnContainer3);
    btnContainer3.appendChild(checkBtn);
    btnContainer3.appendChild(repeatBtn);
    btnContainer3.appendChild(deleteBtn);
    homeBtnContainer.appendChild(homeBtn);
    homeBtnContainer.appendChild(pauseBtn);
    homeBtnContainer.classList.remove("hide");
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
  score.updateUserScore();
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
let countDown;
const roundTime = 60;
function startTimer() {
  time = roundTime;
  setTimeout(displayTimer, 500);
}
function displayTimer() {
  countDown = setInterval(() => {
    if (!isPaused) {
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
    }
  }, 1000);
  return countDown;
}

function resetTimer() {
  timer.innerText = "1:00";
  timer.classList.remove("wobble");
  time = roundTime;
  clearInterval(countDown);
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

function removeBlur() {
  if (document.querySelector(".blur")) {
    let blurredItems = document.querySelectorAll(".blur").forEach((item) => {
      item.classList.remove("blur");
    });
  }
  if (document.querySelector(".strong-blur")) {
    let stronglyBlurredItems = document
      .querySelectorAll(".strong-blur")
      .forEach((item) => {
        item.classList.remove("strong-blur");
      });
  }
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
    ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-cursor-move-1.mp3"],
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
    ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-cursor-move-2.mp3"],
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

let numberOfAttempts;
/* ANSWER VALIDATION */
function checkSpelling() {
  if (userSelectedLetters.join("") === word) {
    const bufferLoader = new BufferLoader(
      audioContext,
      ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
      finishedLoading
    );
    bufferLoader.load();

    updatePositiveCount(correctAnswerPoints);
    setTimeout(startNewRound, 1500);
  } else {
    ++numberOfAttempts;
    const bufferLoader = new BufferLoader(
      audioContext,
      ["https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-incorrect-1.mp3"],
      finishedLoading
    );
    bufferLoader.load();
    updateNegativeCount(incorrectAnswerPoints);
    if (numberOfAttempts < 3) {
      setTimeout(function () {
        alert(`Sorry, that is not the correct spelling. Listen again:`);
      }, 800);
      speak();
      clearDisplays();
    } else if (numberOfAttempts === 3) {
      setTimeout(startNewRound, 1500);
    }
    return numberOfAttempts;
  }
}

function toggleScoreDisplayHide() {
  scoreDisplay.classList.toggle("hide2");
}

export { word, spellingTouchApp };
