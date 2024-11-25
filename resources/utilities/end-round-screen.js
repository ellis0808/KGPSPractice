import { appStructure } from "./app-structure-object.js";

const endRoundScreen = {
  tryAgainBtn: document.createElement("button"),
  finishBtn: document.createElement("button"),
  endMessagesContainer: document.createElement("div"),
  initializeContainer(link1, link2) {
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
    console.log(this.endMessagesContainer);
  },
  setBtnLinks(link1, link2) {
    this.tryAgainBtn.addEventListener("pointerdown", link1);
    this.finishBtn.addEventListener("pointerdown", link2);
  },
  displayContainer() {
    console.log(this.endMessagesContainer);

    this.endMessagesContainer.appendChild(this.tryAgainBtn);
    this.endMessagesContainer.appendChild(this.finishBtn);
    appStructure.setBtnContainer5(this.endMessagesContainer);
  },
  removeContainer() {
    delete this.endMessagesContainer;
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
