class PauseFunction {
  constructor(elements) {
    this.pauseBtn = document.createElement("div");
    this.pauseBtn.classList.add("pause-btn");
    this.pauseBtn.innerHTML = `<i class="fa-solid fa-pause fa-1x"></i>`;
    this.pauseBtn.addEventListener("pointerdown", (elements) => this.pause);
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
    this.pauseBtn.addEventListener("pointerdown", () => this.unpause(elements));
    this.disableTouch(elements);
    console.log(elements);
  }
  unpause(elements) {
    this.isPaused = false;
    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    this.pauseBtn.addEventListener("pointerdown", () => this.pause(elements));
    if (elements) {
      this.enableTouch(elements);
    }
  }
  disableTouch(elements) {
    if (elements) {
      console.log(elements);
      elements.forEach((item) => {
        item.classList.add("no-touch", "strong-blur");
      });
    }
  }
  enableTouch(elements) {
    if (elements) {
      elements.forEach((item) => {
        item.classList.remove("no-touch", "strong-blur");
      });
    }
  }
}

const pauseFunction = new PauseFunction();

export { pauseFunction };
