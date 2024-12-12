import { homeBtnFunction } from "./go-home-function";
import { app } from "./app-class.js";

const elements = {
  structureElements: null,
  interactiveElements: null,
  getElements(queryparameter) {
    if (queryparameter) {
      elements.structureElements = document.querySelectorAll(queryparameter[0]);
    }
  },
};
const toggleTouchFunction = {
  disableTouch() {
    if (app.grid.classList.contains("no-touch")) {
      app.grid.classList.remove("no-touch");
    }
    // if (elements.structureElements || elements.interactiveElements) {
    //   elements.structureElements.forEach((item) => {
    //     item.classList.add("no-touch");
    //   });
    // }
  },
  enableTouch() {
    if (!app.grid.classList.contains("no-touch")) {
      app.grid.classList.add("no-touch");
    }
    // if (elements.structureElements) {
    //   elements.structureElements.forEach((item) => {
    //     item.classList.remove("no-touch");
    //   });
    // }
  },
};
const toggleBlur = {
  addWeakBlur() {
    if (elements.structureElements || elements.interactiveElements) {
      elements.structureElements.forEach((item) => {
        item.classList.add("blur");
      });
    }
  },
  removeWeakBlur() {
    if (elements.structureElements) {
      elements.structureElements.forEach((item) => {
        item.classList.remove("blur");
      });
    }
  },
  addStrongBlur() {
    if (!app.grid.classList.contains("strong-blur")) {
      app.grid.classList.add("strong-blur");
    }
  },
  removeStrongBlur() {
    if (app.grid.classList.contains("strong-blur")) {
      app.grid.classList.remove("strong-blur");
    }
  },
  removeAllBlur() {
    if (app.grid.classList.contains("blur", "strong-blur")) {
      app.grid.classList.remove("blur", "strong-blur");
    }
  },
};
class PauseFunction {
  constructor() {
    this.pauseBtn = document.createElement("div");
    this.pauseBtn.classList.add("pause-btn");
    this.pauseBtn.innerHTML = `<i class="fa-solid fa-pause fa-1x"></i>`;
    this.pauseBtn.addEventListener("pointerdown", () => this.pause);
    this.pause = this.pause.bind(this);
    this.unpause = this.unpause.bind(this);
    this.isPaused = false;
  }
  pause() {
    this.isPaused = true;

    this.pauseToUnPauseToggle();

    toggleTouchFunction.disableTouch();
    toggleBlur.addStrongBlur();
  }
  unpause() {
    this.isPaused = false;
    console.log(homeBtnFunction.goHomeContainerIsDisplayed);

    if (homeBtnFunction.goHomeContainerIsDisplayed) {
      homeBtnFunction.removeContainer();
    }

    this.unpauseToPauseToggle();

    toggleTouchFunction.enableTouch();
    toggleBlur.removeStrongBlur();

    // if (document.querySelector(".go-home-container")) {
    //   homeBtnFunction.removeContainer();
    // }
  }
  pauseToUnPauseToggle() {
    this.pauseBtn.removeEventListener("pointerdown", this.pause);
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", this.unpause);
    }, 200);
  }
  unpauseToPauseToggle() {
    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", this.pause);
    }, 200);
  }
  getIsPausedStatus() {
    return this.isPaused;
  }
}

const pauseFunction = new PauseFunction();

export { elements, pauseFunction, toggleTouchFunction, toggleBlur };
