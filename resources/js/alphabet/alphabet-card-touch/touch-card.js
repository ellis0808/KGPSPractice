import { correctCard, currentCardID } from "./alphabet-card-touch.js";
import { correctCardID } from "./audio.js";
// import { correctCard } from "./alphabet-card-touch.js";
import { wobble } from "./FX.js";
import { score } from "../../../utilities/score-object.js";
import { updateCount } from "../../../utilities/update-score.js";
import { scoreDisplay } from "./alphabet-card-touch.js";

function touchCard(e) {
  console.log(typeof e);
  currentCardID = this.getAttribute("data-id");
  if (currentCardID == correctCardID) {
    correctCard(e);
    updateCount(e);
  } else {
    wobble(e);
    score.decreaseScore();
  }
}

export { touchCard };
