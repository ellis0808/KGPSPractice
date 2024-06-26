import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
} from "../../../utilities/variables.js";
import { cardTouchSfx, correctCardID, randomNumber, speak } from "./audio.js";
import { alphabet } from "./alphabet.js";
import { alphabetObject } from "../alphabet-audio-object.js";
import { wobble, spinfade, newRoundCardFlip, particles } from "./FX.js";
import { score } from "../../../utilities/score-object.js";
import {
  updateNegativeCount,
  updatePositiveCount,
} from "../../../utilities/update-score.js";
import { displayMainPage, startMainApp } from "../../general/start-main-app.js";
import {
  removeMenuPage,
  restoreMainMenu,
} from "../../../utilities/main-menu-display-toggle.js";

/* SCORING */
const correctAnswerPoints = 2;
const incorrectAnswerPoints = 1;

function alphabetCardTouchApp() {
  setTimeout(() => {
    resetTimer();
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(btnContainer1);
    appContainer.appendChild(btnContainer2);
    appContainer.appendChild(btnContainer3);
    btnContainer2.appendChild(startBtn);
    btnContainer2.appendChild(exitBtn);
  }, 0);

  stylesheet.setAttribute(
    "href",
    "../../resources/css/alphabet-card-touch.css"
  );
  displayStartBtn();

  removeMenuPage();

  score.resetScore();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");
}

const appContainer = document.createElement("div");
appContainer.classList.add("container");
appContainer.classList.add("card-touch-app");

/* Main App Container */
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
const grid = document.createElement("div");
grid.classList.add("grid");
grid.setAttribute("id", "grid");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const startBtn = document.createElement("button");
startBtn.setAttribute("id", "start-btn");
startBtn.classList.add("card-touch-app");
startBtn.textContent = "Start";
startBtn.addEventListener("click", startSession);
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("card-touch-app", "hide");
exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
exitBtn.addEventListener("click", endApp);
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1", "hide");
btnContainer1.setAttribute("id", "btn-container1");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3", "hide");
btnContainer3.setAttribute("id", "btn-container3");
const repeatBtn = document.createElement("div");
repeatBtn.classList.add("repeat-btn");
repeatBtn.classList.add("card-touch-app");
repeatBtn.setAttribute("id", "repeat-btn");
repeatBtn.addEventListener("click", repeat);
repeatBtn.textContent = "Repeat";
toggleRepeatBtnHide();
const scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("score-display");
scoreDisplay.setAttribute("id", "score-display");
toggleScoreDisplayHide();
scoreDisplay.textContent = `${score.currentScore}`;
const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "1:00";

const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

let isPaused = false;
let appStarted = false;
let isSessionFinished = false;
let cardText = [];
let newCardText;
let countDown;
// TIMER
let time;
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
        isSessionFinished = true;
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
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.add("no-touch");
  });
  // repeatBtn.classList.add("no-touch");
}
function enableTouch() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.remove("no-touch");
  });
  // repeatBtn.classList.remove("no-touch");
}

function displayStartBtn() {
  if (startBtn.classList.contains("no-touch")) {
    startBtn.classList.remove("no-touch");
    startBtn.classList.remove("spinfade");
    startBtn.classList.remove("hide");
    exitBtn.classList.remove("no-touch");
    exitBtn.classList.remove("hide2");
  }
  exitBtn.classList.remove("hide");
  startBtn.addEventListener("click", startSession);
  score.resetScore();
}

// Start Round
function startSession() {
  cardTouchSfx.startApp.play();
  removeEndMessagesContainer();
  startBtn.classList.add("no-touch");
  startBtn.classList.add("spinfade");
  startBtn.classList.remove("intro");
  exitBtn.classList.add("no-touch");
  exitBtn.classList.add("hide2");
  exitBtn.classList.remove("intro");
  clearBoardFast();
  setTimeout(() => {
    appStarted = true;
  }, 1);
  setTimeout(resetTimer, 750);
  setTimeout(startNewSession, 1000);
}

function removeEndMessagesContainer() {
  if (document.querySelector(".end-messages-container")) {
    tryAgainBtn.classList.add("no-touch");
    finishBtn.classList.add("no-touch");
    document.querySelector(".end-messages-container").remove();
  }
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
function startNewSession() {
  isSessionFinished = false;
  appContainer.appendChild(grid);
  score.resetScore();
  scoreDisplay.innerText = score.currentScore;
  removeBlur();
  homeBtnContainer.classList.remove("no-touch");
  createBoard();
  setTimeout(() => {
    enableTouch();
    startTimer();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 500);
  btnContainer1.appendChild(timer);
  btnContainer1.appendChild(scoreDisplay);
  homeBtnContainer.appendChild(homeBtn);
  homeBtnContainer.appendChild(pauseBtn);
  btnContainer1.classList.remove("hide");
  btnContainer3.classList.remove("hide");
  homeBtnContainer.classList.remove("hide");
}
function startNewRound() {
  // reset functions
  setTimeout(createBoard, 200);
}

function roundOver() {
  displayFinalScore();
  setTimeout(disableTouch, 500);
  setTimeout(disableTouch, 1000);
  displayTryAgainAndFinishBtns();
  grid.classList.add("blur");
  btnContainer1.classList.add("blur");
  homeBtnContainer.classList.add("blur");
  homeBtnContainer.classList.add("no-touch");
}

// Clear away all cards
function clearBoard() {
  setTimeout(newRoundCardFlip, 1000);

  // remove all cards from grid, then generate new cards
  setTimeout(function (e) {
    grid.classList.toggle("hide");
    repeatBtn.classList.add("hide2");
  }, 1500);
  setTimeout(function (e) {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    // reset text to be displayed on cards
    cardText = [];
  }, 2000);
  newCardText;
}

function clearBoardFast() {
  // remove all cards from grid, then generate new cards
  setTimeout(function (e) {
    grid.classList.toggle("hide");
    repeatBtn.classList.add("hide2");
  }, 200);
  setTimeout(function (e) {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    // reset text to be displayed on cards
    cardText = [];
  }, 500);
  newCardText;
}

function displayFinalScore() {
  const endGameMessagesContainer = document.createElement("div");
  endGameMessagesContainer.classList.add("end-messages-container");
  endGameMessagesContainer.classList.add("card-touch-app");
  appContainer.appendChild(endGameMessagesContainer);
  const finalScoreAlert = document.createElement("div");
  finalScoreAlert.classList.add("final-score-alert");
  finalScoreAlert.classList.add("card-touch-app");
  finalScoreAlert.innerText = `${score.currentScore} points!`;
  setTimeout(() => {
    endGameMessagesContainer.appendChild(finalScoreAlert);
    setTimeout(() => {
      // finalScoreAlert.classList.add("wobble");
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

function toggleRepeatBtnHide() {
  repeatBtn.classList.toggle("hide2");
}
function toggleScoreDisplayHide() {
  scoreDisplay.classList.toggle("hide2");
}
function repeat() {
  const synth = window.speechSynthesis;
  const randomLetter = cardText[randomNumber];

  setTimeout(function () {
    if (!isPaused) {
      alphabetObject[randomLetter].sound.play();
    }
  }, 30);
}

// BOARD GENERATION
function createBoard() {
  cardText = [];
  if (!startBtn.classList.contains("hide")) {
    startBtn.classList.toggle("hide");
  }
  if (grid.classList.contains("hide")) {
    grid.classList.toggle("hide");
  }

  let lettersArray = [];
  function cardGenerator() {
    for (let i = 0; lettersArray.length < 9; ++i) {
      let letter = `${alphabet[Math.floor(Math.random() * alphabet.length)]}`;
      if (!lettersArray.includes(letter)) {
        lettersArray.push(letter);
      }
    }
  }
  if (!isSessionFinished) {
    if (!isPaused) {
      cardGenerator();
      let i = 0;
      lettersArray.forEach(() => {
        const card = document.createElement("div");
        card.setAttribute("txt", lettersArray[i]);
        newCardText = card.getAttribute("txt");
        card.textContent = newCardText;
        card.setAttribute("contentId", i);
        card.classList.add("card");
        grid.append(card);
        card.addEventListener("click", touchCard);
        cardText.push(newCardText);
        ++i;
      });
      btnContainer3.appendChild(repeatBtn);
      btnContainer1.appendChild(scoreDisplay);
      if (!isSessionFinished) {
        if (!isPaused) {
          speak();
        }
      }
      setTimeout(toggleRepeatBtnHide, 1500);
    }
  }
}

// TOUCH FUNCTIONALITY
let currentCardID;

// functions
function touchCard(e) {
  currentCardID = this.getAttribute("contentId");
  if (parseInt(currentCardID) === correctCardID) {
    correctCard(e);
    updatePositiveCount(correctAnswerPoints);
    disableTouch();
  } else {
    wobble(e);
    updateNegativeCount(incorrectAnswerPoints);
  }
}

function correctCard(e) {
  spinfade(e);
  particles(e);
  clearBoard();
  setTimeout(createBoard, 2000);
  enableTouch();
}

function startAlphabetCardTouchApp() {
  alphabetCardTouchApp();
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
  homeBtnReturnToNormal();
  resetNavigationBtns();
  appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
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
  removeBlur();
  grid.remove();
}

function endApp() {
  endSession();

  const everything = document.querySelectorAll(".card-touch-app");
  setTimeout(() => {
    everything.forEach((item) => {
      item.remove();
    });
    setTimeout(() => {
      // mainContainer.removeChild(appContainer);
      stylesheet.setAttribute("href", "../resources/css/styles.css");
      displayMainPage();
      setTimeout(restoreMainMenu, 100);
    }, 500);
  }, 500);
  scoreDisplay.innerText = score.currentScore;
  resetTimer();
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
    if (grid.hasChildNodes()) {
      setTimeout(repeat, 200);
    }
    //displays a new board in case the app is paused after a correct answer, but before a new board is generated
    if (!grid.hasChildNodes()) {
      createBoard();
    }
  }, 500);
  pauseBtn.addEventListener("click", pause);
}
function unpause2() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  removeBlur();
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

export {
  alphabetCardTouchApp,
  startAlphabetCardTouchApp,
  cardText,
  scoreDisplay,
};
