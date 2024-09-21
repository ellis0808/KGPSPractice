import { score } from "./score-object.js";

const user = {
  id: null,
  firstName: null, //does this make sense?
  lastName: null, //does this make sense?
  gradeLevel: null,
  access: null,
  cummulativeScore: score.userScore,
  currentScore: score.currentScore,
  currentLoginTime: null,
  totalLoginTime: null,
  awards: [],
};

export { user };
