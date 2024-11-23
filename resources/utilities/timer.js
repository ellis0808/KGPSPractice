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
      if (!pauseFunction.isPaused()) {
        console.log(pauseFunction.isPaused);
        --this.time;
        if (this.time >= 60) {
          this.timer.textContent = `1:00`;
          // let minutes = Math.floor(this.time / 60);
          // let seconds = this.time % 60;
          // this.timer.textContent = `${minutes}:${seconds}`
        } else if (this.time < 10 && this.time >= 0) {
          this.timer.textContent = `0:0${this.time}`;
        } else if (this.time >= 0) {
          this.timer.textContent = `0:${this.time}`;
        } else {
          this.timer.textContent = "0:00";
          clearInterval(this.counter);
          console.log(this.counter);

          toggleTouchFunction.disableTouch();
        }
      }
    }, 1000);
  },
  displayTimer() {
    this.countDown();
  },
  setTimer(time) {
    this.time = time;
    this.timer.textContent = this.time;
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
};

export { timerFunction, toggleTimerHide, timer };
