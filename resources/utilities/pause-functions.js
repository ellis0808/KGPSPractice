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
  togglePauseBtn() {
    if (this.isPaused) {
      this.pauseBtn.removeEventListener("pointerdown", this.pause);
    }
    if (!this.isPaused) {
      this.pauseBtn.addEventListener("pointerdown", this.pause);
    }
  }
  pause() {
    this.isPaused = true;
    console.log(this.isPaused);

    this.pauseBtn.removeEventListener("pointerdown", () => this.pause());

    toggleTouchFunction.disableTouch();
    toggleBlur.addStrongBlur();
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", () => this.unpause());
    }, 200);
  }
  unpause() {
    this.isPaused = false;
    console.log(this.isPaused);

    this.pauseBtn.removeEventListener("pointerdown", () => this.unpause());
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
