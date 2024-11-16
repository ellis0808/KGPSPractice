import {
  primaryMenuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../utilities/variables.js";
import { menuItems } from "../general/start-main-app.js";
import { score } from "../../utilities/score-object.js";
import { timer, toggleTimerHide } from "../../utilities/timer-object.js";
import {
  scoreDisplay,
  toggleScoreDisplayHide,
  updateNegativeCount,
  updatePositiveCount,
} from "../../utilities/update-score.js";
import {
  dotAndLineCommand,
  startDot,
  endDot,
  Connector,
} from "./dot-objects-control.js";
import { sessionCheck, sessionData } from "../../login/session-check.js";
import { user } from "../../utilities/user-object.js";
import {
  style,
  activityId,
  setStyle,
} from "./matching-set-style-and-activity-id.js";
import {
  createDots,
  generateLetterDivsForMatching,
  letterSetGenerator,
  shuffle,
} from "./generate-grid-items.js";
import { audio } from "../../utilities/audio.js";
import { pauseFunction } from "../../utilities/pause-function.js";

console.log("test");

const matchingStructureElements = {
  createMainStructureElements: function () {
    this.appContainer = document.createElement("div");
    this.grid = document.createElement("div");
    this.btnContainer1 = document.createElement("div");
    this.btnContainer2 = document.createElement("div");
    this.btnContainer4 = document.createElement("div");
    this.leftMenuContainer = document.createElement("div");
    this.homeBtnContainer = document.createElement("div");
    this.appContainer.classList.add("container", "letter-matching-app");
    this.grid.classList.add("grid", "letter-matching-app");
    this.btnContainer1.classList.add("btn-container1");
    this.btnContainer2.classList.add("btn-container2");
    this.btnContainer4.classList.add("btn-container4");
    this.homeBtnContainer.classList.add(
      "home-btn-container",
      "hide",
      "letter-matching-app"
    );
    this.leftMenuContainer.classList.add(
      "left-menu-container",
      "letter-matching-app"
    );
  },
  setMainStructureElements: function () {
    mainContainer.appendChild(this.appContainer);
    this.appContainer.appendChild(this.leftMenuContainer);
    this.appContainer.appendChild(this.btnContainer1);
    this.appContainer.appendChild(this.btnContainer2);
    this.appContainer.appendChild(this.btnContainer4);
    this.appContainer.appendChild(this.grid);
    this.appContainer.appendChild(this.homeBtnContainer);
  },
  creaGridStructureElements: function () {
    this.startRowContainer = document.createElement("div");
    this.endRowContainer = document.createElement("div");
    this.startDotsContainer = document.createElement("div");
    this.endDotsContainer = document.createElement("div");
    this.startRowContainer.classList.add("capitals");
    this.endRowContainer.classList.add("lowercase");
    this.startDotsContainer.classList.add("start-dot-div");
    this.endDotsContainer.classList.add("end-dot-div");
  },
  setGridStructureElements: function () {
    this.grid.appendChild(this.startRowContainer);
    this.grid.appendChild(this.endRowContainer);
    this.grid.appendChild(this.startDotsContainer);
    this.grid.appendChild(this.endDotsContainer);
  },
  createStartScreenElements: function () {
    this.startBtn = document.createElement("button");
    this.exitBtn = document.createElement("div");
    this.startBtn.setAttribute("id", "start-btn");
    this.startBtn.classList.add("letter-matching-app");
    this.startBtn.textContent = "Start";
    this.exitBtn.setAttribute("id", "exit-btn");
    this.exitBtn.classList.add("letter-matching-app", "hide");
    matchingStructureElements.exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
    this.exitBtn.addEventListener("click", endApp);
  },
  setStarScreenElements: function () {
    this.btnContainer2.appendChild(this.startBtn);
    this.btnContainer2.appendChild(this.exitBtn);
  },
  createEndContainerElements: function () {
    this.appContainer = document.createElement("div");
    this.grid = document.createElement("div");
    this.btnContainer1 = document.createElement("div");
    this.btnContainer2 = document.createElement("div");
    this.startBtn = document.createElement("button");
    this.exitBtn = document.createElement("div");
    this.startRowContainer = document.createElement("div");
    this.endRowContainer = document.createElement("div");
    this.startDotsContainer = document.createElement("div");
    this.endDotsContainer = document.createElement("div");
    this.leftMenuContainer = document.createElement("div");
    this.tryAgainBtn = document.createElement("div");
    this.finishBtn = document.createElement("div");
    this.homeBtnContainer = document.createElement("div");
    this.startDotsContainer = document.createElement("div");
  },
};

/* SCORING */
const correctAnswerPoints = 1;
const incorrectAnswerPoints = 1;

scoreDisplay.textContent = `${score.currentScore}`;

const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn", "button");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startNewSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn", "button");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

const homeBtn = document.createElement("button");
homeBtn.classList.add("home-btn");
homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
homeBtn.addEventListener("click", goHome);
// matchingStructureElements.homeBtnContainer.appendChild(homeBtn);

const reallyGoHomeContainer = document.createElement("div");
reallyGoHomeContainer.classList.add("go-home-container", "letter-matching-app");
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

let endDotId;
let startDotId;

let appStarted = false;

let numberOfItemsToBeDisplayed = 4;
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
const elements = {
  items: document.querySelectorAll(".btn-container1, .grid"),
  getElements() {
    this.items = document.querySelectorAll(".btn-container1, .grid");
    console.log(this.items);
    return this.items;
  },
};
function matchingApp(set) {
  sessionCheck();
  pauseFunction.unpause();
  setStyle(set);
  matchingStructureElements.createMainStructureElements();
  matchingStructureElements.createStartScreenElements();
  matchingStructureElements.setStarScreenElements();
  matchingStructureElements.creaGridStructureElements();
  matchingStructureElements.setMainStructureElements();
  matchingStructureElements.grid.classList.add("gridHide");
  matchingStructureElements.setGridStructureElements();
  stylesheet.setAttribute(
    "href",
    "/KGPSEnglishPractice-test/resources/css/matching.css"
  );

  menuItems.removeMenuPage();

  setTimeout(displayStartBtn, 200);

  score.resetScore();
  resetTimer();
  scoreDisplay.innerText = score.currentScore;

  matchingStructureElements.appContainer.classList.remove("hide");
  if (!scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }
  if (!timer.classList.contains("hide2")) {
    toggleTimerHide();
  }

  setTimeout(setUser, 2000);
  elements.getElements();
  console.log(elements.items);
}

function endApp() {
  endSession();
  setTimeout(() => {
    document.querySelectorAll(".letter-matching-app").forEach((item) => {
      item.remove();
    });
    setTimeout(() => {
      stylesheet.setAttribute(
        "href",
        "/KGPSEnglishPractice-test/resources/css/styles.css"
      );
      menuItems.displayMainPage();
      setTimeout(menuItems.restoreMainMenu, 100);
    }, 500);
  }, 500);
  resetTimer();
  scoreDisplay.innerText = score.currentScore;
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
  homeBtn.removeEventListener("pointerdown", returnToApp);
  homeBtn.addEventListener("pointerdown", goHome);
  pauseBtn.removeEventListener("pointerdown", returnToApp);
  pauseBtn.addEventListener("pointerdown", pauseFunction.isPaused);
  homeBtnReturnToNormal();
}
function goHome() {
  pauseFunction.pause();
  homeBtnEnlarge();
  displayGoHomeConfirmation();
  if (homeBtnIsGoHome) {
    homeBtnIsGoHome = false;
    homeBtn.removeEventListener("click", goHome);
    homeBtn.addEventListener("click", returnToApp);
    returnToApp();
  }
}
function homeBtnEnlarge() {
  homeBtn.classList.add("home-btn-enlarge");
}
function homeBtnReturnToNormal() {
  homeBtn.classList.remove("home-btn-enlarge");
}
function displayGoHomeConfirmation() {
  matchingStructureElements.btnContainer4.appendChild(reallyGoHomeContainer);
  reallyGoHomeContainer.appendChild(reallyGoHomeBtn);
  reallyGoHomeContainer.appendChild(cancelGoHomeBtn);
}
function returnToApp() {
  matchingStructureElements.btnContainer4.removeChild(reallyGoHomeContainer);
  homeBtnReturnToNormal();
  pauseFunction.unpause();
  homeBtnIsGoHome = true;
  homeBtn.removeEventListener("click", returnToApp);
  homeBtn.addEventListener("click", goHome);
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
function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
}

async function updateUserTotalScore() {
  //  For student users; teachers will differ on user type, etc
  const newScore = {
    activity_id: activityId,
    user_id: user.id,
    user_type: user.access,
    correct_answer_count: 0,
    incorrect_answer_count: 0,
    time_to_correct_answer_duration_in_seconds: 0,
    answer_attempts: 0,
    activity_score: score.currentScore,
  };
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/add_user_activity_record.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScore),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
}

/*
*******
II. SESSIONS & ROUNDS
*******
*/

function displayStartBtn() {
  // matchingStructureElements.startBtn.textContent = "Start";
  // matchingStructureElements.btnContainer2.appendChild(exitBtn);
  if (
    matchingStructureElements.startBtn.classList.contains("no-touch") ||
    matchingStructureElements.startBtn.classList.contains("spinfade")
  ) {
    matchingStructureElements.startBtn.classList.remove("no-touch");
    matchingStructureElements.startBtn.classList.remove("spinfade");
    matchingStructureElements.exitBtn.classList.remove("no-touch");
    matchingStructureElements.exitBtn.classList.remove("hide2");
  }
  matchingStructureElements.exitBtn.classList.remove("hide");
  matchingStructureElements.startBtn.addEventListener("click", startSession);
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
  pauseFunction.unpause();
  homeBtnReturnToNormal();
  resetNavigationBtns();
  matchingStructureElements.appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  document.querySelectorAll(".letter-matching-app, .line").forEach((item) => {
    item.remove();
  });
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  appStarted = false;
  removeBlur();
  clearBoard();
  toggleScoreDisplayHide();
  toggleTimerHide();
}

function removeEndMessagesContainer() {
  if (document.querySelector(".end-messages-container")) {
    tryAgainBtn.classList.add("no-touch");
    finishBtn.classList.add("no-touch");
    document.querySelector(".end-messages-container").remove();
  }
}

function startSession() {
  audio.navigationSfx.startApp.play();
  removeEndMessagesContainer();
  matchingStructureElements.startBtn.classList.add("no-touch");
  matchingStructureElements.startBtn.classList.add("spinfade");
  matchingStructureElements.exitBtn.classList.remove("intro");
  matchingStructureElements.exitBtn.classList.add("no-touch");
  matchingStructureElements.exitBtn.classList.add("hide2");
  matchingStructureElements.exitBtn.classList.remove("intro");
  setTimeout(startNewRound, 950);
  setTimeout(() => {
    appStarted = true;
  }, 1);
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
    matchingStructureElements.grid.classList.remove("blur");
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
  if (scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }
  if (timer.classList.contains("hide2")) {
    toggleTimerHide();
  }
  matchingStructureElements.homeBtnContainer.classList.remove("hide");
  matchingStructureElements.grid.classList.remove("blur");
  timer.classList.remove("blur");
  scoreDisplay.classList.remove("blur");
  setTimeout(() => {
    letterSetGenerator();
    const shuffledAlphabetCapitals = shuffle(alphabetCapitals);
    generateLetterDivsForMatching(shuffledAlphabetCapitals);
    generateLetterDivsForMatching(alphabetLowercase);
    createDots(shuffledAlphabetCapitals);
    createDots(alphabetLowercase);
    matchingStructureElements.btnContainer1.appendChild(timer);
    matchingStructureElements.btnContainer1.appendChild(scoreDisplay);
    matchingStructureElements.homeBtnContainer.appendChild(homeBtn);
    matchingStructureElements.homeBtnContainer.appendChild(
      pauseFunction.pauseBtn
    );
    setTimeout(() => {
      activateEventListeners();
    }, 200);
    setTimeout(() => {
      enableTouch();
    }, 300);
    setTimeout(() => {
      matchingStructureElements.grid.classList.remove("gridHide");
    }, 100);
    elements.getElements();
    console.log(elements.items);
  }, 1000);
}

/*
A. Overall Function
*/
function roundOver() {
  disableTouch();
  setTimeout(displayEndMessagesContainer, 600);
  setTimeout(disableTouch, 500);
  setTimeout(disableTouch, 1000);
  matchingStructureElements.grid.classList.add("blur");
  timer.classList.add("blur");
  scoreDisplay.classList.add("blur");
}

/*
B. Clearing the Grid & Resetting Arrays
*/
function clearBoard() {
  setTimeout(() => {
    matchingStructureElements.grid.classList.add("gridHide");
  }, 50);
  setTimeout(() => {
    correctDotsAndLines.length = 0;
    currentDotIdArray.length = 0;
    currentLinesIdArray.length = 0;
    alphabetLowercase.length = 0;
    alphabetCapitals.length = 0;
    const dotsAndLines = document.querySelectorAll("[contentId],.dot,.line");
    dotsAndLines.forEach((item) => {
      item.remove();
    });
    clearArrays();
    dotAndLineCommand.clearArrays();
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
function displayEndMessagesContainer() {
  score.updateUserScore();
  updateUserTotalScore();
  const btnContainer5 = document.createElement("div");
  btnContainer5.classList.add("btn-container5");
  const endMessagesContainer = document.createElement("div");
  endMessagesContainer.classList.add(
    "end-messages-container",
    "letter-matching-app"
  );
  matchingStructureElements.appContainer.appendChild(btnContainer5);
  btnContainer5.appendChild(endMessagesContainer);
  const finalScoreAssessment = document.createElement("div");
  finalScoreAssessment.classList.add("final-score-assessment");
  const finalScoreAlertScore = document.createElement("div");
  finalScoreAlertScore.classList.add("final-score-alert-score");

  switch (true) {
    case score.currentScore < 5:
      finalScoreAssessment.innerText = "Better Luck\r\nNext Time!";
      break;
    case score.currentScore > 31:
      finalScoreAssessment.innerText = "Outstanding!";
      break;
    case score.currentScore > 27:
      finalScoreAssessment.innerText = "Amazing!";
      break;
    case score.currentScore > 23:
      finalScoreAssessment.innerText = "Excellent!";
      break;
    case score.currentScore > 18:
      finalScoreAssessment.innerText = "Great Job!";

      break;
    case score.currentScore > 13:
      finalScoreAssessment.innerText = "Good Job!";
      break;
  }
  finalScoreAlertScore.innerText = `${score.currentScore}`;
  endMessagesContainer.appendChild(finalScoreAssessment);
  endMessagesContainer.appendChild(finalScoreAlertScore);
  endMessagesContainer.appendChild(tryAgainBtn);
  endMessagesContainer.appendChild(finishBtn);
  score.updateUserScore();
  setTimeout(() => {
    switch (true) {
      case score.currentScore < 5:
        audio.feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
        break;
      case score.currentScore > 31:
        audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
        break;
      case score.currentScore > 27:
        audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
        break;
      case score.currentScore > 23:
        audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
        break;
      case score.currentScore > 18:
        audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
        break;
      case score.currentScore > 13:
        audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
        break;
    }
  }, 300);
}

/*
*******
. ANSWER EVALUATION
*******
*/

/*
A. Checking for Correct Answers
*/

/*
B. Checking If All Letters Are Correctly Matched
*/
function checkAllCorrect() {
  const allCorrectDots = document.querySelectorAll(
    ".start-dot.pulse.white-ring"
  );
  if (allCorrectDots.length === numberOfItemsToBeDisplayed) {
    setTimeout(() => {
      updatePositiveCount(allCorrectDots.length * correctAnswerPoints);
      scoreDisplay.classList.add("pulse");
      audio.appSfx.correct.play();
      setTimeout(randomFeedback, 500);
    }, 500);
    setTimeout(() => {
      disableTouch();
      continueToNextRound();
    }, 1000);
  }
}

let positiveFeedbackAudioObjects = [];
let negativeFeedbackAudioObjects = [];
function randomFeedback() {
  Object.keys(audio.feedbackAudioObject.positiveFeedback).forEach((object) => {
    if (!positiveFeedbackAudioObjects.includes(object)) {
      if (object === "greatJob" || object === "goodJob") {
        positiveFeedbackAudioObjects.push(object);
      }
    }
  });
  Object.keys(audio.feedbackAudioObject.positiveFeedback).forEach((object) => {
    if (!negativeFeedbackAudioObjects.includes(object)) {
      negativeFeedbackAudioObjects.push(object);
    }
  });

  let randomFeedbackNumber = Math.floor(
    Math.random() * positiveFeedbackAudioObjects.length
  );
  audio.feedbackAudioObject.positiveFeedback[
    positiveFeedbackAudioObjects[randomFeedbackNumber]
  ].sound.play();
}
function continueToNextRound() {
  if (!pauseFunction.isPaused) {
    setTimeout(() => {
      clearBoard();
    }, 1000);
    setTimeout(() => {
      startNewRound();
    }, 1500);
  }
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
    if (!pauseFunction.isPaused) {
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
  const allTargets = document.querySelectorAll(
    ".dot,.dot-enclosure,.capitals,.lowercase"
  );
  allTargets.forEach((target) => {
    target.classList.add("no-touch");
  });
}
function enableTouch() {
  const allTargets = document.querySelectorAll(".no-touch");
  allTargets.forEach((target) => {
    target.classList.remove("no-touch");
  });
}
/*
*******
IV. ROUND OVER
*******
*/

function revertToDefault(event) {
  if (!event.target.getAttribute("line-id")) {
  }
}

const correctArray = [];

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
    dotAndLineCommand.registerConnector(line);
    line.drawLine(event);
  });
}

// Creates new line
const line = new Connector();

function getEventTargetID(event) {
  currentDotId = event.target.id;
  return currentDotId;
}
function getStartDotID(event) {
  startDotId = event.target.id;
  return startDotId;
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

/*   Pointer DOWN EVENT  */

let currentStartDot = null;
let currentEndDot = null;

function onPointerDown(event) {
  event.preventDefault();
  event.stopPropagation();

  currentStartDot = null;
  currentEndDot = null;
  if (currentStartDot === null && currentEndDot === null) {
    if (event.target.classList.contains("end-target")) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }

      currentEndDot = Number(event.target.id - numberOfItemsToBeDisplayed);

      if (endDot[currentEndDot].connected) {
        document
          .querySelector(`[enddotid="${endDot[currentEndDot].id}"]`)
          .remove();
        endDot[currentEndDot].disconnect();
      }

      endDot[currentEndDot].makeActive();

      getEndDotID(event);

      line.buttonDown();

      currentDotId;
      getEventTargetID(event);
      scoreDisplay.classList.remove("pulse");

      if (
        !currentDotIdArray.includes(endDot[currentEndDot]) +
        numberOfItemsToBeDisplayed
      ) {
        line.start = {};
        line.getStartPosition(event);
        line.end = {};
        line.getEndPosition(event);
        draw();
      }
      return currentEndDot;
    } else if (event.target.classList.contains("start-target")) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }
      currentStartDot = null;
      currentEndDot = null;

      currentStartDot = event.target.id;

      if (startDot[currentStartDot].connected) {
        document
          .querySelector(`[startdotid="${startDot[currentStartDot].id}"]`)
          .remove();
        startDot[currentStartDot].disconnect();
      }

      startDot[currentStartDot].makeActive();

      getStartDotID(event);

      line.buttonDown();

      currentDotId;
      scoreDisplay.classList.remove("pulse");

      getEventTargetID(event);

      if (!currentDotIdArray.includes(startDot[currentStartDot])) {
        line.getContentId(startDot[currentStartDot]);
        line.start = {};
        line.getStartPosition(event);
        line.end = {};
        line.getEndPosition(event);
        draw();
      }

      return currentStartDot;
    }
  }
}

/*   Pointer MOVE EVENT  */

function onPointerMove(event) {
  event.preventDefault();
  event.stopPropagation();
  if (currentEndDot) {
    if (event.target.hasPointerCapture(event.pointerId)) {
      event.target.releasePointerCapture(event.pointerId);
    }

    const bodyRect = body.getBoundingClientRect();
    if (
      line.isPressed &&
      currentEndDot !== null &&
      !currentDotIdArray.includes(currentDotId)
    ) {
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
  } else if (currentStartDot) {
    if (event.target.hasPointerCapture(event.pointerId)) {
      event.target.releasePointerCapture(event.pointerId);
    }
    const bodyRect = body.getBoundingClientRect();
    if (
      line.isPressed &&
      currentStartDot !== null &&
      !currentDotIdArray.includes(currentDotId)
    ) {
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
}

/*   Pointer UP EVENT  */

function onPointerUp(event, startDotId, endDotId) {
  event.preventDefault();
  event.stopPropagation();
  if (currentEndDot) {
    currentStartDot = null;
    getStartDotID(event);
    try {
      line.element.setAttribute("startdotid", startDotId);
    } catch (error) {
      return;
    }
    if (event.target.classList.contains("end-target")) {
      onPointerUpFalse();
    }
    if (event.target.classList.contains("start-target")) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }

      currentStartDot = Number(event.target.id);
      const newStartDot = startDot[currentStartDot];
      endDot[currentEndDot].makeInactive();
      if (newStartDot.connectedToLine) {
        const oldLine = document
          .querySelectorAll("[startdotid]")
          .forEach((item) => {
            if (item.getAttribute("startdotid") === event.target.id) {
              const thing = item.getAttribute("startdotid");
              item.remove();
              startDot[thing].disconnect();
            }
          });
      }

      line.connectFromEndToStart(newStartDot, endDot[currentEndDot], event);
      newStartDot.connect(endDot[currentEndDot], line);

      draw();
      line.buttonUp();
      if (
        !line.isPressed &&
        event.target.classList.contains("start-target") &&
        !currentDotIdArray.includes(currentDotId)
      ) {
        const oldlines = document.querySelectorAll(".unconnected");
        if (oldlines.length > 0) {
          oldlines[0].classList.remove("unconnected");
          oldlines[0].classList.add("final");
        }
        const oldlines2 = document
          .querySelectorAll(".unconnected")
          .forEach((item) => {
            item.remove();
          });
      } else if (!line.isPressed) {
        removeUnconnectedLines();
        lines.pop();
        return;
      }
      event.preventDefault();
      return;
    }

    currentEndDot = null;
    currentStartDot = null;
  } else if (currentStartDot) {
    currentEndDot = null;
    getEndDotID(event);
    if (event.target.classList.contains("start-target")) {
      onPointerUpFalse();
    }
    if (event.target.classList.contains("end-target")) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }
      currentEndDot = Number(event.target.id - 4);
      const newEndDot = endDot[currentEndDot];
      startDot[currentStartDot].makeInactive();
      if (newEndDot.connectedToLine) {
        const oldLine = document
          .querySelectorAll("[enddotid]")
          .forEach((item) => {
            if (item.getAttribute("enddotid") === event.target.id) {
              const thing = item.getAttribute("enddotid");
              item.remove();
              endDot[thing - 4].disconnect();
            }
          });
      }

      line.connectFromStartToEnd(startDot[currentStartDot], newEndDot, event);
      newEndDot.connect(startDot[currentStartDot], line);
      lines.pop();
      draw();
      line.buttonUp();
      if (
        !line.isPressed &&
        event.target.classList.contains("end-target") &&
        !currentDotIdArray.includes(currentDotId)
      ) {
        getEndDotID(event);
        const oldlines = document.querySelectorAll(".unconnected");
        oldlines[0].classList.remove("unconnected");
        oldlines[0].classList.add("final");
        const oldlines2 = document
          .querySelectorAll(".unconnected")
          .forEach((item) => {
            item.remove();
          });
      } else if (!line.isPressed) {
        removeUnconnectedLines();
        lines.pop();
        return;
      }
    }
    event.preventDefault();
    return;
  }
  currentStartDot = null;
  currentEndDot = null;
  return;
}

/*   FALSE Pointer UP EVENT  */
function onPointerUpFalse() {
  if (currentEndDot) {
    if (line.isPressed) {
      endDot[currentEndDot].makeInactive();
      currentEndDot = null;
      line.buttonUp();
      if (!line.isPressed) {
        removeUnconnectedLines();
        lines.pop();
        currentEndDot = null;
        return;
      }
    }
  } else if (currentStartDot) {
    if (line.isPressed) {
      startDot[currentStartDot].makeInactive();
      currentStartDot = null;
      line.buttonUp();
      if (!line.isPressed) {
        removeUnconnectedLines();
        lines.pop();
        currentStartDot = null;
        return;
      }
    }
    currentStartDot = null;
  }
}

let oldLines5;
function updateLinePositions() {
  lines.length = 0;
  redrawAllLines();
}

function redrawAllLines() {
  getOldLines2();

  draw();
  document.querySelectorAll(".unconnected").forEach((line) => {
    line.classList.add("final");
  });
}
function getOldLines2() {
  startDot.forEach((item) => {
    if (item.connected) {
      item.connectedToLine.element.remove();
      let startCenter;
      let endCenter;
      startCenter = item.connectedToLine.getCenter2(item);

      item.connectedToLine.element.style.left = `${startCenter.x}px`;
      item.connectedToLine.element.style.top = `${startCenter.y}px`;

      item.connectedToLine.getEndPosition2(item.connectedTo);
      item.connectedToLine.drawLine();
      lines.push(item.connectedToLine.element);
    }
  });
}
function getOldLines() {
  document.querySelectorAll(".final").forEach((line) => {
    const startDotId = Number(line.getAttribute("startdotid"));
    const endDotId = Number(line.getAttribute("enddotid")) - 4;
    if (startDotId < 4) {
      startDot[startDotId].connectedToLine.getStartPosition2(
        startDot[startDotId]
      );
      endDot[endDotId].connectedToLine.getEndPosition2(endDot[endDotId]);
      lines.length = 0;

      lines.push(startDot[startDotId].connectedToLine);
    }
    line.remove();
  });
}

// Event Listeners
function activateEventListeners() {
  setTimeout(() => {
    const startTargets = document.querySelectorAll(
      ".start-target, .end-target"
    );
    startTargets.forEach((target) => {
      target.addEventListener("pointerdown", onPointerDown, false);
      target.addEventListener("pointerup", onPointerUp, false);
    });
  }, 1);
  mainContainer.addEventListener("pointerup", onPointerUpFalse, false);
  mainContainer.addEventListener("pointermove", onPointerMove, false);
  // window.addEventListener("resize", updateLinePositions);
}
function createDoubleTapPreventer(timeout_ms) {
  let dblTapTimer = 0;
  let dblTapPressed = false;

  return function (e) {
    clearTimeout(dblTapTimer);
    if (dblTapPressed) {
      e.preventDefault();
      dblTapPressed = false;
    } else {
      dblTapPressed = true;
      dblTapTimer = setTimeout(() => {
        dblTapPressed = false;
      }, timeout_ms);
    }
  };
}

document.body.addEventListener("touchstart", createDoubleTapPreventer(500), {
  passive: false,
});

export {
  matchingApp,
  checkAllCorrect,
  alphabetCapitals,
  alphabetLowercase,
  currentDotId,
  endDotId,
  startDotId,
  lines,
  numberOfItemsToBeDisplayed,
  elements,
  matchingStructureElements,
};
