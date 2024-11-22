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
    if (elements.structureElements || elements.interactiveElements) {
      elements.structureElements.forEach((item) => {
        item.classList.add("no-touch");
      });
    }
  },
  enableTouch() {
    if (elements.structureElements) {
      elements.structureElements.forEach((item) => {
        item.classList.remove("no-touch");
      });
    }
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
    if (elements.structureElements || elements.interactiveElements) {
      elements.structureElements.forEach((item) => {
        item.classList.add("strong-blur");
      });
    }
  },
  removeStrongBlur() {
    if (elements.structureElements) {
      elements.structureElements.forEach((item) => {
        item.classList.remove("strong-blur");
      });
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
    console.log(this.isPaused);

    this.pauseBtn.removeEventListener("pointerdown", this.pause);
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", this.unpause);
    }, 200);

    toggleTouchFunction.disableTouch();
    toggleBlur.addStrongBlur();
    return this.isPaused;
  }
  unpause() {
    this.isPaused = false;
    console.log(this.isPaused);

    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", this.pause);
    }, 200);
    if (elements.structureElements) {
      toggleTouchFunction.enableTouch();
      toggleBlur.removeStrongBlur();
    }
    return this.isPaused;
  }
}

const pauseFunction = new PauseFunction();

export { elements, pauseFunction, toggleTouchFunction, toggleBlur };
