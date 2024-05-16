import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
} from "../../../utilities/variables.js";
import {
  correctCardID,
  randomNumber,
  speak,
  stopAudio,
  finishedLoading,
} from "./audio.js";
import { alphabet } from "./alphabet.js";
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
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(btnContainer1);
    appContainer.appendChild(btnContainer2);
    appContainer.appendChild(btnContainer3);
    btnContainer2.appendChild(startBtn);
    startBtn.textContent = "Start";
    btnContainer2.appendChild(exitBtn);
    exitBtn.textContent = "\u2716";
    appContainer.appendChild(grid);
  }, 0);

  stylesheet.setAttribute(
    "href",
    "../../resources/css/alphabet-card-touch.css"
  );
  removeMenuPage();

  score.resetScore();
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");
}

const appContainer = document.createElement("div");
appContainer.classList.add("container");
appContainer.classList.add("card-touch-app");
const grid = document.createElement("div");
grid.classList.add("grid");
grid.setAttribute("id", "grid");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const startBtn = document.createElement("button");
startBtn.setAttribute("id", "start-btn");
startBtn.classList.add("card-touch-app");
startBtn.addEventListener("click", startRound);
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("card-touch-app");
exitBtn.addEventListener("click", endApp);
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1");
btnContainer1.setAttribute("id", "btn-container1");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3");
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
tryAgainBtn.addEventListener("click", startNewRound);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

let cardText = [];
let newCardText;

// TIMER
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
      disableCardsAndRepeatBtn();
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
function disableCardsAndRepeatBtn() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.add("no-touch");
  });
  repeatBtn.classList.add("no-touch");
}
function enableCardsAndRepeatBtn() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.remove("no-touch");
  });
  repeatBtn.classList.remove("no-touch");
}

function displayStartBtn() {
  if (startBtn.classList.contains("no-touch")) {
    startBtn.classList.remove("no-touch");
    startBtn.classList.remove("spinfade");
    exitBtn.classList.remove("no-touch");
    exitBtn.classList.remove("hide2");
  }
  startBtn.addEventListener("click", startRound);
  score.resetScore();
}

// Start Round
function startRound() {
  startBtn.classList.add("no-touch");
  startBtn.classList.remove("intro");
  startBtn.classList.add("spinfade");
  exitBtn.classList.add("no-touch");
  exitBtn.classList.add("hide2");
  exitBtn.classList.remove("intro");
  setTimeout(() => {
    enableCardsAndRepeatBtn();
    createBoard();
    disableCardsAndRepeatBtn();
    // toggleScoreDisplayHide();
    btnContainer1.appendChild(timer);
  }, 1450);
  setTimeout(startTimer, 1950);
  setTimeout(enableCardsAndRepeatBtn, 2950);
}

function startNewRound() {
  tryAgainBtn.classList.add("no-touch");
  finishBtn.classList.add("no-touch");
  setTimeout(() => {
    // document.querySelector(".final-score-alert").remove();
    // document.querySelector(".try-again-btn").remove();
    // document.querySelector(".finish-btn").remove();
    document.querySelector(".end-messages-container").remove();

    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    grid.classList.remove("blur");
    btnContainer1.classList.remove("blur");
  }, 1800);
  setTimeout(() => {
    clearBoard();
  }, 100);
  setTimeout(() => {
    createBoard();
  }, 2200);
  setTimeout(() => {
    enableCardsAndRepeatBtn();
    startTimer();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 4000);
}

function roundOver() {
  displayFinalScore();
  setTimeout(disableCardsAndRepeatBtn, 500);
  setTimeout(disableCardsAndRepeatBtn, 1000);
  displayTryAgainAndFinishBtns();
  grid.classList.add("blur");
  btnContainer1.classList.add("blur");
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

  let speakLetter = new SpeechSynthesisUtterance(randomLetter);
  setTimeout(function () {
    synth.speak(speakLetter);
  }, 200);
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
  cardGenerator();
  // if (!repeatBtn.classList.contains("no-touch")) {
  let i = 0;
  lettersArray.forEach(() => {
    const card = document.createElement("div");
    card.setAttribute("txt", lettersArray[i]);
    newCardText = card.getAttribute("txt");
    card.textContent = newCardText;
    card.setAttribute("data-id", i);
    card.classList.add("card");
    grid.append(card);
    card.addEventListener("click", touchCard);
    cardText.push(newCardText);
    ++i;
  });
  btnContainer3.appendChild(repeatBtn);
  btnContainer1.appendChild(scoreDisplay);
  speak();
  setTimeout(toggleRepeatBtnHide, 2000);
  // }
}

// TOUCH FUNCTIONALITY
let currentCardID;

// functions
function touchCard(e) {
  currentCardID = this.getAttribute("data-id");
  if (parseInt(currentCardID) === correctCardID) {
    correctCard(e);
    updatePositiveCount(correctAnswerPoints);
    disableCardsAndRepeatBtn();
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
}

function startAlphabetCardTouchApp() {
  alphabetCardTouchApp();
  // endCurrentApp();
}

function endAppButton() {
  const endBtn = document.createElement("button");
}

function endApp() {
  const everything = document.querySelectorAll(".card-touch-app");
  everything.forEach((item) => {
    item.remove();
  });
  setTimeout(() => {
    stylesheet.setAttribute("href", "../resources/css/styles.css");
    displayMainPage();
    setTimeout(restoreMainMenu, 600);
  }, 500);
}

export {
  alphabetCardTouchApp,
  startAlphabetCardTouchApp,
  cardText,
  scoreDisplay,
};
