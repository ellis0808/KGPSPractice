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
        this.display.textContent = this.currentScore + points;
        clearInterval(increaseCount);
        return;
      }
      this.display.textContent = initialValue;
    }, 80);
    setTimeout(() => {
      this.increaseScore(amount);
    }, 600);
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
        `${BASE_PATH}api/read_and_calculate_total_score.php?id=${id}`
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
  // async updateStudentTotalScore(activityId, user) {
  //   //  For student users; teachers will differ on user type, etc
  //   const newScore = {
  //     activity_id: activityId,
  //     user_id: user.id,
  //     user_type: user.access,
  //     correct_answer_count: 0,
  //     incorrect_answer_count: 0,
  //     time_to_correct_answer_duration_in_seconds: 0,
  //     answer_attempts: 0,
  //     activity_score: scoreFunction.currentScore,
  //   };
  //   try {
  //     const response = await fetch(
  //       "/KGPSEnglishPractice-test/api/add_user_activity_record.php",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(newScore),
  //       }
  //     );
  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error("Network response was not okay");
  //     }
  //   } catch (error) {
  //     console.error("Error adding record:", error);
  //   }
  // },
};

const scoreAssessment = {
  assessmentMessage: null,
  assessmentAudio: null,
  finalScore: null,
  determineApp(set) {},
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
