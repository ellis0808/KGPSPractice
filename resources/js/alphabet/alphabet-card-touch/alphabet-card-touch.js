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
// import { endCurrentApp } from "../../general/end-app.js";
import { score } from "../../../utilities/score-object.js";
import { updateCount } from "../../../utilities/update-score.js";
import { startMainApp } from "../../general/start-main-app.js";
import {
  removeMenuPage,
  restoreMainMenu,
} from "../../../utilities/main-menu-display-toggle.js";

function alphabetCardTouchApp() {
  appContainer.appendChild(btnContainer1);

  mainContainer.appendChild(appContainer);
  appContainer.appendChild(btnContainer2);
  btnContainer2.appendChild(startBtn);
  startBtn.textContent = "Start";
  appContainer.appendChild(grid);

  removeMenuPage();

  stylesheet.setAttribute(
    "href",
    "../../resources/css/alphabet-card-touch.css"
  );
  displayStartBtn();
}
function displayStartBtn() {
  startBtn.addEventListener("click", startRound);
}

// endCurrentApp();
const appContainer = document.createElement("div");
appContainer.classList.add("container");
appContainer.classList.add("card-touch-app");
const grid = document.createElement("div");
grid.classList.add("grid");
grid.classList.add("card-touch-app");
grid.setAttribute("id", "grid");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
btnContainer2.classList.add("card-touch-app");
const startBtn = document.createElement("button");
startBtn.setAttribute("id", "start-btn");
startBtn.classList.add("card-touch-app");
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1");
btnContainer1.classList.add("card-touch-app");
btnContainer1.setAttribute("id", "btn-container1");
const repeatBtn = document.createElement("div");
repeatBtn.classList.add("repeat-btn");
repeatBtn.classList.add("card-touch-app");
repeatBtn.setAttribute("id", "repeat-btn");
repeatBtn.addEventListener("click", repeat);
repeatBtn.textContent = "Repeat";
toggleRepeatBtnHide();
const scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("score-display");
scoreDisplay.classList.add("card-touch-app");
scoreDisplay.setAttribute("id", "score-display");
toggleScoreDisplayHide();
scoreDisplay.textContent = `${score.currentScore}`;
const timer = document.createElement("div");
timer.classList.add("timer");
timer.classList.add("card-touch-app");
timer.textContent = "1:00";

const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.classList.add("card-touch-app");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startNewRound);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.classList.add("card-touch-app");
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

// Start Round
function startRound() {
  startBtn.classList.add("spinfade");
  startBtn.classList.add("no-touch");
  setTimeout(() => {
    enableCardsAndRepeatBtn();
    createBoard();
    disableCardsAndRepeatBtn();
    // toggleScoreDisplayHide();
    appContainer.appendChild(timer);
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
  btnContainer1.appendChild(repeatBtn);
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
    console.log(e);
    correctCard(e);
    updateCount(5);
    disableCardsAndRepeatBtn();
  } else {
    wobble(e);
    score.decreaseScore(2);
    scoreDisplay.textContent = `${score.currentScore}`;
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
  restoreMainMenu();
  setTimeout(startMainApp, 500);
}

export {
  alphabetCardTouchApp,
  startAlphabetCardTouchApp,
  cardText,
  scoreDisplay,
};
