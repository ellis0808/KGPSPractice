import { sessionCheck } from "../login/session-check.js";
import { user } from "./user-object.js";

sessionCheck();
const score = {
  currentScore: 0,
  userScore: 0,
  highScore: 0,
  plusPoints: 5,
  minusPoints: 2,
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
  resetScore: function () {
    this.currentScore = 0;
  },
  updateUserScore: async function (id) {
    try {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/read_and_calculate_total_score.php?id=${id}`
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
  async updateStudentTotalScore(activityId, user) {
    //  For student users; teachers will differ on user type, etc
    const newScore = {
      activity_id: activityId,
      user_id: user.id,
      user_type: user.access,
      correct_answer_count: 0,
      incorrect_answer_count: 0,
      time_to_correct_answer_duration_in_seconds: 0,
      answer_attempts: 0,
      activity_score: score.currentScore,
    };
    try {
      const response = await fetch(
        "/KGPSEnglishPractice-test/api/add_user_activity_record.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newScore),
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
  finalScore: null,
  determineApp(set) {},
  matching() {
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
export { score, scoreAssessment };
