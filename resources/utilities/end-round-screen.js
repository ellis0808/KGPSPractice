import { App } from "./app-class.js";
import { score, scoreAssessment } from "./score.js";
import { timerFunction } from "./timer.js";

const endRoundScreen = {
  createBtnsAndContainer() {
    this.tryAgainBtn = document.createElement("div");
    this.finishBtn = document.createElement("div");
    this.endMessagesContainer = document.createElement("div");
    this.assessmentMessage = document.createElement("div");
    this.scoreMessage = document.createElement("div");
  },
  initializeContainer(link1, link2) {
    this.createBtnsAndContainer();
    this.addClassesAndText();
    this.setBtnLinks(link1, link2);
  },
  addClassesAndText() {
    this.endMessagesContainer.classList.add(
      "end-messages-container",
      "matching-app"
    );
    this.tryAgainBtn.classList.add("try-again-btn", "button");
    this.tryAgainBtn.innerText = "One More Time";
    this.finishBtn.classList.add("finish-btn", "button");
    this.finishBtn.innerText = "Finish";
    this.assessmentMessage.classList.add("final-score-assessment");
    this.scoreMessage.classList.add("final-score-alert-score");
  },
  setBtnLinks(link1, link2) {
    this.tryAgainBtn.addEventListener("pointerdown", link1);
    this.finishBtn.addEventListener("pointerdown", link2);
  },
  displayContainer() {
    if (timerFunction.timerFinished) {
      this.setScoreMessage();
      this.endMessagesContainer.appendChild(this.tryAgainBtn);
      this.endMessagesContainer.appendChild(this.finishBtn);
      this.endMessagesContainer.appendChild(this.assessmentMessage);
      this.endMessagesContainer.appendChild(this.scoreMessage);
      scoreAssessment.matching();
      App.setBtnContainer5(this.endMessagesContainer);
    }
  },
  removeContainer() {
    if (this.endMessagesContainer) {
      this.endMessagesContainer.remove();
    }
  },
  setAssessmentMessage(message) {
    this.assessmentMessage.innerText = message;
  },
  setAssessmentAudio(audio) {
    audio;
  },
  setScoreMessage() {
    this.scoreMessage.innerText = score.currentScore;
  },
};

export { endRoundScreen };
