import { appStructure } from "./app-structure-object.js";
import { score } from "./score.js";
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
      this.endMessagesContainer.appendChild(this.tryAgainBtn);
      this.endMessagesContainer.appendChild(this.finishBtn);
      this.setScoreMessage();
      appStructure.setBtnContainer5(this.endMessagesContainer);
    }
  },
  removeContainer() {
    delete this.endMessagesContainer;
  },
  setAssessmentMessage(message) {
    this.assessmentMessage.innerText = message;
  },
  setScoreMessage() {
    console.log("score message set!");
    console.log(score.currentScore);

    this.scoreMessage.innerText = score.currentScore;
  },

  //   displayContainer() {
  //     score.updateUserScore();
  //     updateUserTotalScore();
  //     appStructure.setBtnContainer5(endMessagesContainer);
  //
  //     const finalScoreAssessment = document.createElement("div");
  //     finalScoreAssessment.classList.add("final-score-assessment");
  //     const finalScoreAlertScore = document.createElement("div");
  //     finalScoreAlertScore.classList.add("final-score-alert-score");

  //     switch (true) {
  //       case score.currentScore < 5:
  //         finalScoreAssessment.innerText = "Better Luck\r\nNext Time!";
  //         break;
  //       case score.currentScore > 31:
  //         finalScoreAssessment.innerText = "Outstanding!";
  //         break;
  //       case score.currentScore > 27:
  //         finalScoreAssessment.innerText = "Amazing!";
  //         break;
  //       case score.currentScore > 23:
  //         finalScoreAssessment.innerText = "Excellent!";
  //         break;
  //       case score.currentScore > 18:
  //         finalScoreAssessment.innerText = "Great Job!";

  //         break;
  //       case score.currentScore > 13:
  //         finalScoreAssessment.innerText = "Good Job!";
  //         break;
  //     }
  //     finalScoreAlertScore.innerText = `${score.currentScore}`;
  //     endMessagesContainer.appendChild(finalScoreAssessment);
  //     endMessagesContainer.appendChild(finalScoreAlertScore);
  //     endMessagesContainer.appendChild(tryAgainBtn);
  //     endMessagesContainer.appendChild(finishBtn);
  //     score.updateUserScore();
  //     setTimeout(() => {
  //       switch (true) {
  //         case score.currentScore < 5:
  //           audio.feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
  //           break;
  //         case score.currentScore > 31:
  //           audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
  //           break;
  //         case score.currentScore > 27:
  //           audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
  //           break;
  //         case score.currentScore > 23:
  //           audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
  //           break;
  //         case score.currentScore > 18:
  //           audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
  //           break;
  //         case score.currentScore > 13:
  //           audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
  //           break;
  //       }
  //     }, 300);
  //   },
};

export { endRoundScreen };
