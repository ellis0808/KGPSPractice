class PauseFunction {
  constructor() {
    this.pauseBtn = document.createElement("div");
    this.pauseBtn.classList.add("pause-btn");
    this.pauseBtn.innerHTML = `<i class="fa-solid fa-pause fa-1x"></i>`;
    this.pauseBtn.addEventListener("pointerdown", this.pause);
    this.pause = this.pause.bind(this);
    this.unpause = this.unpause.bind(this);
    this.isPaused = false;
  }
  pause(elements) {
    this.isPaused = true;
    this.pauseBtn.removeEventListener("pointerdown", this.pause);
    this.disableTouch(elements);
  }
  unpause(elements) {
    this.isPaused = false;
    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    this.pauseBtn.addEventListener("pointerdown", this.pause);
    this.enableTouch(elements);
  }
  disableTouch(elements) {
    elements.forEach((item) => {
      item.classList.add("no-touch");
    });
  }
  enableTouch(elements) {
    elements.forEach((item) => {
      item.classList.remove("no-touch");
    });
  }
}

const pauseFunction = new PauseFunction();

export { pauseFunction };
