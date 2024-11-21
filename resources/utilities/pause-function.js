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
    console.log(elements);

    if (elements.structureElements || elements.interactiveElements) {
      elements.structureElements.forEach((item) => {
        item.classList.add("no-touch", "strong-blur");
      });
    }
  },
  enableTouch() {
    if (elements.structureElements) {
      elements.structureElements.forEach((item) => {
        item.classList.remove("no-touch", "strong-blur");
      });
    }
  },
};
const toggleBlur = {
  addWeakBlur() {
    console.log(elements);

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
    console.log(elements);

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
  togglePauseBtn() {
    if (this.isPaused) {
      this.pauseBtn.removeEventListener("pointerdown", this.pause);
    }
  }
  pause() {
    this.isPaused = true;
    this.pauseBtn.removeEventListener("pointerdown", this.pause);
    console.log(elements);

    toggleTouchFunction.disableTouch();
    toggleBlur.addStrongBlur();
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", () => this.unpause());
    }, 200);
  }
  unpause() {
    this.isPaused = false;
    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    if (elements.structureElements) {
      toggleTouchFunction.enableTouch();
      toggleBlur.removeStrongBlur();
    }
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", () => this.pause());
    }, 200);
  }
}

const pauseFunction = new PauseFunction();

export { elements, pauseFunction, toggleTouchFunction, toggleBlur };
