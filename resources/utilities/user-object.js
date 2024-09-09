// import { checkSession } from "./check-session";
import { score } from "./score-object";

// checkSession();
const user = {
  fullname: lastName + firstName,
  firstName: String, //does this make sense?
  lastName: String, //does this make sense?
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
