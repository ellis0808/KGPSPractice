import { scoreFunction } from "../../utilities/score.js";
import { mainContainer, body } from "../../utilities/variables.js";
import {
  dotAndLineCommand,
  startDot,
  endDot,
  Connector,
} from "./dot-objects-control.js";
import {
  style,
  activityId,
  setStyle,
  setActivityId,
} from "./matching-set-style-and-activity-id.js";
import { audio } from "../../utilities/audio.js";
import { toggleTouchFunction } from "../../utilities/pause-functions.js";
import { app } from "../../utilities/app-class.js";
import { gridItems, itemArrays } from "./generate-grid-items.js";
import { alphabet } from "../card-touch/card-data.js";

class MatchingApp {
  constructor() {
    this.activityId = null;
    this.correctAnswerPoints = 1;
    this.endDotId = null;
    this.startDotId = null;
    this.numberOfItemsToBeDisplayed = 4;
    this.currentDotId = null;
    this.currentDotIdArray = [];
    this.currentStartDot = null;
    this.currentEndDot = null;
    this.lines = [];
    this.line = new Connector();
    this.styleSheet = "/KGPSEnglishPractice-test/resources/css/matching.css";
    this.time = null;
    this.getStartDotID = this.getStartDotID.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerUpFalse = this.onPointerUpFalse.bind(this);
  }
  run(set, time) {
    this.setStyleSheet();
    setStyle(set);
    this.setActivityId();
    setTimeout(() => {
      this.setTime(time);
      this.setUpApp();
      app.startApp();
    }, 200);
  }
  setTime(time) {
    this.time = time;
  }
  setUpApp() {
    app.setAppVariables(
      this.time,
      this.clearBoard,
      this.activateEventListeners,
      this.createAndSetStructure,
      this.populateGrid,
      this.activityId
    );
  }
  createAndSetStructure = () => {
    this.createGrid();
    this.setGrid();
  };
  setStyleSheet() {
    app.applyAppStyleSheet(this.styleSheet);
  }
  setActivityId() {
    setActivityId(1);
    this.activityId = activityId;
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
  removeGrid() {
    app.grid.childNodes().forEach((item) => {
      item.remove();
    });
  }
  populateGrid() {
    gridItems.loadAndGenerateItems(alphabet);
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
        scoreFunction.updatePositiveCount(
          allCorrectDots.length * this.correctAnswerPoints
        );
        scoreFunction.display.classList.add("pulse");
        audio.appSfx.correct.play();
        setTimeout(() => this.randomFeedback(), 500);
      }, 200);
      setTimeout(() => {
        toggleTouchFunction.disableTouch();
        app.startRound();
      }, 800);
    }
  }
  randomFeedback() {
    Object.keys(audio.feedbackAudioObject.positiveFeedback).forEach(
      (object) => {
        if (!app.positiveFeedbackAudioObjects.includes(object)) {
          if (object === "greatJob" || object === "goodJob") {
            app.positiveFeedbackAudioObjects.push(object);
          }
        }
      }
    );
    Object.keys(audio.feedbackAudioObject.positiveFeedback).forEach(
      (object) => {
        if (!app.negativeFeedbackAudioObjects.includes(object)) {
          app.negativeFeedbackAudioObjects.push(object);
        }
      }
    );

    let randomFeedbackNumber = Math.floor(
      Math.random() * app.positiveFeedbackAudioObjects.length
    );
    audio.feedbackAudioObject.positiveFeedback[
      app.positiveFeedbackAudioObjects[randomFeedbackNumber]
    ].sound.play();
  }
  activateEventListeners() {
    const targets = document.querySelectorAll(".start-target, .end-target");

    targets.forEach((target) => {
      target.addEventListener(
        "pointerdown",
        (event) => {
          matchingApp.onPointerDown(event);
        },
        false
      );
      target.addEventListener(
        "pointerup",
        (event) => {
          matchingApp.onPointerUp(event);
        },
        false
      );
    });
    mainContainer.addEventListener(
      "pointerup",
      (event) => {
        matchingApp.onPointerUpFalse(event);
      },
      false
    );
    mainContainer.addEventListener(
      "pointermove",
      (event) => {
        matchingApp.onPointerMove(event);
      },
      false
    );
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

        this.line.buttonDown();

        this.currentDotId;
        this.getEventTargetID(event);
        scoreFunction.display.classList.remove("pulse");

        if (
          !this.currentDotIdArray.includes(endDot[this.currentEndDot]) +
          this.numberOfItemsToBeDisplayed
        ) {
          this.line.start = {};
          this.line.getStartPosition(event);
          this.line.end = {};
          this.line.getEndPosition(event);
          this.draw(event);
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

        this.line.buttonDown();

        this.currentDotId;
        scoreFunction.display.classList.remove("pulse");

        this.getEventTargetID(event);

        if (!this.currentDotIdArray.includes(startDot[this.currentStartDot])) {
          this.line.getContentId(startDot[this.currentStartDot]);
          this.line.start = {};
          this.line.getStartPosition(event);
          this.line.end = {};
          this.line.getEndPosition(event);
          this.draw(event);
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
        this.line.isPressed &&
        this.currentEndDot !== null &&
        !this.currentDotIdArray.includes(this.currentDotId)
      ) {
        if (this.line.start) {
          this.line.end = {
            x: event.clientX - bodyRect.left,
            y: event.clientY - bodyRect.top,
          };
          this.draw(event);
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
        this.line.isPressed &&
        this.currentStartDot !== null &&
        !this.currentDotIdArray.includes(this.currentDotId)
      ) {
        if (this.line.start) {
          this.line.end = {
            x: event.clientX - bodyRect.left,
            y: event.clientY - bodyRect.top,
          };
          this.draw(event);
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
        this.line.element.setAttribute("startdotid", this.startDotId);
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

        this.line.connectFromEndToStart(
          newStartDot,
          endDot[this.currentEndDot],
          event
        );
        newStartDot.connect(endDot[this.currentEndDot], this.line);

        this.draw(event);
        this.line.buttonUp();
        if (
          !this.line.isPressed &&
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
        } else if (!this.line.isPressed) {
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

        this.line.connectFromStartToEnd(
          startDot[this.currentStartDot],
          newEndDot,
          event
        );
        newEndDot.connect(startDot[this.currentStartDot], this.line);
        this.lines.pop();
        this.draw(event);
        this.line.buttonUp();
        if (
          !this.line.isPressed &&
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
        } else if (!this.line.isPressed) {
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
      if (this.line.isPressed) {
        endDot[this.currentEndDot].makeInactive();
        this.currentEndDot = null;
        this.line.buttonUp();
        if (!this.line.isPressed) {
          this.removeUnconnectedLines();
          this.lines.pop();
          this.currentEndDot = null;
          return;
        }
      }
    } else if (this.currentStartDot) {
      if (this.line.isPressed) {
        startDot[this.currentStartDot].makeInactive();
        this.currentStartDot = null;
        this.line.buttonUp();
        if (!this.line.isPressed) {
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
    return (this.currentDotId = event.target.id);
  }
  getStartDotID(event) {
    return (this.startDotId = event.target.id);
  }
  getEndDotID(event) {
    return (this.endDotId = event.target.id);
  }
  draw(event) {
    this.clearLines();
    this.lines.forEach((x) => {
      dotAndLineCommand.registerConnector(this.line);
      this.line.drawLine(event);
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

export { matchingApp };
