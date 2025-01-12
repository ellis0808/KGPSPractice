import { mainContainer } from "./variables.js";
import { timer, timerFunction } from "./timer.js";
import {
  pauseFunction,
  elements,
  toggleBlur,
  toggleTouchFunction,
} from "./pause-functions.js";
import { scoreFunction } from "./score.js";
import { startScreen } from "./start-screen.js";
import { homeBtnFunction } from "./go-home-function.js";
import { endRoundScreen } from "./end-round-screen.js";
import { audio } from "./audio.js";
import { menuItems } from "../apps/general/start-main-app.js";
import { user } from "./user-object.js";
import { sessionCheck, sessionData } from "../login/session-check.js";
import { BASE_PATH } from "./get-base-path.js";

class AppContainer {
  constructor() {
    this.homeStyleSheet = `${BASE_PATH}resources/css/styles.css`;
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
    this.currentApp = null;
    this.time = null;
    this.clearBoardMethod = null;
    this.appEventListeners = null;
    this.appStructure = null;
    this.gridPopulator = null;
    this.activityId = null;
    this.stats = initializeStats();
    this.endSessionItems = null;
    this.endApp = this.endApp.bind(this);
    this.startSession = this.startSession.bind(this);
    this.endSession = this.endSession.bind(this);
    this.startRound = this.startRound.bind(this);
    this.endRound = this.endRound.bind(this);
    this.hideBtnContainer2 = this.hideBtnContainer2.bind(this);
    this.correctAnswerCount = null;
    this.incorrectAnswerCount = null;
    this.totalElapsedTime = null;
    this.answerAttempts = null;
  }
  setAppVariables(
    currentApp,
    time,
    boardClear,
    eventListeners,
    appStructure,
    gridPopulator,
    activityId,
    endSessionItems
  ) {
    this.currentApp = currentApp;
    this.time = time;
    this.clearBoardMethod = boardClear;
    this.appEventListeners = eventListeners;
    this.appStructure = appStructure;
    this.gridPopulator = gridPopulator;
    this.activityId = activityId;
    this.endSessionItems = endSessionItems;
  }
  resetAppVariables() {
    this.currentApp = null;
    this.time = null;
    this.clearBoardMethod = null;
    this.appEventListeners = null;
    this.appStructure = null;
    this.gridPopulator = null;
  }
  setUser() {
    user.gradeLevel = sessionData.gradeLevel;
    user.firstName = sessionData.firstName;
    user.lastName = sessionData.lastName;
    user.access = sessionData.access;
    user.id = sessionData.userId;
  }
  startApp() {
    this.setDoubleTapPreventer();
    this.createAndSetAppStructureThenHideGrid();
    this.setForeignElements();
    this.createAndSetAppSpecificStructure();
    pauseFunction.unpause();
    scoreFunction.display.innerText = 0;
    this.appContainer.classList.remove("hide");
    scoreFunction.hide();
    timerFunction.hide();
    sessionCheck();
    setTimeout(this.setUser, 2000);
    toggleBlur.removeAllBlur();
  }
  endApp() {
    scoreFunction.updateUserScore();
    this.endSession();
    endRoundScreen.removeContainer();
    setTimeout(() => {
      this.resetAppVariables();
      this.elementRemover(this.endSessionItems);
      this.gridRemove();
      document.querySelector(".container").remove();
      setTimeout(() => {
        stylesheet.setAttribute("href", this.homeStyleSheet);
        menuItems.displayMainPage();
        setTimeout(menuItems.restoreMainMenu, 100);
      }, 500);
    }, 500);
    scoreFunction.display.innerText = 0;
  }
  setForeignElements() {
    homeBtnFunction.initialize();
    startScreen.initializeContainer();
    endRoundScreen.initializeContainer();
    this.setAppControlsContainer(
      homeBtnFunction.homeBtn,
      pauseFunction.pauseBtn
    );
    timerFunction.setEndRoundFunction(this.endRound);
  }
  applyAppStyleSheet(newSheet) {
    stylesheet.setAttribute("href", newSheet);
    menuItems.removeMenuPage();
  }
  startSession() {
    audio.navigationSfx.startApp.play();
    this.initializeEventListeners();
    endRoundScreen.removeContainer();
    startScreen.removeStartScreen();
    scoreFunction.resetCurrentScore();

    setTimeout(() => {
      this.btnContainer2.remove();
      this.startRound();
    }, 950);
    setTimeout(() => {
      timerFunction.startTimer(this.time);
    }, 1000);
    console.log(user);
  }
  endSession() {
    pauseFunction.unpause();
    this.appContainer.classList.add("hide");
    this.appControlsContainer.classList.add("hide");
    endRoundScreen.removeContainer();
    homeBtnFunction.removeContainer();
    scoreFunction.resetCurrentScore();
    timerFunction.clearTimer();
    toggleBlur.removeAllBlur();
    if (this.clearBoardMethod) {
      this.clearBoard();
    }
    scoreFunction.hide();
    timerFunction.hide();
  }
  clearBoard() {
    this.clearBoardMethod();
  }
  prepareForNewRound() {
    this.clearBoard();
    endRoundScreen.removeContainer();
    toggleTouchFunction.enableTouch();
    toggleBlur.removeWeakBlur();
    scoreFunction.show();
    timerFunction.show();
    this.appControlsContainer.classList.remove("hide");
    this.gridHideRemove();
  }
  startRound() {
    console.log("round started");

    this.prepareForNewRound();
    setTimeout(() => {
      this.gridPopulator();

      this.setBtnContainer1();
      setTimeout(() => {
        toggleTouchFunction.enableTouch();
      }, 300);
      setTimeout(() => {
        this.gridHideRemove();
      }, 100);
    }, 1000);
    toggleBlur.removeAllBlur();
  }
  getStats(newStats) {
    for (let key in this.stats) {
      if (this.stats.hasOwnProperty(key)) {
        this.stats[key] =
          newStats[key] !== undefined ? newStats[key] : this.stats[key];
      }
    }
    console.log(
      this.correctAnswerCount,
      this.incorrectAnswerCount,
      answerAttempts,
      totalElapsedTime
    );
  }
  initializeStats() {
    return {
      userID: null,
      userAccess: null,
      activityType: null,
      activityName: null,
      correctAnswerCount: null,
      incorrectAnswerCount: null,
      totalElapsedTime: 0,
      correctAnswerCount: 0,
      incorrectAnswerCount: 0,
      answerAttempts: 0,
      correctAnswerCount: 0,
      incorrectAnswerCount: 0,
      answerAttempts: 0,
      questionsShort: 0,
      questionsMedium: 0,
      questionsLong: 0,
      correctAnswersShort: 0,
      correctAnswersMedium: 0,
      correctAnswersLong: 0,
      incorrectAnswersShort: 0,
      incorrectAnswersMedium: 0,
      incorrectAnswersLong: 0,
    };
  }
  resetStats() {
    this.stats = this.initializeStats();
  }
  endRound() {
    scoreFunction.updateUserTotalScore(this.stats);
    console.log(
      "activity id: ",
      appContainer.activityId,
      "userid: ",
      user.id,
      "user access: ",
      user.access,
      "correctAnswerCount: ",
      appContainer.correctAnswerCount,
      "incorrectAnswerCount: ",
      appContainer.incorrectAnswerCount,
      "elapsed time: ",
      appContainer.totalElapsedTime,
      "answer attempts: ",
      appContainer.answerAttempts
    );

    console.log(user.cumulativeScore);
    scoreFunction.updateUserScore();
    console.log(user.cumulativeScore);
    endRoundScreen.displayContainer();
  }
  initializeEventListeners() {
    if (this.appEventListeners) {
      this.appEventListeners();
    }
  }
  setMainAppStructure() {
    mainContainer.appendChild(this.appContainer);
    this.appContainer.appendChild(this.leftMenuContainer);
    this.appContainer.appendChild(this.btnContainer1);
    this.appContainer.appendChild(this.btnContainer2);
    this.appContainer.appendChild(this.grid);
    this.appContainer.appendChild(this.appControlsContainer);
  }
  setBtnContainer1() {
    if (!this.btnContainer1) {
      this.btnContainer1 = document.createElement("div");
      this.btnContainer1.classList.add("btn-container1");
    }
    this.btnContainer1.appendChild(timerFunction.timer);
    this.btnContainer1.appendChild(scoreFunction.display);
  }
  setBtnContainer2(item1, item2) {
    if (!this.btnContainer2) {
      this.btnContainer2 = document.createElement("div");
      this.btnContainer2.classList.add("btn-container2");
      this.appContainer.appendChild(this.btnContainer2);
    }
    this.btnContainer2.appendChild(item1);
    this.btnContainer2.appendChild(item2);
  }
  setBtnContainer3(item) {
    if (!this.btnContainer3) {
      this.btnContainer3 = document.createElement("div");
      this.btnContainer3.classList.add("btn-container3");
    }
    this.btnContainer3.appendChild(item);
  }
  setBtnContainer4(item) {
    if (!this.btnContainer4) {
      this.btnContainer4 = document.createElement("div");
      this.btnContainer4.classList.add("btn-container4");
    }
    this.btnContainer4.appendChild(item);
    this.showBtnContainer4();
    this.appContainer.appendChild(this.btnContainer4);
  }
  setBtnContainer5(item) {
    if (!this.btnContainer5) {
      this.btnContainer5 = document.createElement("div");
      this.btnContainer5.classList.add("btn-container5");
    }
    this.btnContainer5.appendChild(item);
    this.appContainer.appendChild(this.btnContainer5);
  }
  hideBtnContainer2() {
    if (!this.btnContainer2.classList.contains("hide")) {
      this.btnContainer2.classList.add("hide");
    }
  }
  showBtnContainer2() {
    if (this.btnContainer2.classList.contains("hide")) {
      this.btnContainer2.classList.add("hide");
    }
  }
  hideBtnContainer4() {
    if (!this.btnContainer4.classList.contains("hide")) {
      this.btnContainer4.classList.add("hide");
    }
  }
  showBtnContainer4() {
    if (this.btnContainer4.classList.contains("hide")) {
      this.btnContainer4.classList.remove("hide");
    }
  }
  hideBtnContainer5() {
    if (!this.btnContainer5.classList.contains("hide")) {
      this.btnContainer5.classList.add("hide");
    }
  }
  showBtnContainer5() {
    if (this.btnContainer5.classList.contains("hide")) {
      this.btnContainer5.classList.remove("hide");
    }
  }
  setAppControlsContainer() {
    this.appControlsContainer.appendChild(homeBtnFunction.homeBtn);
    this.appControlsContainer.appendChild(pauseFunction.pauseBtn);
  }
  createAndSetAppSpecificStructure() {
    this.appStructure();
  }
  createAndSetAppStructureThenHideGrid() {
    // this.createMainAppStructure();
    this.setMainAppStructure();
    this.gridHideAdd();
  }
  elementRemover(elements) {
    elements.forEach((item) => {
      if (document.querySelector(`${item}`)) {
        document.querySelector(`${item}`).remove();
      }
    });
  }
  // resetAppContainterContents() {
  //   document.querySelector(".container").childNodes.forEach((container) => {
  //     console.log(container);
  //     container.textContent = "";
  //   });
  // }
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
  gridRemove() {
    this.grid.childNodes.forEach((item) => {
      item.remove();
    });
    this.grid.remove();
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

const appContainer = new AppContainer();

export { appContainer };
