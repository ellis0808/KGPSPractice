import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../../utilities/variables.js";
import { alphabet } from "../alphabet-card-touch/alphabet.js";
import { particles } from "./fx.js";
import { BufferLoader } from "../../../utilities/buffer-loader.js";
import { audioContext, finishedLoading } from "../alphabet-card-touch/audio.js";
import { score } from "../../../utilities/score-object.js";
import {
  updateNegativeCount,
  updatePositiveCount,
} from "../../../utilities/update-score.js";
import { scoreDisplay } from "../alphabet-card-touch/alphabet-card-touch-index.js";
import { speak } from "./audio.js";
import { displayMainPage, startMainApp } from "../../general/start-main-app.js";
import {
  removeMenuPage,
  restoreMainMenu,
} from "../../../utilities/main-menu-display-toggle.js";

/* SCORING */
const correctAnswerPoints = 1;
const incorrectAnswerPoints = 1;

// Main App Container
const appContainer = document.createElement("div");
appContainer.classList.add("container", "letter-matching-app");

// Button Container 1 (Timer & Score Display)
const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "1:00";

toggleScoreDisplayHide();
scoreDisplay.textContent = `${score.currentScore}`;

const grid = document.createElement("div");
grid.classList.add("grid");
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const startBtn = document.createElement("button");
startBtn.setAttribute("id", "start-btn");
startBtn.textContent = "Start";
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("letter-matching-app", "hide");
exitBtn.addEventListener("click", endApp);
const capitalLettersDiv = document.createElement("div");
capitalLettersDiv.classList.add("capitals");
const lowercaseLetterDiv = document.createElement("div");
lowercaseLetterDiv.classList.add("lowercase");
const startDotsDiv = document.createElement("div");
startDotsDiv.classList.add("start-dot-div");
const endDotsDiv = document.createElement("div");
endDotsDiv.classList.add("end-dot-div");

const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startNewSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

const homeBtnContainer = document.createElement("div");
homeBtnContainer.classList.add("home-btn-container", "hide");
const homeBtn = document.createElement("button");
homeBtn.classList.add("home-btn");
homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
homeBtn.addEventListener("click", goHome);
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
const pauseBtn = document.createElement("div");
pauseBtn.classList.add("pause-btn");
pauseBtn.innerHTML = `<i class="fa-solid fa-pause fa-1x"></i>`;
pauseBtn.addEventListener("click", pause);

let endDotId;

function toggleScoreDisplayHide() {
  scoreDisplay.classList.toggle("hide2");
}

let isPaused = false;

let numberOfLettersToBeDisplayed = 4;
const alphabetLowercase = [];
const alphabetCapitals = [];

let currentDotId = null;
const correctDotsAndLines = [];
const currentDotIdArray = [];
const endDotsIdArray = [];
const currentLinesIdArray = [];
const finalLinesIdArray = [];

/*
*******
I. MAIN APP
*******
*/
function alphabetMatchingApp() {
  mainContainer.appendChild(appContainer);
  appContainer.appendChild(btnContainer1);
  appContainer.appendChild(btnContainer2);
  btnContainer2.appendChild(startBtn);
  btnContainer2.appendChild(exitBtn);
  appContainer.appendChild(grid);
  grid.classList.add("gridHide");
  grid.appendChild(capitalLettersDiv);
  grid.appendChild(lowercaseLetterDiv);
  grid.appendChild(startDotsDiv);
  grid.appendChild(endDotsDiv);
  exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  removeMenuPage();

  stylesheet.setAttribute("href", "../../resources/css/alphabet-matching.css");
  displayStartBtn();

  score.resetScore();
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");
}

function endApp() {
  endSession();
  setTimeout(() => {
    mainContainer.removeChild(appContainer);
    stylesheet.setAttribute("href", "../resources/css/styles.css");
    displayMainPage();
    setTimeout(restoreMainMenu, 600);
  }, 500);
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
}

// pauses app
function pause() {
  isPaused = true;
  disableTouch();
  pauseBtn.removeEventListener("click", pause);
  setTimeout(() => {
    btnContainer1.classList.add("strong-blur");
    grid.classList.add("strong-blur");
  }, 50);
  pauseBtn.addEventListener("click", unpause);
}
function unpause() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  btnContainer1.classList.remove("strong-blur");
  grid.classList.remove("strong-blur");
  setTimeout(() => {
    isPaused = false;
    if (!grid.hasChildNodes()) {
      startNewRound();
    }
  }, 500);
  pauseBtn.addEventListener("click", pause);
}
function unpause2() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  btnContainer1.classList.remove("strong-blur");
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

function removeBlur() {
  if (document.querySelector(".blur")) {
    let blurredItems = document.querySelectorAll(".blur").forEach((item) => {
      item.classList.remove("blur");
    });
  }
  if (document.querySelector(".blur")) {
    let stronglyBlurredItems = document
      .querySelectorAll(".strong-blur")
      .forEach((item) => {
        item.classList.remove("strong-blur");
      });
  }
}

/*
*******
II. SESSIONS & ROUNDS
*******
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
function endSession() {
  unpause2();
  clearBoard();
  homeBtnReturnToNormal();
  resetNavigationBtns();
  appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  score.updateUserScore();
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  removeBlur();
}
function startSession() {
  startBtn.classList.add("no-touch");
  startBtn.classList.add("spinfade");
  exitBtn.classList.remove("intro");
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
  homeBtnContainer.classList.remove("hide");
  grid.classList.remove("blur");
  timer.classList.remove("blur");
  scoreDisplay.classList.remove("blur");

  letterSetGenerator();
  const shuffledAlphabetCapitals = shuffle(alphabetCapitals);
  generateLetterDivsForMatching(shuffledAlphabetCapitals);
  generateLetterDivsForMatching(alphabetLowercase);
  createDots(shuffledAlphabetCapitals);
  createDots(alphabetLowercase);
  btnContainer1.appendChild(timer);
  btnContainer1.appendChild(scoreDisplay);
  appContainer.appendChild(homeBtnContainer);
  homeBtnContainer.appendChild(homeBtn);
  homeBtnContainer.appendChild(pauseBtn);

  setTimeout(() => {
    activateEventListeners();
  }, 200);
  setTimeout(() => {
    enableTouch();
  }, 300);
  setTimeout(() => {
    grid.classList.remove("gridHide");
  }, 100);
}

/*
A. Overall Function
*/
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

/*
B. Clearing the Grid & Resetting Arrays
*/
function clearBoard() {
  setTimeout(() => {
    grid.classList.add("gridHide");
  }, 50);
  setTimeout(() => {
    correctDotsAndLines.length = 0;
    currentDotIdArray.length = 0;
    currentLinesIdArray.length = 0;
    alphabetLowercase.length = 0;
    alphabetCapitals.length = 0;
    const dotsAndLines = document.querySelectorAll("[txt],.dot,.line");
    dotsAndLines.forEach((item) => {
      item.remove();
    });
    clearArrays();
  }, 400);
}

function clearArrays() {
  currentDotId = null;
  currentDotIdArray.length = 0;
  endDotsIdArray.length = 0;
  currentLinesIdArray.length = 0;
  finalLinesIdArray.length = 0;
}
/*
C. Displaying the Final Score Message Overlay
*/
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
D. Displaying the Try Again and Finish Buttons
*/
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
. ANSWER EVALUATION
*******
*/

/*
A. Checking for Correct Answers
*/

function addCorrectPulseEffect() {
  correctDotsAndLines.forEach((item) => {
    let correctDot = document.getElementById(`${item}`);
    if (!correctDot.classList.contains("dot-enclosure")) {
      correctDot.classList.add("correctPulse");
      // console.log(`Correct Dots: ${correctDot.id}`);
    } else if (correctDot.classList.contains("dot-enclosure")) {
      correctDot.children[0].classList.add("correctPulse");
      // console.log(`Correct Dots: ${correctDot.id}`);
    }
  });
}
const incorrectDotsAndLines = [];
function removeCorrectPulseEffect() {
  const alldots = document.querySelectorAll(".correctPulse");
  console.log(alldots);
  alldots.forEach((item) => {
    if (item.classList.contains("correctPulse")) {
      item.classList.remove("correctPulse");
    }
  });
  console.log(alldots);
}
function correctMatch(event) {
  if (correctDotsAndLines.includes(event.target.id)) {
    event.preventDefault();
    return;
  } else if (line.text === event.target.getAttribute("txt")) {
    line.element.classList.add("correctPulse");
    const correctEndDot = document.querySelectorAll(`[line-id="${line.id}"]`);
    correctEndDot.forEach((item) => {
      if (!correctDotsAndLines.includes(item.id)) {
        correctDotsAndLines.push(item.id);
      }
    });

    addCorrectPulseEffect();

    const bufferLoader = new BufferLoader(
      audioContext,
      ["../../resources/audio/sfx/クイズ正解5.mp3"],
      finishedLoading
    );
    bufferLoader.load();
    updatePositiveCount(correctAnswerPoints);
    scoreDisplay.classList.add("pulse");
    checkAllCorrect();
  } else {
    event.target.removeAttribute("line-id");
    event.target.classList.remove("correctPulse");
    updateNegativeCount(incorrectAnswerPoints);
  }
}

/*
B. Checking If All Letters Are Correctly Matched
*/
function checkAllCorrect() {
  const allCorrectDots = document.querySelectorAll(".start-dot.correctPulse");
  if (allCorrectDots.length === numberOfLettersToBeDisplayed) {
    disableTouch();
    continueToNextRound();
  }
}

function continueToNextRound() {
  if (!isPaused) {
    setTimeout(() => {
      clearBoard();
    }, 1000);
    setTimeout(() => {
      startNewRound();
    }, 1500);
  }
}

/*
C. Removing Classes & IDs for Unconnected Elements
*/
/*
C.1 - Removing 'CorrectPulse' Class
*/
function removeCorrectPulse() {
  const endDotsMarkedCorrect = document.querySelectorAll(
    ".correctPulse.end-dot"
  );
  endDotsMarkedCorrect.forEach((item) => {
    if (!item.hasAttribute("line-id")) {
      item.classList.remove("correctPulse");
    }
    if (item.getAttribute("line-id")) {
      const connectedStartDot = document.querySelector(
        `[line-id="${item.getAttribute("line-id")}"].start-dot`
      );
      if (connectedStartDot !== null) {
        if (
          connectedStartDot.getAttribute("line-id") ===
          item.getAttribute("line-id")
        ) {
          item.removeAttribute("line-id");
          item.classList.remove("correctPulse");
          return;
        }
      }
    }
  });
  const startDotsMarkedCorrect = document.querySelectorAll(
    ".correctPulse.start-dot"
  );
  startDotsMarkedCorrect.forEach((item) => {
    if (item.hasAttribute("line-id")) {
      if (
        !currentDotIdArray.includes(item.getAttribute("line-id").slice(0, 5))
      ) {
        item.classList.remove("correctPulse");
      }
    }
    if (!currentDotIdArray.includes(item.id)) {
      item.classList.remove("correctPulse");
    }
  });
  removeLineIdFromDot();
}

/*
C.2 - Removing LineID
*/
function removeLineIdFromDot(event) {
  const endDotsToBeRevertedToDefaultState =
    document.querySelectorAll(`[line-id].end-dot`);
  endDotsToBeRevertedToDefaultState.forEach((item) => {
    if (!currentDotIdArray.includes(item.getAttribute("line-id").slice(0, 5))) {
      item.removeAttribute("line-id");
    }
  });
}

/* 
*******
III. TIMER
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
/*
*******
IV. ROUND OVER
*******
*/

/*
V. GRID POPULATION
*/

/*
A. Generating Letters
  --> This function chooses letters at random from the alphabet array used for the card touch app
  --> The number of letters is limited to the 'numberOfLettersToBeDisplayed' variable, which is currently set to 4.
  --> The four letters are then sent to the lowercase and capital (after being converted to uppercase) letter arrays.
  --> If one of the letters already exists in the array, it is rejected and a new one is chosen
*/
function letterSetGenerator() {
  for (let i = 0; alphabetCapitals.length < numberOfLettersToBeDisplayed; ++i) {
    let letter = `${alphabet[Math.floor(Math.random() * alphabet.length)]}`;
    if (!alphabetLowercase.includes(letter)) {
      alphabetLowercase.push(letter);
      alphabetCapitals.push(letter.toUpperCase());
    }
  }
}

/*
A.1. Shuffling Letter Arrays
  --> This function shuffles an array input as a parameter.
  --> This is to keep the letters from appearing right across from another every time.
*/
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/*
B. Generating Letter Divs for Matching
  --> A div 'card' is created for each of the letters in the two letter arrays.
  --> They are given two dataset ids, then attached to their respective group.
*/
function generateLetterDivsForMatching(array) {
  let divGroup = "capitals-";
  if (array === alphabetLowercase) {
    divGroup = "lowercase-";
    array.forEach((item) => {
      const letter = document.createElement("div");
      letter.setAttribute("txt", `${item}`);
      letter.setAttribute("data-id", `${divGroup}${item}`);
      letter.classList.add(divGroup);
      letter.innerText = `${letter.getAttribute("txt")}`;
      letter.addEventListener("click", (event) => {
        speak(event);
      });
      lowercaseLetterDiv.appendChild(letter);
    });
    return;
  }
  array.forEach((item) => {
    const letter = document.createElement("div");
    letter.setAttribute("txt", `${item}`);
    letter.setAttribute("data-id", `${divGroup}${item}`);
    letter.classList.add(divGroup);
    letter.innerText = `${letter.getAttribute("txt")}`;
    letter.addEventListener("click", (event) => {
      speak(event);
    });
    capitalLettersDiv.appendChild(letter);
  });
}

/*
C. Generating Start Dots, End Dots, and their Enclosures
  --> One dot is generate for each letter in the two letter arrays.
  --> If the dot is lowercase, it is an end-dot, and if capital, a start-dot.
  --> The dots are numbered from 0-7, with start-dots being 0-4, and end-dots 4-9. This is done dynamically.
  --> The dots are given several classes and ids, and given a zIndex of 30, to ensure they are on top when the lines are drawn.
*/

class StartDot {
  constructor(txt) {
    this.txt = txt;
    this.id = null;
    this.connection = null;
    this.connected = false; //is this redundant?
    this.locked = false;
    this.element = document.createElement("div");
  }
  connect() {}
  markAsCorrect() {}
  markAsIncorrect() {}
}
class EndDot {
  constructor(txt) {
    this.txt = txt;
    this.id = null;
    this.connection = null;
    this.connected = false; //is this redundant?
    this.locked = false;
    this.element = document.createElement("div");
  }
  connect() {}
  markAsCorrect() {}
  markAsIncorrect() {}
}

const endDot = [];
const startDot = [];
function createDots(array) {
  let dotNumber = 0;
  let i = dotNumber;
  if (array === alphabetLowercase) {
    dotNumber = 5;
    array.forEach((item) => {
      // Create dot Enclosures for a wider hit-map
      const endDotEnclosure = document.createElement("div");
      endDotEnclosure.setAttribute("id", `dot-${dotNumber}`);
      endDotEnclosure.setAttribute("txt", `${item.toUpperCase()}`);
      // endDotEnclosure.addEventListener("pointerup", onMouseUp, false)
      endDotEnclosure.classList.add("dot-enclosure", "end-target");
      endDotsDiv.appendChild(endDotEnclosure);
      // Create dot for each Enclosure
      endDot[i] = new EndDot();
      endDot[i].element.setAttribute("id", `dot-${dotNumber}`);
      endDot[i].element.setAttribute("txt", `${item.toUpperCase()}`);
      // dot.addEventListener("pointerup", onMouseUp, false);
      endDot[i].element.classList.add("end-dot", "dot", "end-target");
      endDot[i].element.style.zIndex = "30";
      let targetEnclosure = document.getElementById(
        `dotEnclosure-${dotNumber}`
      );
      endDotEnclosure.appendChild(endDot[i].element);
      ++dotNumber;
    });
    return;
  }
  array.forEach((item) => {
    // Create dot Enclosures for a wider hit-map
    const startDotEnclosure = document.createElement("div");
    startDotEnclosure.setAttribute("id", `dot-${dotNumber}`);
    startDotEnclosure.setAttribute("txt", `${item}`);
    startDotEnclosure.classList.add("dot-enclosure", "start-target");
    startDotsDiv.appendChild(startDotEnclosure);
    startDot[i] = new StartDot();
    startDot[i].element.setAttribute("id", `dot-${dotNumber}`);
    startDot[i].element.setAttribute("txt", `${item}`);
    startDot[i].element.classList.add("start-dot", "dot", "start-target");
    startDotEnclosure.appendChild(startDot[i].element);
    ++dotNumber;
  });
  setTimeout(disableTouch, 300);
}

function revertToDefault(event) {
  if (!event.target.getAttribute("line-id")) {
  }
}

const correctArray = [];

class Connector {
  constructor() {
    this.isPressed = false;
    this.start = null;
    this.end = null;
    this.distance = null;
    this.slope = null;
    this.element = null;
    this.id = null;
    this.endLineId = null;
    this.text = null;
  }
  buttonDown() {
    this.isPressed = true;
  }
  buttonUp() {
    this.isPressed = false;
  }
  getStartPosition(event) {
    this.start = getCenterOfTarget(event);
  }
  getEndPosition(event) {
    this.end = getCenterOfTarget(event);
  }
  drawLine(event) {
    const newLine = document.createElement("div");
    newLine.classList.add("line", "unconnected");
    this.distance = setDistance();
    this.slope = this.getSlopeInDegrees();
    newLine.setAttribute("id", `${currentDotId}-line`);
    newLine.style.position = `absolute`;
    newLine.style.left = `${this.start.x}px`;
    newLine.style.top = `${this.start.y}px`;
    newLine.style.width = `${this.distance}px`;
    newLine.style.transformOrigin = `-0%`;
    newLine.style.transform = `rotate(${this.slope}deg)`;
    grid.appendChild(newLine);
    this.element = newLine;
    newLine.setAttribute("lineId", `${currentDotId}-line`);
    newLine.setAttribute("endLineId", `${endDotId}-line`);
  }
  removeLine() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  getCenter(event) {
    let center = {
      x: event.target.offsetLeft + event.target.offsetWidth / 2,
      y: event.target.offsetTop + event.target.offsetHeight / 2 - 5,
    };
    return center;
  }
  getSlopeInDegrees() {
    let slopeInRadian = Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    );
    this.slope = (slopeInRadian * 180) / Math.PI;
    return this.slope;
  }
  setLineId(currentDotId) {
    this.id = `${currentDotId}-line`;
  }
  setLineEndDotId(endDotId) {
    this.endLineId = `${endDotId}-line`;
  }
}

// Functions

const lines = [];

function clearLines() {
  if (document.querySelector(".unconnected")) {
    const allLines = document.querySelectorAll(".unconnected");
    allLines.forEach((line) => {
      line.remove();
    });
  }
}
function draw(event) {
  clearLines();
  lines.forEach((x) => {
    line.drawLine(event);
  });
}

// Creates new line
const line = new Connector();

function getEventTargetID(event) {
  currentDotId = event.target.id;
  return currentDotId;
}
function getEndDotID(event) {
  endDotId = event.target.id;
  return endDotId;
}

function removeUnconnectedLines() {
  const unconnectedLines = document.querySelectorAll(".unconnected");

  unconnectedLines.forEach((line) => {
    line.remove();
  });
}

function onMouseDown(event) {
  event.preventDefault();
  event.stopPropagation();
  line.buttonDown();
  currentDotId;
  scoreDisplay.classList.remove("pulse");

  getEventTargetID(event);
  event.target.classList.remove("correctPulse");
  console.log(correctDotsAndLines);
  if (correctDotsAndLines.includes(`${currentDotId}`)) {
    event.target.classList.add("correctPulse");
    event.preventDefault();
    return;
  }
  if (finalLinesIdArray.includes(`${currentDotId}-line`)) {
    finalLinesIdArray.splice(
      finalLinesIdArray.indexOf(`${currentDotId}-line`),
      1
    );
  }
  if (currentLinesIdArray.includes(`${currentDotId}-line`)) {
    currentLinesIdArray.splice(
      currentLinesIdArray.indexOf(`${currentDotId}-line`),
      1
    );
  }

  if (line.isPressed) {
    getEventTargetID(event);
    let allLines = document.querySelectorAll(".line");
    allLines.forEach((item) => {
      if (currentDotIdArray.includes(currentDotId)) {
        if (item.id === `${currentDotId}-line`) {
          item.remove();
          let currentDotIdToBeRemoved = currentDotIdArray.indexOf(currentDotId);
          currentDotIdArray.splice(currentDotIdToBeRemoved, 1);
          let currentLineIdToBeRemoved = currentLinesIdArray.indexOf(
            `${currentDotId}-line`
          );
          currentLinesIdArray.splice(currentLineIdToBeRemoved, 1);
          if (correctDotsAndLines.includes(currentDotId)) {
            console.log(currentLinesIdArray);
            removeCorrectPulseEffect();
            console.log(`CorrectArray: ${correctDotsAndLines}`);
            correctDotsAndLines.splice(
              correctDotsAndLines.indexOf(currentDotId),
              1
            );

            addCorrectPulseEffect();
            console.log(`CorrectArray: ${correctDotsAndLines}`);
          }
        }
      }
    });
  }
  if (!currentDotIdArray.includes(currentDotId)) {
    event.target.setAttribute("line-id", `${currentDotId}-line`);
    line.text = event.target.getAttribute("txt");
    line.start = {};
    line.getStartPosition(event);
    line.end = {};
    line.getEndPosition(event);
    draw();
    line.setLineId(currentDotId);
  }
}

function onMouseMove(event) {
  event.preventDefault();
  event.stopPropagation();
  const bodyRect = appContainer.getBoundingClientRect();
  if (line.isPressed && !currentDotIdArray.includes(currentDotId)) {
    if (line.start) {
      line.end = {
        x: event.clientX - bodyRect.left,
        y: event.clientY - bodyRect.top,
      };
      draw();
      lines.pop();
      lines.push(document.querySelector(".unconnected"));
    }
  }
}

function onMouseUp(event) {
  event.preventDefault();
  event.stopPropagation();
  line.buttonUp();
  if (
    !line.isPressed &&
    event.target.classList.contains("end-target") &&
    !currentDotIdArray.includes(currentDotId)
  ) {
    getEndDotID(event);
    if (endDotsIdArray.includes(event.target.id)) {
      endDotsIdArray.splice(endDotsIdArray.indexOf(event.target.id), 1);
      finalLinesIdArray.splice(
        finalLinesIdArray.indexOf(`${event.target.id}-line`),
        1
      );
    }
    // the following lines set the dataset line-id for dots and the enclosures separately
    line.setLineEndDotId(endDotId);
    if (event.target.classList.contains("dot")) {
      event.target.setAttribute("line-id", `${line.id}`);
    } else if (event.target.classList.contains("dot-enclosure")) {
      event.target.children[0].setAttribute("line-id", `${line.id}`);
    }

    // these lines set the parameters for the line to be drawn in its final position; the slope and length of the line are calculated based on which event it lands on
    line.slope = line.getSlopeInDegrees(event);
    line.end = getCenterOfTarget(event);

    // these lines select all the lines marked as 'final' then remove them from the DOM if any of the endLineIds are the same as the current target's id. this prevents multiple lines from being connected to the same end-dot
    let allLines = document.querySelectorAll(".final");
    allLines.forEach((item) => {
      if (item.getAttribute("endLineId").slice(0, 5) === event.target.id) {
        if (item.id !== `${currentDotId}-line`) {
          item.remove();
          let currentDotIdToBeRemoved = currentDotIdArray.indexOf(
            item.id.slice(0, 5)
          );
          currentDotIdArray.splice(currentDotIdToBeRemoved, 1);
          let currentLinesIdToBeRemoved = currentLinesIdArray.indexOf(item.id);
          currentLinesIdArray.splice(currentLinesIdToBeRemoved, 1);

          const orphanedStartDots = document.querySelectorAll(
            ".start-dot.correctPulse"
          );

          orphanedStartDots.forEach((item) => {
            if (!currentLinesIdArray.includes(`${item.id}-line`)) {
              item.classList.remove("correctPulse");
              correctDotsAndLines.splice(
                correctDotsAndLines.indexOf(item.id),
                1
              );
            }
          });

          let finalLinesIdToBeRemoved = finalLinesIdArray.indexOf(
            `${endDotId}-line`
          );
          finalLinesIdArray.splice(finalLinesIdToBeRemoved, 1);

          draw();
        }
      }
    });

    // these lines transfer a line from being unconnected and blue in color, to being 'connected' which is actually an intermediary step on the way to being 'final', and white in color; also, 'connected' essentially just means 'drawn' and are static on the board, as opposed to the 'unconnected' lines which are still being draged by the user
    line.element.classList.remove("unconnected");
    line.element.classList.add("connected");
    let allExtraLines = document.querySelectorAll(".connected");
    let allFinalLines = document.querySelectorAll(".unconnected");

    // the 'connected' lines above are removed
    allExtraLines.forEach((item) => {
      item.remove();
    });

    // the 'final lines' are given the 'final' class and are made white in color; all others are removed
    // this only works if the item is not included in the finalLinesIdArray
    if (!finalLinesIdArray.includes(`${endDotId}-line`)) {
      draw();
      allExtraLines = document.querySelectorAll(".connected");
      allFinalLines = document.querySelectorAll(".unconnected");
      allFinalLines.forEach((item) => {
        item.classList.add("final");
        item.classList.remove("unconnected");
        item.classList.remove("connected");
      });
      // the below seems to be redundant...its necessity will have to be checked later (2024.4.21)
      allExtraLines.forEach((item) => {
        item.remove();
      });

      // these lines remove lines marked as 'final' from the DOM and from their associated arrays if their dataset id matches the target id
      allLines = document.querySelectorAll(".final");
      allLines.forEach((item) => {
        if (item.dataset.id === event.target.id) {
          item.remove();
          let currentDotIdToBeRemoved = currentDotIdArray.indexOf(currentDotId);
          currentDotIdArray.splice(currentDotIdToBeRemoved, 1);
          let currentLinesIdToBeRemoved = currentLinesIdArray.indexOf(item.id);
          currentLinesIdArray.splice(currentLinesIdToBeRemoved, 1);
          let endDotsIdToBeRemoved = endDotsIdArray.indexOf(event.target.id);
          endDotsIdArray.splice(endDotsIdToBeRemoved);
          let finalLinesToBeRemoved = endDotsIdArray.indexOf(
            `${event.target.id}-line`
          );
          finalLinesIdArray.splice(finalLinesToBeRemoved);

          const orphanedEndDots = document.querySelectorAll(
            ".end-dot.correctPulse"
          );

          orphanedEndDots.forEach((item) => {
            if (!finalLinesIdArray.includes(`${item.id}-line`)) {
              console.log(item.id);
              item.classList.remove("correctPulse");
              correctDotsAndLines.splice(
                correctDotsAndLines.indexOf(item.id),
                1
              );
            }
          });
        }
      });
      endDotsIdArray.push(endDotId);
      currentDotIdArray.push(currentDotId);
      currentLinesIdArray.push(line.id);
      finalLinesIdArray.push(line.element.getAttribute("endlineid"));
      console.log(currentLinesIdArray);
    } else if (!line.isPressed) {
      removeUnconnectedLines();
      lines.pop();
      return;
    }
  }
  event.preventDefault();
  correctMatch(event);
}

function onMouseUpFalse() {
  line.buttonUp();
  if (!line.isPressed) {
    removeUnconnectedLines();
    lines.pop();
    return;
  }
  if (!line.isPressed) {
    removeUnconnectedLines();
    lines.pop();
    return;
  }
}

function getCenterOfTarget(event) {
  let target = event.target.getBoundingClientRect();
  const bodyRect = body.getBoundingClientRect();
  let center = {
    x: event.target.offsetLeft + event.target.offsetWidth / 2,
    y: event.target.offsetTop + event.target.offsetHeight / 2 - 5,
  };
  return center;
}

function setDistance() {
  let lineLength = Math.sqrt(
    (line.start.x - line.end.x) ** 2 + (line.start.y - line.end.y) ** 2
  );
  return lineLength;
}

// Event Listeners
function activateEventListeners() {
  const startTargets = document
    .querySelectorAll(".start-target")
    .forEach((target) => {
      target.addEventListener("pointerdown", onMouseDown, false);
    });
  const endTargets = document
    .querySelectorAll(".end-target")
    .forEach((target) => {
      target.addEventListener("pointerup", onMouseUp, false);
    });

  appContainer.addEventListener("pointerup", onMouseUpFalse, false);
  appContainer.addEventListener("pointermove", onMouseMove, false);
}

export { alphabetMatchingApp };
