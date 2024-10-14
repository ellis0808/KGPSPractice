import { score } from "./score-object.js";

class User {
  constructor() {
    id = null;
    firstName = null;
    lastName = null;
    gradeLevel = null;
    access = null;
    cumulativeScore = 0;
    currentScore = score.currentScore;
    currentLoginTime = null;
    totalLoginTime = null;
    awards = [];
  }
  async getCumulativeScore(id) {
    try {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/read_and_calculate_total_score.php?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();

      if (data) {
        if (data.total_score === undefined) {
          this.cumulativeScore = 0;
        } else {
          this.cumulativeScore = data.total_score;
        }
        return this.cumulativeScore;
      } else {
        console.log("failed!");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }
}

const user = new User();

export { user };
