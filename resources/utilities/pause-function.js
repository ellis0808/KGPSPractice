import { elements } from "../apps/matching/matching.js";

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
    this.pauseBtn.addEventListener("pointerdown", () => this.unpause());
    this.disableTouch();
    console.log(elements.items);
  }
  unpause(elements) {
    this.isPaused = false;
    this.pauseBtn.removeEventListener("pointerdown", this.unpause);
    this.pauseBtn.addEventListener("pointerdown", () => this.pause());
    if (elements.items) {
      this.enableTouch();
    }
  }
  disableTouch() {
    if (elements.items) {
      console.log();
      elements.items.forEach((item) => {
        item.classList.add("no-touch", "strong-blur");
      });
    }
  }
  enableTouch(elements) {
    if (elements) {
      elements.items.forEach((item) => {
        item.classList.remove("no-touch", "strong-blur");
      });
    }
  }
}

const pauseFunction = new PauseFunction();

export { pauseFunction };
