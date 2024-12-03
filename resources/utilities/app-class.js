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
import { setStyle } from "../apps/matching/matching-set-style-and-activity-id.js";
import { sessionCheck } from "../login/session-check.js";
import { alphabet } from "../apps/card-touch/card-data.js";
console.log("app class");

class App {
  constructor() {
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
  startApp(set, appSpecificStructure, appElements) {
    this.setDoubleTapPreventer();
    sessionCheck();
    setStyle(set);
    this.createAndSetAppStructureThenHideGrid();
    this.setForeignElements(this.startSession, this.endApp, this.endRound);
    createAndSetAppSpecificStructure(appSpecificStructure);
    elements.getElements(appElements);
    console.log(elements);

    pauseFunction.unpause();
    this.setStyleSheet();
    menuItems.removeMenuPage();
    score.resetScore();
    score.display.innerText = score.currentScore;
    this.appContainer.classList.remove("hide");
    if (!score.display.classList.contains("hide2")) {
      score.displayHideToggle();
    }
    if (!timerFunction.timer.classList.contains("hide2")) {
      timerFunction.toggleTimerHide();
    }

    setTimeout(setUser, 2000);
    toggleBlur.removeAllBlur();
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
  setForeignElements(startSession, endApp, endRound) {
    homeBtnFunction.initialize(endApp);
    startScreen.createAndSetStartScreen(startSession, endApp);
    endRoundScreen.initializeContainer(startSession, endApp);
    this.setAppControlsContainer(
      homeBtnFunction.homeBtn,
      pauseFunction.pauseBtn
    );
    timerFunction.setEndRoundFunction(endRound);
  }
  startSession(startRoundMethod, time) {
    audio.navigationSfx.startApp.play();
    endRoundScreen.removeContainer();
    startScreen.removeStartScreen();
    setTimeout(() => {
      startRoundMethod;
    }, 950);
    setTimeout(() => {
      timerFunction.startTimer(time);
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
    this.clearBoard(clearBoardMethod);
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
        console.log(this.grid.classList.contains);
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
  static setBtnContainer1(item1, item2) {
    this.btnContainer1.appendChild(item1);
    this.btnContainer1.appendChild(item2);
  }
  static setBtnContainer2(btnContainer2, item1, item2) {
    btnContainer2.appendChild(item1);
    btnContainer2.appendChild(item2);
  }
  static setBtnContainer3(item) {
    this.btnContainer3.appendChild(item);
  }
  static setBtnContainer4(item) {
    this.btnContainer4.appendChild(item);
  }
  setBtnContainer5(item) {
    this.btnContainer5.appendChild(item);
    this.appContainer.appendChild(this.btnContainer5);
  }
  static setAppControlsContainer(item1, item2) {
    this.appControlsContainer.appendChild(item1);
    this.appControlsContainer.appendChild(item2);
  }
  createAndSetAppStructureThenHideGrid() {
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
  }
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
  }
  createAndSetStructure() {
    this.createGrid();
    this.setGrid();
  }
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
}
// const matchingApp = new MatchingApp();

// class Test {
//   constructor() {
//     console.log("This is only a test");
//   }
// }
export { App };
