import { score } from "./score-object.js";

let totalScore;

const user = {
  id: null,
  firstName: null, //does this make sense?
  lastName: null, //does this make sense?
  gradeLevel: null,
  access: null,
  cummulativeScore: totalScore,
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
        totalScore = data.total_score;

        return totalScore;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    return totalScore;
  },
};

export { user };
