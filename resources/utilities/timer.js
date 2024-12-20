import { pauseFunction, toggleTouchFunction } from "./pause-functions.js";
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
  timerFinished: false,
  goalMet: false,
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
            this.setTimerFinishedValue(true);
            this.endRound();

            toggleTouchFunction.disableTouch();
            this.clearTimer();
          }
        }
      }, 1000);
    }, 1200);
  },
  countUp() {
    setTimeout(() => {
      this.counter = setInterval(() => {
        if (!pauseFunction.isPaused) {
          if (!this.goalMet) {
            ++this.time;
            // this.updateTimerDisplay();

            const m = Math.floor(this.time / 60);
            const s = this.time % 60;
            if (s < 10) {
              this.timer.textContent = `${m}:0${s}`;
            } else {
              this.timer.textContent = `${m}:${s}`;
            }
          } else {
            this.clearTimer();
            this.endRound();
          }
        }
      }, 1000);
    }, 1200);
  },
  displayCountDownTimer() {
    this.countDown();
  },
  displayCountUpTimer() {
    this.countUp();
  },
  updateTimerDisplay() {
    const m = Math.floor(this.time / 60);
    const s = this.time % 60;
    if (s === 0) {
      this.timer.textContent = `${m}:0${s}`;
    } else {
      this.timer.textContent = `${m}:${s}`;
    }
  },
  setTimer(time) {
    this.time = time;
    if (this.time === 60) {
      this.timer.textContent = "1:00";
    } else {
      this.timer.textContent = "0:00";
    }
  },
  clearTimer() {
    clearInterval(this.counter);
  },
  hide() {
    if (!this.timer.classList.contains("hide")) {
      this.timer.classList.add("hide");
    }
  },
  show() {
    if (this.timer.classList.contains("hide")) {
      this.timer.classList.remove("hide");
    }
  },
  startTimer(time) {
    this.setTimer(time);
    if (time === 0) {
      setTimeout(() => {
        this.displayCountUpTimer();
      }, 500);
    } else {
      setTimeout(() => {
        this.displayCountDownTimer();
      }, 500);
    }
  },
  setEndRoundFunction(endRound) {
    this.endRound = endRound;
  },
  setTimerFinishedValue(value) {
    this.timerFinished = value;
  },
};

export { timerFunction, toggleTimerHide, timer };
