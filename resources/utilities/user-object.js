import { score } from "./score-object.js";

const user = {
  id: null,
  firstName: null, //does this make sense?
  lastName: null, //does this make sense?
  gradeLevel: null,
  access: null,
  cumulativeScore: 0,
  currentScore: score.currentScore,
  currentLoginTime: null,
  totalLoginTime: null,
  awards: [],
  getCummulativeScore: async function (id) {
    try {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/read_and_calculate_total_score.php?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Network resposne was not okay");
      }
      const data = await response.json();
      if (data) {
        this.cumulativeScore = data.total_score;
        console.log(this.cumulativeScore);

        return this.cumulativeScore;
      } else {
        console.log("failed!");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    return (this.cumulativeScore = 0);
  },
};

export { user };
