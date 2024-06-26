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
import { finishedLoading, numbersFluencySfx } from "./audio.js";
let interval = 2500;
let run;
let isPaused = false;
let appStarted = false;
let currentArray = [];
let round = 0;
let maxRounds = 30;
let currentItem;
let randNumber;
let loop = 0;
let arrayItemCounter = 0;
let numberOfWrongAnswers = 0;
let numberOfRightAnswers = 0;
let maxWrongAnswers = 5;
let correctAnswerPoints;
let incorrectAnswerPoints;

function startInterval() {
  if (!bannerDisplayed) {
    if (!isPaused) {
      run = setInterval(speakingInterval, interval); // start setInterval as "run"
    }
  }
  return run;
}
function determineInterval() {
  if (round === 1) {
    interval = interval;
  } else if (round > 1 && round < 6) {
    interval = interval * 0.9;
  } else if (round > 5 && round < 11) {
    interval = interval * 0.95;
  } else if (round > 10 && round < 16) {
    interval = interval * 0.97;
  } else if (round > 16 && round < 21) {
    interval = interval * 0.98;
  }
}
function arrayGenerator() {
  currentArray.length = 0;
  // if (round === 1) {
  currentArray.length = 0;
  for (let i = 0; i < 10; ++i) {
    randNumber = Math.floor(Math.random() * 20 + 1);
    currentArray.push(randNumber);
  }
  return;
}
function speakingInterval() {
  if (!bannerDisplayed) {
    if (!isPaused) {
      getCurrentItem();
      if (!isPaused) {
        enableTouch();
        speak(currentItem);

        ++loop;

        //stop interval
        if (loop === currentArray.length) {
          clearInterval(run);
          setTimeout(newRound, 3000);
        }
      }
    }
  }
}

// Reset Functions
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
  interval = 2500;
  return interval;
}
function resetCorrectAnswerPoints() {
  correctAnswerPoints = 0;
  return correctAnswerPoints;
}

/* AUDIO */

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
function determineCorrectAnswerPoints() {
  if (round >= 1 && round < 10) {
    correctAnswerPoints = 1;
  } else if (round > 9 && round < 13) {
    correctAnswerPoints = 2;
  } else if (round > 12 && round < 16) {
    correctAnswerPoints = 3;
  } else if (round > 15 && round < 20) {
    correctAnswerPoints = 4;
  } else if (round > 19 && round < 23) {
    correctAnswerPoints = 6;
  } else if (round > 22 && round < 27) {
    correctAnswerPoints = 8;
  } else if (round > 26 && round < 28) {
    correctAnswerPoints = 12;
  } else if (round > 27 && round < 29) {
    correctAnswerPoints = 15;
  } else if (round > 28 && round < 30) {
    correctAnswerPoints = 20;
  } else if (round === 30) {
    correctAnswerPoints = 25;
  }
}

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
reallyGoHomeContainer.classList.add("go-home-container");
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
timer.textContent = `Round 1`;
const grid = document.createElement("div");
grid.classList.add("grid");
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3", "hide");
const startBtn = document.createElement("div");
startBtn.setAttribute("id", "start-btn");
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
      appContainer.removeChild(btnContainer1);
      appContainer.removeChild(btnContainer3);
    }
    mainContainer.removeChild(appContainer);
    stylesheet.setAttribute("href", "../resources/css/styles.css");
    displayMainPage();
    setTimeout(restoreMainMenu, 100);
  }, 500);
  scoreDisplay.innerText = score.currentScore;
}
// pauses app
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
    console.log("test");
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
  appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  clearInterval(run);
  removeBlur();
  const allBoxes = document.querySelectorAll(".box");
  allBoxes.forEach((box) => {
    box.remove();
  });
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  appStarted = false;
  resetPenalties();
  resetInterval();
  resetRoundNumberAndRoundDisplay();
  resetLoop();
  resetCorrectAnswerPoints();
  resetNavigationBtns();
  grid.remove();
}
function startSession() {
  numbersFluencySfx.startApp.play();
  startBtn.classList.add("no-touch");
  startBtn.classList.remove("intro");
  startBtn.classList.add("spinfade");
  exitBtn.classList.add("no-touch");
  exitBtn.classList.add("hide2");
  exitBtn.classList.remove("intro");
  setTimeout(startNewRound, 950);
  setTimeout(() => {
    appStarted = true;
  }, 1);
}
function startNewSession() {
  score.currentScore = 0;
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
  resetRoundNumberAndRoundDisplay();
  resetLoop();
  resetCorrectAnswerPoints();
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
  determineCorrectAnswerPoints();
  setHeartsArray();
  // if (!isPaused) {
  displayHeartsArray();
  if (round === 1) {
    numbersFluencySfx.restoreHeartSFX.play();
  }
  restoreOneHeart();
  if (round > maxRounds) {
    sessionOver();
    return;
  }
  // if (!isPaused) {
  displayRound(round);
  // }
  // }
  currentArray.length = 0;
  arrayGenerator();
  startInterval();
}

function startNewRound() {
  removeBlur();
  appContainer.appendChild(btnContainer1);
  btnContainer1.appendChild(scoreDisplay);
  btnContainer1.appendChild(timer);
  appContainer.appendChild(mainDisplay);
  appContainer.appendChild(btnContainer3);
  btnContainer3.appendChild(answerDisplay);
  createGrid();
  setTimeout(newRound, 1000);
  if (isPaused) {
    unpause2();
  }
  setTimeout(() => {
    enableTouch();
  }, 300);
  setTimeout(() => {
    grid.classList.remove("gridHide");
    homeBtnContainer.appendChild(homeBtn);
    homeBtnContainer.appendChild(pauseBtn);
    homeBtnContainer.classList.remove("hide");
    btnContainer3.classList.remove("hide");
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
    clearInterval(run);
    setTimeout(() => {
      alert("GAME OVER. Sorry, you missed more than five answers");
    }, 700);
    displayFinalScore();
    displayTryAgainAndFinishBtns();
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
ROUND DISPLAY
*******
*/
let bannerDisplayed = false;
function displayRound(round) {
  // if (!isPaused) {
  setTimeout(() => {
    bannerDisplayed = true;
  }, 1);
  let bannerContainer = document.createElement("div");
  let roundBanner = document.createElement("div");
  bannerContainer.classList.add("banner-container");
  roundBanner.classList.add("round-banner", "banner-in");
  setTimeout(() => {
    appContainer.appendChild(bannerContainer);
    bannerContainer.appendChild(roundBanner);
    numbersFluencySfx.newRound.play();
    roundBanner.textContent = `Round ${round}`;
    timer.textContent = `Round ${round}`;
  }, 1500);
  setTimeout(() => {
    roundBanner.classList.remove("banner-in");
    roundBanner.classList.add("banner-out");
  }, 3000);
  setTimeout(() => {
    bannerContainer.remove();
    roundBanner.remove();
    bannerDisplayed = false;
  }, 4000);
  // }
}

function roundEffect() {
  timer.classList.add("wobble-pulse");
  setTimeout(() => {
    timer.classList.remove("wobble-pulse");
  }, 500);
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
  checkAnswer(currentAnswer, event);
}

function checkAnswer(currentAnswer, event) {
  if (currentAnswer === currentItem) {
    numbersFluencySfx.correct.play();
    updatePositiveCount(correctAnswerPoints);
    ++numberOfRightAnswers;
    disableTouch();
  } else {
    numbersFluencySfx.incorrect.play();
    heartsArray.pop();
    displayHeartsArray();
    gameOver();
  }
}
function addWrongAnswerRed(event) {
  event.target.classList.add("red");
  event.target.classList.add("fast-wobble");
}
function removeWrongAnswerRed(event) {
  setTimeout(() => {
    event.target.classList.remove("red");
    event.target.classList.remove("fast-wobble");
  }, 200);
}

let wrongAnswerCountArray = [];
let maxNumberOfHearts = 5;
const heartsArray = [];

function displayHeartsArray() {
  answerDisplay.classList.remove("pulse");
  answerDisplay.innerHTML = `${heartsArray.join("")}`;
  answerDisplay.classList.add("pulse");
}
function setHeartsArray() {
  if (heartsArray.length === 0) {
    let i;
    for (i = 0; i < maxNumberOfHearts; ++i) {
      heartsArray.push(`<i class="fa-solid fa-heart fa-1x"></i>`);
    }
  }
}
function restoreOneHeart() {
  if (heartsArray.length < maxNumberOfHearts) {
    heartsArray.push(`<i class="fa-solid fa-heart fa-1x"></i>`);
    numbersFluencySfx.restoreHeartSFX.play();
    displayHeartsArray();
  }
}

export { numberFluency1to20App };
