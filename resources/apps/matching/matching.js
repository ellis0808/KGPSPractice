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
  startSession() {
    audio.navigationSfx.startApp.play();
    if (endRoundScreen.endMessagesContainer) {
      endRoundScreen.removeContainer();
    }
    startScreen.removeStartScreen();

    setTimeout(() => {
      matchingAppSessions.startRound;
    }, 950);
    matchingApp.activateEventListeners();
    setTimeout(() => {
      timerFunction.startTimer(5);
    }, 1000);
  },
  endSession() {
    pauseFunction.unpause();
    appStructure.appContainer.classList.add("hide");
    appStructure.appControlsContainer.classList.add("hide");
    document.querySelectorAll(".matching-app, .line").forEach((item) => {
      item.remove();
    });
    if (document.querySelector(".end-messages-container")) {
      document.querySelector(".end-messages-container").remove();
    }
    if (document.querySelector(".go-home-container")) {
      document.querySelector(".go-home-container").remove();
    }
    toggleBlur.removeAllBlur();
    this.clearBoard();
    score.displayHideToggle();
    timerFunction.toggleTimerHide();
  },
  clearBoard() {
    setTimeout(() => {
      appStructure.gridHideAdd();
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
  },
  prepareForNewRound() {
    toggleTouchFunction.enableTouch();
    toggleBlur.removeWeakBlur();
    score.displayHideToggle();
    timerFunction.toggleTimerHide();
    appStructure.appControlsContainer.classList.remove("hide");
    appStructure.gridHideRemove();
  },
  startRound() {
    this.prepareForNewRound();
    setTimeout(() => {
      gridItems.loadAndGenerateItems(alphabet); // to be changed to dynamic value based on set!
      appStructure.setBtnContainer1(timerFunction.timer, score.display);
      setTimeout(() => {
        toggleTouchFunction.enableTouch();
      }, 300);
      setTimeout(() => {
        appStructure.gridHideRemove();
        console.log(appStructure.grid.classList.contains);
      }, 100);
      elements.getElements(matchingAppElements);
      console.log(matchingAppElements);
    }, 1000);
    toggleBlur.removeAllBlur();
  },
  endRound() {
    score.updateUserScore();
    // score.updateStudentTotalScore();
    endRoundScreen.displayContainer();
  },
};
/* SCORING */
const correctAnswerPoints = 1;
const incorrectAnswerPoints = 1;

// score.display.textContent = `${score.currentScore}`;

let endDotId;
let startDotId;

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
  createDoubleTapPreventer(timeout_ms) {
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
  },
  setDoubleTapPreventer() {
    document.body.addEventListener(
      "touchstart",
      matchingApp.createDoubleTapPreventer(500),
      {
        passive: false,
      }
    );
  },
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
  activateEventListeners() {
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
  },
  startApp(set) {
    this.setDoubleTapPreventer();
    sessionCheck();
    setStyle(set);
    appStructure.createAndSetAppStructureThenHideGrid();
    this.createAndSetStructure();
    this.setForeignElements(
      matchingAppSessions.startSession,
      this.endApp,
      matchingAppSessions.endRound
    );
    elements.getElements(matchingAppElements);
    console.log(matchingAppElements);

    pauseFunction.unpause();
    this.setStyleSheet();
    menuItems.removeMenuPage();
    score.resetScore();
    score.display.innerText = score.currentScore;
    appStructure.appContainer.classList.remove("hide");
    if (!score.display.classList.contains("hide2")) {
      score.displayHideToggle();
    }
    if (!timerFunction.timer.classList.contains("hide2")) {
      timerFunction.toggleTimerHide();
    }

    setTimeout(setUser, 2000);
    toggleBlur.removeAllBlur();
  },
  endApp() {
    timerFunction.clearTimer();
    score.updateUserScore();
    matchingAppSessions.endSession();
    endRoundScreen.removeContainer();
    setTimeout(() => {
      document.querySelector(".container").remove();
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
    score.display.innerText = score.currentScore;
  },
};

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

/*
B. Clearing the Grid & Resetting Arrays
*/

function clearArrays() {
  currentDotId = null;
  currentDotIdArray.length = 0;
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
      score.updatePositiveCount(allCorrectDots.length * correctAnswerPoints);
      score.display.classList.add("pulse");
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
      matchingAppSessions.clearBoard();
    }, 1000);
    setTimeout(() => {
      matchingAppSessions.startSession();
    }, 1500);
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
      score.display.classList.remove("pulse");

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
      score.display.classList.remove("pulse");

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
