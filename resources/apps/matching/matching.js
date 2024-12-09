import { score } from "../../utilities/score.js";
import { mainContainer } from "../../utilities/variables.js";
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
import { audio } from "../../utilities/audio.js";
import { toggleTouchFunction } from "../../utilities/pause-functions.js";
import { app } from "../../utilities/app-class.js";
import { gridItems, itemArrays } from "./generate-grid-items.js";
import { alphabet } from "../card-touch/card-data.js";

console.log("matching");

class MatchingApp {
  constructor() {
    this.matchingAppElements = [
      ".dot,.dot-enclosure,.capitals,.lowercase,.btn-container1,.grid",
    ];
    this.endDotId = null;
    this.startDotId = null;
    this.numberOfItemsToBeDisplayed = 4;
    this.currentDotId = null;
    this.currentDotIdArray = [];
    this.currentStartDot = null;
    this.currentEndDot = null;
    this.lines = [];
    this.styleSheet = "/KGPSEnglishPractice-test/resources/css/matching.css";
    this.time = null;
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerUpFalse = this.onPointerUpFalse.bind(this);
  }
  run(set) {
    this.setStyleSheet();
    this.setTime(60);
    this.setUpApp();
    app.setForeignElements();
    app.startApp();
    // this.populateGrid();

    // document.querySelectorAll(".hide, .gridHide").forEach((item) => {
    //   item.classList.remove("hide");
    //   item.classList.remove("gridHide");
    // });
    console.log("check");
  }
  setTime(time) {
    this.time = time;
    console.log(this.time);
  }
  setUpApp() {
    app.setAppVariables(
      this.time,
      this.matchingAppElements,
      this.clearBoard,
      this.activateEventListeners,
      this.createAndSetStructure,
      this.populateGrid
    );
  }
  createAndSetStructure = () => {
    this.createGrid();
    this.setGrid();
    console.log("createAndSetStructure set");
  };
  setStyleSheet() {
    app.setAppStyleSheet(this.styleSheet);
    console.log(this.styleSheet);
  }
  createGrid() {
    this.startRowContainer = document.createElement("div");
    this.endRowContainer = document.createElement("div");
    this.startDotsContainer = document.createElement("div");
    this.endDotsContainer = document.createElement("div");
    this.startRowContainer.classList.add("startrow");
    this.endRowContainer.classList.add("endrow");
    this.startDotsContainer.classList.add("start-dot-div");
    this.endDotsContainer.classList.add("end-dot-div");
  }
  setGrid() {
    app.grid.appendChild(this.startRowContainer);
    app.grid.appendChild(this.endRowContainer);
    app.grid.appendChild(this.startDotsContainer);
    app.grid.appendChild(this.endDotsContainer);
  }
  populateGrid() {
    gridItems.loadAndGenerateItems(alphabet);
    console.log("grid populated");
  }
  clearGrid() {
    document.querySelectorAll(".startrow, .endrow").forEach((item) => {
      item.remove();
    });
  }
  clearBoard() {
    setTimeout(() => {
      app.gridHideAdd();
    }, 50);
    setTimeout(() => {
      matchingApp.currentDotIdArray.length = 0;
      itemArrays.startRowArray.length = 0;
      itemArrays.endRowArray.length = 0;
      const dotsAndLines = document.querySelectorAll("[contentId],.dot,.line");
      dotsAndLines.forEach((item) => {
        item.remove();
      });
      matchingApp.clearArrays();
      dotAndLineCommand.clearArrays();
    }, 400);
  }
  checkAllCorrect() {
    const allCorrectDots = document.querySelectorAll(
      ".start-dot.pulse.white-ring"
    );
    if (allCorrectDots.length === this.numberOfItemsToBeDisplayed) {
      setTimeout(() => {
        score.updatePositiveCount(allCorrectDots.length * correctAnswerPoints);
        score.display.classList.add("pulse");
        audio.appSfx.correct.play();
        setTimeout(randomFeedback, 500);
      }, 200);
      setTimeout(() => {
        toggleTouchFunction.disableTouch();
        app.startRound();
      }, 500);
    }
  }
  randomFeedback() {
    Object.keys(audio.feedbackAudioObject.positiveFeedback).forEach(
      (object) => {
        if (!this.positiveFeedbackAudioObjects.includes(object)) {
          if (object === "greatJob" || object === "goodJob") {
            this.positiveFeedbackAudioObjects.push(object);
          }
        }
      }
    );
    Object.keys(audio.feedbackAudioObject.positiveFeedback).forEach(
      (object) => {
        if (!this.negativeFeedbackAudioObjects.includes(object)) {
          this.negativeFeedbackAudioObjects.push(object);
        }
      }
    );

    let randomFeedbackNumber = Math.floor(
      Math.random() * this.positiveFeedbackAudioObjects.length
    );
    audio.feedbackAudioObject.positiveFeedback[
      this.positiveFeedbackAudioObjects[randomFeedbackNumber]
    ].sound.play();
  }
  activateEventListeners() {
    setTimeout(() => {
      const startTargets = document.querySelectorAll(
        ".start-target, .end-target"
      );
      startTargets.forEach((target) => {
        target.addEventListener("pointerdown", this.onPointerDown, false);
        target.addEventListener("pointerup", this.onPointerUp, false);
      });
    }, 1);
    mainContainer.addEventListener("pointerup", this.onPointerUpFalse, false);
    mainContainer.addEventListener("pointermove", this.onPointerMove, false);
  }
  onPointerDown(event) {
    event.preventDefault();
    event.stopPropagation();

    this.currentStartDot = null;
    this.currentEndDot = null;
    if (this.currentStartDot === null && this.currentEndDot === null) {
      if (event.target.classList.contains("end-target")) {
        if (event.target.hasPointerCapture(event.pointerId)) {
          event.target.releasePointerCapture(event.pointerId);
        }

        this.currentEndDot = Number(
          event.target.id - this.numberOfItemsToBeDisplayed
        );

        if (endDot[this.currentEndDot].connected) {
          document
            .querySelector(`[enddotid="${endDot[this.currentEndDot].id}"]`)
            .remove();
          endDot[this.currentEndDot].disconnect();
        }

        endDot[this.currentEndDot].makeActive();

        this.getEndDotID(event);

        line.buttonDown();

        this.currentDotId;
        this.getEventTargetID(event);
        score.display.classList.remove("pulse");

        if (
          !this.currentDotIdArray.includes(endDot[this.currentEndDot]) +
          this.numberOfItemsToBeDisplayed
        ) {
          line.start = {};
          line.getStartPosition(event);
          line.end = {};
          line.getEndPosition(event);
          draw();
        }
        return this.currentEndDot;
      } else if (event.target.classList.contains("start-target")) {
        if (event.target.hasPointerCapture(event.pointerId)) {
          event.target.releasePointerCapture(event.pointerId);
        }
        this.currentStartDot = null;
        this.currentEndDot = null;

        this.currentStartDot = event.target.id;

        if (startDot[this.currentStartDot].connected) {
          document
            .querySelector(
              `[startdotid="${startDot[this.currentStartDot].id}"]`
            )
            .remove();
          startDot[this.currentStartDot].disconnect();
        }

        startDot[this.currentStartDot].makeActive();

        this.getStartDotID(event);

        line.buttonDown();

        this.currentDotId;
        score.display.classList.remove("pulse");

        this.getEventTargetID(event);

        if (!this.currentDotIdArray.includes(startDot[this.currentStartDot])) {
          line.getContentId(startDot[this.currentStartDot]);
          line.start = {};
          line.getStartPosition(event);
          line.end = {};
          line.getEndPosition(event);
          draw();
        }

        return this.currentStartDot;
      }
    }
  }
  onPointerMove(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.currentEndDot) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }

      const bodyRect = body.getBoundingClientRect();
      if (
        line.isPressed &&
        this.currentEndDot !== null &&
        !this.currentDotIdArray.includes(this.currentDotId)
      ) {
        if (line.start) {
          line.end = {
            x: event.clientX - bodyRect.left,
            y: event.clientY - bodyRect.top,
          };
          draw();
          this.lines.pop();
          this.lines.push(document.querySelector(".unconnected"));
        }
      }
    } else if (this.currentStartDot) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }
      const bodyRect = body.getBoundingClientRect();
      if (
        line.isPressed &&
        this.currentStartDot !== null &&
        !this.currentDotIdArray.includes(this.currentDotId)
      ) {
        if (line.start) {
          line.end = {
            x: event.clientX - bodyRect.left,
            y: event.clientY - bodyRect.top,
          };
          draw();
          this.lines.pop();
          this.lines.push(document.querySelector(".unconnected"));
        }
      }
    }
  }
  onPointerUp(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.currentEndDot) {
      this.currentStartDot = null;
      this.getStartDotID(event);
      try {
        line.element.setAttribute("startdotid", this.startDotId);
      } catch (error) {
        return;
      }
      if (event.target.classList.contains("end-target")) {
        this.onPointerUpFalse();
      }
      if (event.target.classList.contains("start-target")) {
        if (event.target.hasPointerCapture(event.pointerId)) {
          event.target.releasePointerCapture(event.pointerId);
        }

        this.currentStartDot = Number(event.target.id);
        const newStartDot = startDot[this.currentStartDot];
        endDot[this.currentEndDot].makeInactive();
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

        line.connectFromEndToStart(
          newStartDot,
          endDot[this.currentEndDot],
          event
        );
        newStartDot.connect(endDot[this.currentEndDot], line);

        draw();
        line.buttonUp();
        if (
          !line.isPressed &&
          event.target.classList.contains("start-target") &&
          !this.currentDotIdArray.includes(this.currentDotId)
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
          this.removeUnconnectedLines();
          this.lines.pop();
          return;
        }
        event.preventDefault();
        return;
      }

      this.currentEndDot = null;
      this.currentStartDot = null;
    } else if (this.currentStartDot) {
      this.currentEndDot = null;
      this.getEndDotID(event);
      if (event.target.classList.contains("start-target")) {
        this.onPointerUpFalse();
      }
      if (event.target.classList.contains("end-target")) {
        if (event.target.hasPointerCapture(event.pointerId)) {
          event.target.releasePointerCapture(event.pointerId);
        }
        this.currentEndDot = Number(event.target.id - 4);
        const newEndDot = endDot[this.currentEndDot];
        startDot[this.currentStartDot].makeInactive();
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

        line.connectFromStartToEnd(
          startDot[this.currentStartDot],
          newEndDot,
          event
        );
        newEndDot.connect(startDot[this.currentStartDot], line);
        this.lines.pop();
        draw();
        line.buttonUp();
        if (
          !line.isPressed &&
          event.target.classList.contains("end-target") &&
          !this.currentDotIdArray.includes(this.currentDotId)
        ) {
          this.getEndDotID(event);
          const oldlines = document.querySelectorAll(".unconnected");
          oldlines[0].classList.remove("unconnected");
          oldlines[0].classList.add("final");
          const oldlines2 = document
            .querySelectorAll(".unconnected")
            .forEach((item) => {
              item.remove();
            });
        } else if (!line.isPressed) {
          this.removeUnconnectedLines();
          this.lines.pop();
          return;
        }
      }
      event.preventDefault();
      return;
    }
    this.currentStartDot = null;
    this.currentEndDot = null;
    return;
  }
  onPointerUpFalse() {
    if (this.currentEndDot) {
      if (line.isPressed) {
        endDot[this.currentEndDot].makeInactive();
        this.currentEndDot = null;
        line.buttonUp();
        if (!line.isPressed) {
          this.removeUnconnectedLines();
          this.lines.pop();
          this.currentEndDot = null;
          return;
        }
      }
    } else if (this.currentStartDot) {
      if (line.isPressed) {
        startDot[this.currentStartDot].makeInactive();
        this.currentStartDot = null;
        line.buttonUp();
        if (!line.isPressed) {
          this.removeUnconnectedLines();
          this.lines.pop();
          this.currentStartDot = null;
          return;
        }
      }
      this.currentStartDot = null;
    }
  }
  getEventTargetID(event) {
    this.currentDotId = event.target.id;
    return this.currentDotId;
  }
  getStartDotID(event) {
    this.startDotId = event.target.id;
    return this.startDotId;
  }
  getEndDotID(event) {
    this.endDotId = event.target.id;
    return this.endDotId;
  }
  draw(event) {
    clearLines();
    this.lines.forEach((x) => {
      dotAndLineCommand.registerConnector(line);
      line.drawLine(event);
    });
  }
  clearLines() {
    if (document.querySelector(".unconnected")) {
      const allLines = document.querySelectorAll(".unconnected");
      allLines.forEach((line) => {
        line.remove();
      });
    }
  }
  removeUnconnectedLines() {
    const unconnectedLines = document.querySelectorAll(".unconnected");

    unconnectedLines.forEach((line) => {
      line.remove();
    });
  }
  clearArrays() {
    this.currentDotId = null;
    this.currentDotIdArray.length = 0;
  }
}

const matchingApp = new MatchingApp();

/*
*******
I. MAIN APP
*******
*/
const matchingAppElements = [
  ".dot,.dot-enclosure,.capitals,.lowercase,.btn-container1,.grid",
];

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

export { matchingApp };
