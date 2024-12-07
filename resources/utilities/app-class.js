import { mainContainer } from "./variables.js";
import { timerFunction } from "./timer.js";
import {
  pauseFunction,
  elements,
  toggleBlur,
  toggleTouchFunction,
} from "./pause-functions.js";
import { score } from "./score.js";
import { startScreen } from "./start-screen.js";
import { homeBtnFunction } from "./go-home-function.js";
import { endRoundScreen } from "./end-round-screen.js";
import { audio } from "./audio.js";
import { alphabet } from "../apps/card-touch/card-data.js";
import { menuItems } from "../apps/general/start-main-app.js";
import { gridItems } from "../apps/matching/generate-grid-items.js";
console.log("app class");

class App {
  constructor() {
    this.positiveFeedbackAudioObjects = [];
    this.negativeFeedbackAudioObjects = [];
    this.appContainer = document.createElement("div");
    this.grid = document.createElement("div");
    this.btnContainer1 = document.createElement("div");
    this.btnContainer2 = document.createElement("div");
    this.btnContainer4 = document.createElement("div");
    this.btnContainer5 = document.createElement("div");
    this.leftMenuContainer = document.createElement("div");
    this.appControlsContainer = document.createElement("div");
    this.appContainer.classList.add("container");
    this.grid.classList.add("grid");
    this.btnContainer1.classList.add("btn-container1");
    this.btnContainer2.classList.add("btn-container2");
    this.btnContainer4.classList.add("btn-container4");
    this.btnContainer5.classList.add("btn-container5");
    this.appControlsContainer.classList.add("home-btn-container", "hide");
    this.leftMenuContainer.classList.add("left-menu-container");
    this.time = 60;
  }
  setUser() {
    user.gradeLevel = sessionData.gradeLevel;
    user.firstName = sessionData.firstName;
    user.lastName = sessionData.lastName;
    user.access = sessionData.access;
    user.id = sessionData.userId;
  }
  // updateUserTotalScore() {
  //   //  For student users; teachers will differ on user type, etc
  //   const newScore = {
  //     activity_id: activityId,
  //     user_id: user.id,
  //     user_type: user.access,
  //     correct_answer_count: 0,
  //     incorrect_answer_count: 0,
  //     time_to_correct_answer_duration_in_seconds: 0,
  //     answer_attempts: 0,
  //     activity_score: score.currentScore,
  //   };
  //   try {
  //     const response = await fetch(
  //       "/KGPSEnglishPractice-test/api/add_user_activity_record.php",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(newScore),
  //       }
  //     );
  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error("Network response was not okay");
  //     }
  //   } catch (error) {
  //     console.error("Error adding record:", error);
  //   }
  // }
  startApp(set, appSpecificStructure, appElements) {
    this.setDoubleTapPreventer();
    this.createAndSetAppStructureThenHideGrid();
    this.setForeignElements(this.startSession, this.endApp, this.endRound);
    this.createAndSetAppSpecificStructure(appSpecificStructure);
    elements.getElements(appElements);
    console.log(elements);
    pauseFunction.unpause();
    this.setStyleSheet();
    menuItems.removeMenuPage();
    score.resetCurrentScore();
    score.display.innerText = score.currentScore;
    this.appContainer.classList.remove("hide");
    score.displayHideToggle();

    if (!timerFunction.timer.classList.contains("hide2")) {
      timerFunction.toggleTimerHide();
    }

    // setTimeout(this.setUser, 2000);
    toggleBlur.removeAllBlur();
    console.log("start app method finished");
  }
  endApp() {
    timerFunction.clearTimer();
    score.updateUserScore();
    this.endSession();
    endRoundScreen.removeContainer();
    setTimeout(() => {
      document.querySelector(".container").remove();
      this.removeMainAppStructure();
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
  }
  setForeignElements(startSessionMethod, endAppMethod, endRoundMethod) {
    homeBtnFunction.initialize(endAppMethod);
    startScreen.createAndSetStartScreen(startSessionMethod, endAppMethod);
    endRoundScreen.initializeContainer(startSessionMethod, endAppMethod);
    this.setAppControlsContainer(
      homeBtnFunction.homeBtn,
      pauseFunction.pauseBtn
    );
    timerFunction.setEndRoundFunction(endRoundMethod);
  }
  startSession(startRoundMethod) {
    audio.navigationSfx.startApp.play();
    endRoundScreen.removeContainer();
    startScreen.removeStartScreen();
    setTimeout(() => {
      startRoundMethod;
    }, 950);
    setTimeout(() => {
      timerFunction.startTimer(this.time);
    }, 1000);
  }
  endSession(clearBoardMethod) {
    pauseFunction.unpause();
    this.appContainer.classList.add("hide");
    this.appControlsContainer.classList.add("hide");
    document.querySelectorAll(".matching-app, .line").forEach((item) => {
      item.remove();
    }); // needs to be abstracted out
    if (document.querySelector(".end-messages-container")) {
      document.querySelector(".end-messages-container").remove();
    }
    if (document.querySelector(".go-home-container")) {
      document.querySelector(".go-home-container").remove();
    }
    toggleBlur.removeAllBlur();
    if (clearBoardMethod) {
      this.clearBoard(clearBoardMethod);
    }
    score.displayHideToggle();
    timerFunction.toggleTimerHide();
  }
  clearBoard(clearBoardMethod) {
    clearBoardMethod;
    score.resetCurrentScore();
  }
  prepareForNewRound() {
    this.clearBoard(clearBoardMethod);
    endRoundScreen.removeContainer();
    toggleTouchFunction.enableTouch();
    toggleBlur.removeWeakBlur();
    score.displayHideToggle();
    timerFunction.toggleTimerHide();
    this.appControlsContainer.classList.remove("hide");
    this.gridHideRemove();
  }
  startRound(appElements, eventListenerActivationMethod) {
    elements.getElements(appElements);
    this.prepareForNewRound();
    setTimeout(() => {
      gridItems.loadAndGenerateItems(alphabet); // to be changed to dynamic value based on set!
      this.initializeEventListeners(eventListenerActivationMethod);
      this.setBtnContainer1(timerFunction.timer, score.display);
      setTimeout(() => {
        toggleTouchFunction.enableTouch();
      }, 300);
      setTimeout(() => {
        this.gridHideRemove();
      }, 100);
      console.log(appElements);
    }, 1000);
    toggleBlur.removeAllBlur();
  }
  endRound() {
    score.updateUserScore();
    // score.updateStudentTotalScore();
    endRoundScreen.displayContainer();
  }
  initializeEventListeners(eventListenerActivationMethod) {
    eventListenerActivationMethod;
  }
  createMainAppStructure() {
    this.appContainer = document.createElement("div");
    this.grid = document.createElement("div");
    this.btnContainer1 = document.createElement("div");
    this.btnContainer2 = document.createElement("div");
    this.btnContainer4 = document.createElement("div");
    this.btnContainer5 = document.createElement("div");
    this.leftMenuContainer = document.createElement("div");
    this.appControlsContainer = document.createElement("div");
    this.appContainer.classList.add("container");
    this.grid.classList.add("grid");
    this.btnContainer1.classList.add("btn-container1");
    this.btnContainer2.classList.add("btn-container2");
    this.btnContainer4.classList.add("btn-container4");
    this.btnContainer5.classList.add("btn-container5");
    this.appControlsContainer.classList.add("home-btn-container", "hide");
    this.leftMenuContainer.classList.add("left-menu-container");
  }
  setMainAppStructure() {
    mainContainer.appendChild(this.appContainer);
    this.appContainer.appendChild(this.leftMenuContainer);
    this.appContainer.appendChild(this.btnContainer1);
    this.appContainer.appendChild(this.btnContainer2);
    this.appContainer.appendChild(this.btnContainer4);
    this.appContainer.appendChild(this.grid);
    this.appContainer.appendChild(this.appControlsContainer);
  }
  setBtnContainer1(item1, item2) {
    this.btnContainer1.appendChild(item1);
    this.btnContainer1.appendChild(item2);
  }
  setBtnContainer2(item1, item2) {
    this.btnContainer2.appendChild(item1);
    this.btnContainer2.appendChild(item2);
  }
  setBtnContainer3(item) {
    this.btnContainer3.appendChild(item);
  }
  setBtnContainer4(item) {
    this.btnContainer4.appendChild(item);
  }
  setBtnContainer5(item) {
    this.btnContainer5.appendChild(item);
    this.appContainer.appendChild(this.btnContainer5);
  }
  setAppControlsContainer(item1, item2) {
    this.appControlsContainer.appendChild(item1);
    this.appControlsContainer.appendChild(item2);
  }
  createAndSetAppSpecificStructure(appSpecificStructure) {
    appSpecificStructure();
  }
  createAndSetAppStructureThenHideGrid() {
    // this.createMainAppStructure();
    this.setMainAppStructure();
    this.gridHideAdd();
  }
  removeMainAppStructure() {
    delete this.appContainer;
    delete this.grid;
    delete this.btnContainer1;
    delete this.btnContainer2;
    delete this.btnContainer4;
    delete this.homeBtnContainer;
    delete this.leftMenuContainer;
  }
  gridHideAdd() {
    if (!this.grid.classList.contains("gridHide")) {
      this.grid.classList.add("gridHide");
    }
  }
  gridHideRemove() {
    if (this.grid.classList.contains("gridHide")) {
      this.grid.classList.remove("gridHide");
    }
  }
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
  }
  setDoubleTapPreventer() {
    document.body.addEventListener(
      "touchstart",
      this.createDoubleTapPreventer(500),
      {
        passive: false,
      }
    );
  }
}

class MatchingApp extends App {
  constructor() {
    super();
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
  }
  run(set) {
    this.startApp(set, this.createAndSetStructure, this.matchingAppElements);
    this.activateEventListeners();
    document.querySelectorAll(".hide, .gridHide").forEach((item) => {
      item.classList.remove("hide");
      item.classList.remove("gridHide");
    });
  }
  createAndSetStructure = () => {
    this.createGrid();
    this.setGrid();
    console.log("createAndSetStructure set");
  };
  setStyleSheet() {
    stylesheet.setAttribute(
      "href",
      "/KGPSEnglishPractice-test/resources/css/matching.css"
    );
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
    this.grid.appendChild(this.startRowContainer);
    this.grid.appendChild(this.endRowContainer);
    this.grid.appendChild(this.startDotsContainer);
    this.grid.appendChild(this.endDotsContainer);
  }
  clearGrid() {
    document.querySelectorAll(".startrow, .endrow").forEach((item) => {
      item.remove();
    });
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
        continueToNextRound();
      }, 500);
    }
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
        continueToNextRound();
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
    this.this.currentDotId = null;
    this.this.currentDotIdArray.length = 0;
  }
}

const app = new App();
const matchingApp = new MatchingApp();

export { app, matchingApp, App, MatchingApp };
