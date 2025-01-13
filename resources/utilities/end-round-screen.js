import { appContainer } from "./app-container-class.js";
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
    this.tryAgainBtn.addEventListener("pointerdown", appContainer.startSession);
    this.finishBtn.addEventListener("pointerdown", appContainer.endApp);
  },
  displayContainer() {
    if (timerFunction.timerFinished) {
      this.setScoreMessage();
      this.endMessagesContainer.appendChild(this.tryAgainBtn);
      this.endMessagesContainer.appendChild(this.finishBtn);
      this.endMessagesContainer.appendChild(this.assessmentMessage);
      this.endMessagesContainer.appendChild(this.scoreMessage);
      scoreAssessment.feedback; // needs to be changed to be dynamic based on the activity id and set!
      appContainer.setBtnContainer5(endRoundScreen.endMessagesContainer);
      appContainer.showBtnContainer5();
    }
  },
  removeContainer() {
    if (endRoundScreen.endMessagesContainer) {
      appContainer.hideBtnContainer5();
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
