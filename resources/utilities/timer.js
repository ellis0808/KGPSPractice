import { pauseFunction, toggleTouchFunction } from "./pause-functions.js";

const timer = document.createElement("div");

function toggleTimerHide() {
  timer.classList.toggle("hide2");
}

const timerFunction = {
  timer: (() => {
    const div = document.createElement("div");
    div.classList.add("timer");
    return div;
  })(),
  time: null,
  counter: null,
  countDown() {
    this.counter = setInterval(() => {
      if (!pauseFunction.isPaused) {
        console.log(pauseFunction.isPaused);
        --this.time;
        this.updateTimerDisplay();
        // if (this.time < 10 && this.time >= 0) {
        //   this.timer.textContent = `0:0${this.time}`;
        // } else if (this.time >= 0) {
        //   this.timer.textContent = `0:${this.time}`;
        // } else {
        // this.timer.textContent = "0:00";
        clearInterval(this.counter);
        toggleTouchFunction.disableTouch();
        // }
      }
    }, 1000);
  },
  displayTimer() {
    this.countDown();
  },
  updateTimerDisplay() {
    this.timer.textContent =
      this.time > 10 ? `0:${this.time}` : `0:0${this.time}`;
  },
  setTimer(time) {
    this.time = time;
    if (this.time === 60) {
      this.timer.textContent = "1:00";
    } else {
      this.timer.textContent = this.time;
    }
  },
  toggleTimerHide() {
    this.timer.classList.toggle("hide2");
  },
  startTimer() {
    setTimeout(this.displayTimer, 500);
    console.log("timer started");
  },
};

export { timerFunction, toggleTimerHide, timer };
