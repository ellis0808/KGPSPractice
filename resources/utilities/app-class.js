import { mainContainer } from "./variables.js";
import { timerFunction } from "./timer.js";
import {
  pauseFunction,
  elements,
  toggleBlur,
  toggleTouchFunction,
} from "./pause-functions.js";
import { scoreFunction } from "./scoreFunction.js";
import { startScreen } from "./start-screen.js";
import { homeBtnFunction } from "./go-home-function.js";
import { endRoundScreen } from "./end-round-screen.js";
import { audio } from "./audio.js";
import { menuItems } from "../apps/general/start-main-app.js";
console.log("app class");

class App {
  constructor() {
    this.homeStyleSheet = "/KGPSEnglishPractice-test/resources/css/styles.css";
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
    this.time = null;
    this.appElements = null;
    this.clearBoardMethod = null;
    this.appEventListeners = null;
    this.appStructure = null;
    this.gridPopulator = null;
    this.endApp = this.endApp.bind(this);
    this.startSession = this.startSession.bind(this);
    this.endSession = this.endSession.bind(this);
    this.startRound = this.startRound.bind(this);
    this.endRound = this.endRound.bind(this);
    this.hideBtnContainer2 = this.hideBtnContainer2.bind(this);
  }
  setAppVariables(
    time,
    appElm,
    boardClear,
    eventListeners,
    appStructure,
    gridPopulator
  ) {
    this.time = time;
    this.appElements = appElm;
    this.clearBoardMethod = boardClear;
    this.appEventListeners = eventListeners;
    this.appStructure = appStructure;
    this.gridPopulator = gridPopulator;
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
  //     activity_score: scoreFunction.currentScore,
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
  startApp() {
    this.setDoubleTapPreventer();
    this.createAndSetAppStructureThenHideGrid();
    this.setForeignElements();
    this.createAndSetAppSpecificStructure();
    elements.getElements(this.appElements);
    console.log(elements);
    pauseFunction.unpause();
    scoreFunction.display.innerText = scoreFunction.currentScore;
    this.appContainer.classList.remove("hide");
    scoreFunction.displayHideToggle();

    if (!timerFunction.timer.classList.contains("hide2")) {
      timerFunction.toggleTimerHide();
    }

    // setTimeout(this.setUser, 2000);
    toggleBlur.removeAllBlur();
    console.log(this.time);

    console.log("start app method finished");
  }
  endApp() {
    timerFunction.clearTimer();
    scoreFunction.updateUserScore();
    this.endSession();
    endRoundScreen.removeContainer();
    setTimeout(() => {
      document.querySelector(".container").remove();
      this.gridRemove();
      // this.removeMainAppStructure();
      setTimeout(() => {
        stylesheet.setAttribute("href", this.homeStyleSheet);
        menuItems.displayMainPage();
        setTimeout(menuItems.restoreMainMenu, 100);
      }, 500);
    }, 500);
    scoreFunction.display.innerText = scoreFunction.currentScore;
  }
  setForeignElements() {
    homeBtnFunction.initialize();
    startScreen.createAndSetStartScreen();
    endRoundScreen.initializeContainer();
    this.setAppControlsContainer(
      homeBtnFunction.homeBtn,
      pauseFunction.pauseBtn
    );
    timerFunction.setEndRoundFunction(this.endRound);
  }
  applyAppStyleSheet(newSheet) {
    stylesheet.setAttribute("href", newSheet);
  }
  startSession() {
    audio.navigationSfx.startApp.play();
    this.prepareForNewRound();
    this.initializeEventListeners();
    endRoundScreen.removeContainer();
    startScreen.removeStartScreen();
    setTimeout(() => {
      this.btnContainer2.remove();
      this.startRound();
    }, 950);
    setTimeout(() => {
      timerFunction.startTimer(this.time);
    }, 1000);
  }
  endSession() {
    pauseFunction.unpause();
    this.appContainer.classList.add("hide");
    this.appControlsContainer.classList.add("hide");
    document.querySelectorAll(".matching-app, .line").forEach((item) => {
      item.remove();
    }); // needs to be abstracted out
    endRoundScreen.removeContainer();
    homeBtnFunction.removeContainer();
    scoreFunction.resetCurrentScore();
    timerFunction.clearTimer();
    toggleBlur.removeAllBlur();
    if (this.clearBoardMethod) {
      this.clearBoard();
    }
    scoreFunction.displayHideToggle();
    timerFunction.toggleTimerHide();
  }
  clearBoard() {
    this.clearBoardMethod();
  }
  prepareForNewRound() {
    this.clearBoard();
    endRoundScreen.removeContainer();
    toggleTouchFunction.enableTouch();
    toggleBlur.removeWeakBlur();
    scoreFunction.displayHideToggle();
    timerFunction.toggleTimerHide();
    this.appControlsContainer.classList.remove("hide");
    this.gridHideRemove();
  }
  startRound() {
    elements.getElements(this.appElements);
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
      console.log(this.appElements);
    }, 1000);
    toggleBlur.removeAllBlur();
  }
  endRound() {
    scoreFunction.updateUserScore();
    // scoreFunction.updateStudentTotalScore();
    endRoundScreen.displayContainer();
  }
  initializeEventListeners() {
    console.log("first?");
    this.appEventListeners();
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
  removeMainAppStructure() {
    this.appContainer.remove();
    this.grid.remove();
    this.btnContainer1.remove();
    this.btnContainer2.remove();
    this.btnContainer4.remove();
    this.appControlsContainer.remove();
    this.leftMenuContainer.remove();
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
  gridRemove() {
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

const app = new App();

export { app };
