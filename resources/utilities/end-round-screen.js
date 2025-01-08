import { app } from "./app-class.js";
import { scoreFunction, scoreAssessment } from "./score.js";
import { timerFunction } from "./timer.js";

const endRoundScreen = {
  createBtnsAndContainer() {
    this.tryAgainBtn = document.createElement("div");
    this.finishBtn = document.createElement("div");
    this.endMessagesContainer = document.createElement("div");
    this.assessmentMessage = document.createElement("div");
    this.scoreMessage = document.createElement("div");
  },
  initializeContainer() {
    this.createBtnsAndContainer();
    this.addClassesAndText();
    this.setBtnLinks();
  },
  addClassesAndText() {
    this.endMessagesContainer.classList.add("end-messages-container");
    this.tryAgainBtn.classList.add("try-again-btn", "button");
    this.tryAgainBtn.innerText = "One More Time";
    this.finishBtn.classList.add("finish-btn", "button");
    this.finishBtn.innerText = "Finish";
    this.assessmentMessage.classList.add("final-score-assessment");
    this.scoreMessage.classList.add("final-score-alert-score");
  },
  setBtnLinks() {
    this.tryAgainBtn.addEventListener("pointerdown", app.startSession);
    this.finishBtn.addEventListener("pointerdown", app.endApp);
  },
  displayContainer() {
    if (timerFunction.timerFinished) {
      this.setScoreMessage();
      this.endMessagesContainer.appendChild(this.tryAgainBtn);
      this.endMessagesContainer.appendChild(this.finishBtn);
      this.endMessagesContainer.appendChild(this.assessmentMessage);
      this.endMessagesContainer.appendChild(this.scoreMessage);
      scoreAssessment.matching(); // needs to be changed to be dynamic based on the activity id and set!
      app.setBtnContainer5(this.endMessagesContainer);
      app.showBtnContainer5();
    }
  },
  removeContainer() {
    if (this.endMessagesContainer) {
      app.hideBtnContainer5();
    }
  },
  setAssessmentMessage(message) {
    this.assessmentMessage.innerText = message;
  },
  setAssessmentAudio(audio) {
    audio;
  },
  setScoreMessage() {
    this.scoreMessage.innerText = scoreFunction.currentScore;
  },
};

export { endRoundScreen };
