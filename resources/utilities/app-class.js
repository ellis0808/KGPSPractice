import { mainContainer } from "./variables.js";

class App {
  constructor() {}
  startSession(time) {
    audio.navigationSfx.startApp.play();
    endRoundScreen.removeContainer();
    startScreen.removeStartScreen();
    setTimeout(() => {
      matchingAppSessions.startRound();
    }, 950);
    setTimeout(() => {
      timerFunction.startTimer(time);
    }, 1000);
  }
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
  }
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
  }
  prepareForNewRound() {
    this.clearBoard();
    endRoundScreen.removeContainer();
    toggleTouchFunction.enableTouch();
    toggleBlur.removeWeakBlur();
    score.displayHideToggle();
    timerFunction.toggleTimerHide();
    appStructure.appControlsContainer.classList.remove("hide");
    appStructure.gridHideRemove();
  }
  startRound() {
    elements.getElements(matchingAppElements);
    this.prepareForNewRound();
    setTimeout(() => {
      gridItems.loadAndGenerateItems(alphabet); // to be changed to dynamic value based on set!
      matchingApp.activateEventListeners();
      appStructure.setBtnContainer1(timerFunction.timer, score.display);
      setTimeout(() => {
        toggleTouchFunction.enableTouch();
      }, 300);
      setTimeout(() => {
        appStructure.gridHideRemove();
        console.log(appStructure.grid.classList.contains);
      }, 100);
      console.log(matchingAppElements);
    }, 1000);
    toggleBlur.removeAllBlur();
  }
  endRound() {
    score.updateUserScore();
    // score.updateStudentTotalScore();
    endRoundScreen.displayContainer();
  }
}

const appStructure = {
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
  },
  setMainAppStructure() {
    mainContainer.appendChild(this.appContainer);
    this.appContainer.appendChild(this.leftMenuContainer);
    this.appContainer.appendChild(this.btnContainer1);
    this.appContainer.appendChild(this.btnContainer2);
    this.appContainer.appendChild(this.btnContainer4);
    this.appContainer.appendChild(this.grid);
    this.appContainer.appendChild(this.appControlsContainer);
  },
  setBtnContainer1(item1, item2) {
    this.btnContainer1.appendChild(item1);
    this.btnContainer1.appendChild(item2);
  },
  setBtnContainer2(item1, item2) {
    this.btnContainer2.appendChild(item1);
    this.btnContainer2.appendChild(item2);
  },
  setBtnContainer3(item) {
    this.btnContainer3.appendChild(item);
  },
  setBtnContainer4(item) {
    this.btnContainer4.appendChild(item);
  },
  setBtnContainer5(item) {
    this.btnContainer5.appendChild(item);
    this.appContainer.appendChild(this.btnContainer5);
  },
  setAppControlsContainer(item1, item2) {
    this.appControlsContainer.appendChild(item1);
    this.appControlsContainer.appendChild(item2);
  },
  createAndSetAppStructureThenHideGrid() {
    this.createMainAppStructure();
    this.setMainAppStructure();
    this.gridHideAdd();
  },
  removeMainAppStructure() {
    delete this.appContainer;
    delete this.grid;
    delete this.btnContainer1;
    delete this.btnContainer2;
    delete this.btnContainer4;
    delete this.homeBtnContainer;
    delete this.leftMenuContainer;
  },
  gridHideAdd() {
    if (!this.grid.classList.contains("gridHide")) {
      this.grid.classList.add("gridHide");
    }
  },
  gridHideRemove() {
    if (this.grid.classList.contains("gridHide")) {
      this.grid.classList.remove("gridHide");
    }
  },
  clearGrid() {
    this.grid.childNodes.forEach((item) => {
      item.remove();
    });
  },
};

export { appStructure };
