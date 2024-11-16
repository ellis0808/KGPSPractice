class ToggleTouchFunction {
  disableTouch(elements) {
    console.log(elements);

    if (elements.items) {
      console.log();
      elements.items.forEach((item) => {
        item.classList.add("no-touch", "strong-blur");
      });
    }
  }
  enableTouch(elements) {
    if (elements.items) {
      elements.items.forEach((item) => {
        item.classList.remove("no-touch", "strong-blur");
      });
    }
  }
}
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
  pause(elements) {
    this.isPaused = true;
    this.pauseBtn.removeEventListener("pointerdown", this.pause);
    toggleTouchFunction.disableTouch(elements);
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", () => this.unpause());
    }, 200);
  }
  unpause(elements) {
    this.isPaused = false;
    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    if (elements.items) {
      toggleTouchFunction.enableTouch(elements);
    }
    setTimeout(() => {
      this.pauseBtn.addEventListener("pointerdown", () => this.pause());
    }, 200);
  }
}

const toggleTouchFunction = new ToggleTouchFunction();
const pauseFunction = new PauseFunction();

export { pauseFunction, toggleTouchFunction };
