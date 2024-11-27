import { pauseFunction, toggleTouchFunction } from "./pause-functions.js";
import { endRoundScreen } from "./end-round-screen.js";
const timer = document.createElement("div");

function toggleTimerHide() {
  timer.classList.toggle("hide2");
}

const timerFunction = {
  endRound: null,
  timer: (() => {
    const div = document.createElement("div");
    div.classList.add("timer");
    return div;
  })(),
  time: null,
  counter: null,
  counterFinished: false,
  countDown() {
    setTimeout(() => {
      this.counter = setInterval(() => {
        if (!pauseFunction.isPaused) {
          --this.time;
          this.updateTimerDisplay();
          if (this.time < 10 && this.time >= 0) {
            this.timer.textContent = `0:0${this.time}`;
          } else if (this.time >= 0) {
            this.timer.textContent = `0:${this.time}`;
          } else {
            this.timer.textContent = "0:00";
            toggleTouchFunction.disableTouch();
            clearInterval(this.counter);
          }
        }
      }, 1000);
    }, 500);
  },
  displayTimer() {
    this.countDown();
  },
  updateTimerDisplay() {
    this.timer.textContent =
      this.time > 10 ? `0:${this.time}` : `0:${this.time}`;
  },
  setTimer(time) {
    this.time = time;
    if (this.time === 60) {
      this.timer.textContent = "1:00";
    } else {
      this.timer.textContent = `0:${this.time}`;
    }
  },
  toggleTimerHide() {
    this.timer.classList.toggle("hide2");
  },
  startTimer(time) {
    this.setTimer(time);
    setTimeout(() => {
      this.displayTimer();
    }, 500);
  },
  setEndRoundApp(endRound) {
    this.endRound = endRound();
  },
};

export { timerFunction, toggleTimerHide, timer };
