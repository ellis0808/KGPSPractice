import {
  primaryMenuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../utilities/variables.js";
import { menuItems } from "../general/start-main-app.js";
import { score } from "../../utilities/score.js";
import { timerFunction, toggleTimerHide } from "../../utilities/timer.js";
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
  itemGenerator,
  gridGenerator,
  gridItems,
  itemArrays,
} from "./generate-grid-items.js";
import { audio } from "../../utilities/audio.js";
import {
  elements,
  pauseFunction,
  toggleBlur,
  toggleTouchFunction,
} from "../../utilities/pause-functions.js";
import { appStructure } from "../../utilities/app-structure-object.js";
import { startScreen } from "../../utilities/start-screen.js";
import { alphabet } from "../card-touch/card-data.js";
import { endRoundScreen } from "../../utilities/end-round-screen.js";
import { homeBtnFunction } from "../../utilities/go-home-function.js";
console.log("matching");

const matchingAppStructure = {
  createGrid() {
    this.startRowContainer = document.createElement("div");
    this.endRowContainer = document.createElement("div");
    this.startDotsContainer = document.createElement("div");
    this.endDotsContainer = document.createElement("div");
    this.startRowContainer.classList.add("capitals");
    this.endRowContainer.classList.add("lowercase");
    this.startDotsContainer.classList.add("start-dot-div");
    this.endDotsContainer.classList.add("end-dot-div");
  },
  setGrid() {
    appStructure.grid.appendChild(this.startRowContainer);
    appStructure.grid.appendChild(this.endRowContainer);
    appStructure.grid.appendChild(this.startDotsContainer);
    appStructure.grid.appendChild(this.endDotsContainer);
  },
};

const matchingAppSessions = {
  //   appFinished = false;
  //   setAppFinishedValue(value) {
  // this.appFinished = value
  //   },
  //   getAppFinishedValue () {
  //     return this.appFinished
  //   },
  startSession() {
    audio.navigationSfx.startApp.play();
    // endRoundScreen.removeContainer();
    startScreen.removeStartScreen();
    setTimeout(startNewRound, 950);
    setTimeout(() => {
      appStarted = true;
    }, 1);
    setTimeout(() => {
      timerFunction.startTimer(10);
    }, 1000);
  },
  endSession() {
    pauseFunction.unpause();
    // homeBtnReturnToNormal();
    // resetNavigationBtns();
    appStructure.appContainer.classList.add("hide");
    appStructure.appControlsContainer.classList.add("hide");
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
    toggleBlur.removeAllBlur();
    clearBoard();
    toggleScoreDisplayHide();
    toggleTimerHide();
  },
  startRound() {},
  endRound() {
    score.updateUserScore();
    score.updateStudentTotalScore();
    endRoundScreen.displayContainer();
  },
};
/* SCORING */
const correctAnswerPoints = 1;
const incorrectAnswerPoints = 1;

scoreDisplay.textContent = `${score.currentScore}`;

let endDotId;
let startDotId;

let appStarted = false;

let numberOfItemsToBeDisplayed = 4;

let currentDotId = null;
const currentDotIdArray = [];

/*
*******
I. MAIN APP
*******
*/
const matchingAppElements = [
  ".dot,.dot-enclosure,.capitals,.lowercase,.btn-container1,.grid",
];

const matchingApp = {
  createAndSetStructure() {
    matchingAppStructure.createGrid();
    matchingAppStructure.setGrid();
  },
  setStyleSheet() {
    stylesheet.setAttribute(
      "href",
      "/KGPSEnglishPractice-test/resources/css/matching.css"
    );
  },
  setForeignElements(startSession, endApp, endRound) {
    homeBtnFunction.initialize(endApp);
    startScreen.createAndSetStartScreen(startSession, endApp);
    endRoundScreen.initializeContainer(startSession, endApp);
    appStructure.setAppControlsContainer(
      homeBtnFunction.homeBtn,
      pauseFunction.pauseBtn
    );
    timerFunction.setEndRoundFunction(endRound);
  },
  startApp(set) {
    sessionCheck();
    setStyle(set);
    appStructure.createAndSetAppStructureThenHideGrid();
    this.setForeignElements(
      matchingAppSessions.startSession,
      this.endApp,
      matchingAppSessions.endRound
    );
    this.createAndSetStructure();
    elements.getElements(matchingAppElements);
    pauseFunction.unpause();
    this.setStyleSheet();
    menuItems.removeMenuPage();

    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    homeBtnFunction.initialize();
    appStructure.appContainer.classList.remove("hide");
    if (!scoreDisplay.classList.contains("hide2")) {
      toggleScoreDisplayHide();
    }
    if (!timerFunction.timer.classList.contains("hide2")) {
      timerFunction.toggleTimerHide();
    }

    setTimeout(setUser, 2000);
    toggleBlur.removeAllBlur();
  },
  endApp() {
    score.updateUserScore();
    matchingAppSessions.endSession();
    endRoundScreen.removeContainer();
    setTimeout(() => {
      console.log(mainContainer.childNodes);
      document.querySelector(".container").remove();
      console.log(mainContainer.childNodes);
      appStructure.removeMainAppStructure();
      setTimeout(() => {
        stylesheet.setAttribute(
          "href",
          "/KGPSEnglishPractice-test/resources/css/styles.css"
        );
        menuItems.displayMainPage();
        setTimeout(menuItems.restoreMainMenu, 100);
      }, 500);
    }, 500);
    scoreDisplay.innerText = score.currentScore;
  },
};

let homeBtnIsGoHome = true;
let pauseBtnPauses = true;

// const homeBtn = document.createElement("button");
// homeBtn.classList.add("home-btn");
// homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
// homeBtn.addEventListener("click", goHome);
// appStructure.appControlsContainer.appendChild(homeBtn);

// const reallyGoHomeContainer = document.createElement("div");
// reallyGoHomeContainer.classList.add("go-home-container", "letter-matching-app");
// const reallyGoHomeMessageContainer = document.createElement("div");
// reallyGoHomeMessageContainer.classList.add("go-home-message");
// reallyGoHomeMessageContainer.textContent = "Go back to Menu?";
// reallyGoHomeContainer.appendChild(reallyGoHomeMessageContainer);
// const reallyGoHomeBtn = document.createElement("button");
// reallyGoHomeBtn.classList.add("go-home-btn");
// reallyGoHomeBtn.textContent = "Yes";
// reallyGoHomeBtn.addEventListener("click", matchingApp.endApp);
// const cancelGoHomeBtn = document.createElement("button");
// cancelGoHomeBtn.classList.add("cancel-go-home-btn");
// cancelGoHomeBtn.textContent = "Cancel";
// cancelGoHomeBtn.addEventListener("click", returnToApp);

// function resetNavigationBtns() {
//   homeBtnIsGoHome = true;
//   pauseBtnPauses = true;
//   homeBtn.removeEventListener("pointerdown", returnToApp);
//   homeBtn.addEventListener("pointerdown", goHome);

//   homeBtnReturnToNormal();
// }
// function goHome() {
//   pauseFunction.pause();
//   homeBtnEnlarge();
//   displayGoHomeConfirmation();
//   if (homeBtnIsGoHome) {
//     homeBtnIsGoHome = false;
//     homeBtn.removeEventListener("click", goHome);
//     homeBtn.addEventListener("click", returnToApp);
//     returnToApp();
//   }
// }
// function homeBtnEnlarge() {
//   homeBtn.classList.add("home-btn-enlarge");
// }
// function homeBtnReturnToNormal() {
//   homeBtn.classList.remove("home-btn-enlarge");
// }
// function displayGoHomeConfirmation() {
//   appStructure.btnContainer4.appendChild(reallyGoHomeContainer);
//   reallyGoHomeContainer.appendChild(reallyGoHomeBtn);
//   reallyGoHomeContainer.appendChild(cancelGoHomeBtn);
// }
// function returnToApp() {
//   appStructure.btnContainer4.removeChild(reallyGoHomeContainer);
//   homeBtnReturnToNormal();
//   pauseFunction.unpause();
//   homeBtnIsGoHome = true;
//   homeBtn.removeEventListener("click", returnToApp);
//   homeBtn.addEventListener("click", goHome);
// }

function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
}

/*
*******
II. SESSIONS & ROUNDS
*******
*/

function startNewRound() {
  toggleTouchFunction.enableTouch();
  if (scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }
  if (timerFunction.timer.classList.contains("hide2")) {
    timerFunction.toggleTimerHide();
  }
  appStructure.appControlsContainer.classList.remove("hide");
  toggleBlur.removeWeakBlur();
  scoreDisplay.classList.remove("blur");
  setTimeout(() => {
    gridItems.loadAndGenerateItems(alphabet); // to be changed to dynamic value based on set!
    appStructure.setBtnContainer1(timerFunction.timer, scoreDisplay);

    setTimeout(() => {
      activateEventListeners();
    }, 200);
    setTimeout(() => {
      toggleTouchFunction.enableTouch();
    }, 300);
    setTimeout(() => {
      appStructure.grid.classList.remove("gridHide");
    }, 100);
    elements.getElements(matchingAppElements);
  }, 1000);
  toggleBlur.removeAllBlur();
}

/*
B. Clearing the Grid & Resetting Arrays
*/
function clearBoard() {
  setTimeout(() => {
    appStructure.grid.classList.add("gridHide");
  }, 50);
  setTimeout(() => {
    currentDotIdArray.length = 0;
    itemArrays.startRowArray.length = 0;
    itemArrays.endRowArray.length = 0;
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
  appStructure.appContainer.appendChild(btnContainer5);
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
    }, 200);
    setTimeout(() => {
      toggleTouchFunction.disableTouch();
      continueToNextRound();
    }, 500);
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
  currentDotId,
  endDotId,
  startDotId,
  lines,
  numberOfItemsToBeDisplayed,
  elements,
  matchingAppStructure,
};
