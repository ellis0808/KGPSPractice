// import { checkSession } from "./check-session";
import { score } from "./score-object";

// checkSession();
const user = {
  id: null,
  firstName: null, //does this make sense?
  lastName: null, //does this make sense?
  grade: null,
  cummulativeScore: 0,
  currentScore: score.currentScore,
  currentLoginTime: null,
  totalLoginTime: null,
  awards: [],
  updateCummulativeScore: function () {
    this.cummulativeScore += score.userScore;
  },
};

export { user };
