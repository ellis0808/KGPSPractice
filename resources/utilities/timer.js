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
            this.endCurrentAppRound();
            console.log("0");
          }
        }
      }, 1000);
    }, 500);
  },
  endCurrentAppRound() {
    toggleTouchFunction.disableTouch();
    setTimeout(displayEndMessagesContainer, 600);
    toggleTouchFunction.disableTouch();
  },
  displayEndMessagesContainer() {
    score.updateUserScore();
    updateUserTotalScore();
    const btnContainer5 = document.createElement("div");
    btnContainer5.classList.add("btn-container5");
    const endMessagesContainer = document.createElement("div");
    endMessagesContainer.classList.add(
      "end-messages-container",
      "letter-matching-app"
    );
    appStructure.appContainer.appendChild(btnContainer5);
    btnContainer5.appendChild(endMessagesContainer);
    const finalScoreAssessment = document.createElement("div");
    finalScoreAssessment.classList.add("final-score-assessment");
    const finalScoreAlertScore = document.createElement("div");
    finalScoreAlertScore.classList.add("final-score-alert-score");

    switch (true) {
      case score.currentScore < 5:
        finalScoreAssessment.innerText = "Better Luck\r\nNext Time!";
        break;
      case score.currentScore > 31:
        finalScoreAssessment.innerText = "Outstanding!";
        break;
      case score.currentScore > 27:
        finalScoreAssessment.innerText = "Amazing!";
        break;
      case score.currentScore > 23:
        finalScoreAssessment.innerText = "Excellent!";
        break;
      case score.currentScore > 18:
        finalScoreAssessment.innerText = "Great Job!";

        break;
      case score.currentScore > 13:
        finalScoreAssessment.innerText = "Good Job!";
        break;
    }
    finalScoreAlertScore.innerText = `${score.currentScore}`;
    endMessagesContainer.appendChild(finalScoreAssessment);
    endMessagesContainer.appendChild(finalScoreAlertScore);
    endMessagesContainer.appendChild(tryAgainBtn);
    endMessagesContainer.appendChild(finishBtn);
    score.updateUserScore();
    setTimeout(() => {
      switch (true) {
        case score.currentScore < 5:
          audio.feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
          break;
        case score.currentScore > 31:
          audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
          break;
        case score.currentScore > 27:
          audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
          break;
        case score.currentScore > 23:
          audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
          break;
        case score.currentScore > 18:
          audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
          break;
        case score.currentScore > 13:
          audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
          break;
      }
    }, 300);
  },
  setRoundEnd(arg) {
    let roundEnd;
    console.log("1");
    return (roundEnd = arg);
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
      this.timer.textContent = this.time;
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
};

export { timerFunction, toggleTimerHide, timer };
