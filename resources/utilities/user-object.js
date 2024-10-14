import { score } from "./score-object.js";

class User {
  constructor() {
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.gradeLevel = null;
    this.access = null;
    this.cumulativeScore = 0;
    this.currentScore = score.currentScore;
    this.currentLoginTime = null;
    this.totalLoginTime = null;
    this.awards = [];
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
