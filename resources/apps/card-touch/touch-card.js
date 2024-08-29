import { correctCard, currentCardID } from "./card-touch.js";
import { correctCardID } from "./audio.js";
import { wobble } from "./FX.js";
import { score } from "../../utilities/score-object.js";

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
