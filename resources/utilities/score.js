// sessionCheck();
import { endRoundScreen } from "./end-round-screen.js";
import { audio } from "./audio.js";
import { BASE_PATH } from "./get-base-path.js";
const scoreFunction = {
  currentScore: 0,
  userScore: 0,
  highScore: 0,
  plusPoints: 5,
  minusPoints: 2,
  display: (() => {
    const div = document.createElement("div");

    div.classList.add("score-display");
    div.setAttribute("id", "score-display");
    // div.textContent = this.currentScore;
    return div;
  })(),
  increaseScore: function (amount) {
    this.currentScore += amount;
  },
  decreaseScore: function (amount) {
    if (this.currentScore > 0) {
      if (this.currentScore === 0) {
        amount = 0;
        return amount;
      }
      this.currentScore -= amount;
      return;
    }
  },
  updatePositiveCount(amount) {
    const points = amount;
    const increment = 1;
    let initialValue = this.currentScore;
    let target = this.currentScore + points;
    const increaseCount = setInterval(() => {
      initialValue += increment;
      if (initialValue > target) {
        clearInterval(increaseCount);
        return;
      }
      this.display.textContent = initialValue;
    }, 80);
    setTimeout(() => {
      this.increaseScore(amount);
    }, 300);
  },
  updateNegativeCount(amount) {
    if (this.currentScore === 0) {
      amount = 0;
      return amount;
    }
    const points = amount;
    const increment = 1;
    let initialValue = this.currentScore;
    let target = this.currentScore - points;
    const decreaseCount = setInterval(() => {
      initialValue -= increment;
      if (initialValue < target) {
        this.display.textContent = this.currentScore - points;
        clearInterval(decreaseCount);
        return;
      }
      this.display.textContent = initialValue;
    }, 80);
    setTimeout(() => {
      this.decreaseScore(amuont);
    }, 600);
  },
  hide() {
    if (!this.display.classList.contains("hide")) {
      this.display.classList.add("hide");
    }
    if (!this.display.classList.contains("hide2")) {
      this.display.classList.add("hide2");
    }
  },
  show() {
    if (this.display.classList.contains("hide")) {
      this.display.classList.remove("hide");
    }
    if (this.display.classList.contains("hide2")) {
      this.display.classList.remove("hide2");
    }
  },
  resetCurrentScore() {
    this.currentScore = 0;
    this.display.textContent = this.currentScore;
  },
  updateUserScore: async function (id) {
    try {
      const response = await fetch(
        `${BASE_PATH}api/get_total_score.php?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Network resposne was not okay");
      }
      const data = await response.json();
      if (data) {
        this.userScore = data.total_score;

        return this.userScore;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    return this.userScore;
  },
  async updateUserTotalScore(stats) {
    //  For student users; teachers will differ on user type, etc

    stats.questionsShort = stats.questionsShort.join(", ");
    stats.questionsMedium = stats.questionsMedium.join(", ");
    stats.questionsLong = stats.questionsLong.join(", ");
    stats.correctAnswersShort = stats.correctAnswersShort.join(", ");
    stats.correctAnswersMedium = stats.correctAnswersMedium.join(", ");
    stats.correctAnswersLong = stats.correctAnswersLong.join(", ");
    stats.incorrectAnswersShort = stats.incorrectAnswersShort.join(", ");
    stats.incorrectAnswersMedium = stats.incorrectAnswersMedium.join(", ");
    stats.incorrectAnswersLong = stats.incorrectAnswersLong.join(", ");
    const newStats = {
      user_id: stats.userID,
      user_type: stats.userAccess,
      activity_type: stats.activityType,
      activity_name: stats.activityName,
      score: scoreFunction.currentScore,
      time_duration_in_seconds: stats.totalElapsedTime,
      question_count: stats.questionCount,
      correct_answer_count: stats.correctAnswerCount,
      incorrect_answer_count: stats.incorrectAnswerCount,
      answer_attempts: stats.answerAttempts,
      questions_short: stats.questionsShort,
      questions_medium: stats.questionsMedium,
      questions_long: stats.questionsLong,
      correct_answers_short: stats.correctAnswersShort,
      correct_answers_medium: stats.correctAnswersMedium,
      correct_answers_long: stats.correctAnswersLong,
      incorrect_answers_short: stats.incorrectAnswersShort,
      incorrect_answers_medium: stats.incorrectAnswersMedium,
      incorrect_answers_long: stats.incorrectAnswersLong,
    };

    try {
      const response = await fetch(
        `${BASE_PATH}api/add_user_activity_record.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStats),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  },
};

const scoreAssessment = {
  assessmentMessage: null,
  assessmentAudio: null,
  finalScore: null,
  feedback: null,
  setFeedbackApp(app) {
    this.feedback = app;
  },
  matching() {
    switch (true) {
      case scoreFunction.currentScore <= 12:
        this.assessmentMessage = "Better Luck\r\nNext Time!";
        this.assessmentAudio =
          audio.feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
        break;
      case scoreFunction.currentScore > 31:
        this.assessmentMessage = "Outstanding!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
        break;
      case scoreFunction.currentScore > 27:
        this.assessmentMessage = "Amazing!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
        break;
      case scoreFunction.currentScore > 23:
        this.assessmentMessage = "Excellent!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
        break;
      case scoreFunction.currentScore > 18:
        this.assessmentMessage = "Great Job!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
        break;
      case scoreFunction.currentScore > 13:
        this.assessmentMessage = "Good Job!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
        break;
    }
    endRoundScreen.setAssessmentMessage(this.assessmentMessage);
    endRoundScreen.setAssessmentAudio(this.assessmentAudio);
  },
  writing() {
    switch (true) {
      case scoreFunction.currentScore <= 2:
        this.assessmentMessage = "Better Luck\r\nNext Time!";
        this.assessmentAudio =
          audio.feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
        break;
      case scoreFunction.currentScore > 31:
        this.assessmentMessage = "Outstanding!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
        break;
      case scoreFunction.currentScore > 27:
        this.assessmentMessage = "Amazing!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
        break;
      case scoreFunction.currentScore > 23:
        this.assessmentMessage = "Excellent!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
        break;
      case scoreFunction.currentScore > 18:
        this.assessmentMessage = "Great Job!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
        break;
      case scoreFunction.currentScore > 13:
        this.assessmentMessage = "Good Job!";
        this.assessmentAudio =
          audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
        break;
    }
    endRoundScreen.setAssessmentMessage(this.assessmentMessage);
    endRoundScreen.setAssessmentAudio(this.assessmentAudio);
  },
};

// setUser();
// function setUser() {
//   user.gradeLevel = sessionData.gradeLevel;
//   user.firstName = sessionData.firstName;
//   user.lastName = sessionData.lastName;
//   user.access = sessionData.access;
//   user.id = sessionData.userId;
// }

export { scoreFunction, scoreAssessment };
