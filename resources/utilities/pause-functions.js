import { homeBtnFunction } from "./go-home-function";
import { appContainer } from "./app-container-class.js";

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
    if (!appContainer.grid.classList.contains("no-touch")) {
      appContainer.grid.classList.add("no-touch");
    }
    // if (elements.structureElements || elements.interactiveElements) {
    //   elements.structureElements.forEach((item) => {
    //     item.classList.add("no-touch");
    //   });
    // }
  },
  enableTouch() {
    if (appContainer.grid.classList.contains("no-touch")) {
      appContainer.grid.classList.remove("no-touch");
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
    if (!appContainer.grid.classList.contains("strong-blur")) {
      appContainer.grid.classList.add("strong-blur");
    }
  },
  removeStrongBlur() {
    if (appContainer.grid.classList.contains("strong-blur")) {
      appContainer.grid.classList.remove("strong-blur");
    }
  },
  removeAllBlur() {
    if (appContainer.grid.classList.contains("blur", "strong-blur")) {
      appContainer.grid.classList.remove("blur", "strong-blur");
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
    homeBtnFunction.removeContainer();

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
