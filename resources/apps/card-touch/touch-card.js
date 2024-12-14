import { correctCard, currentCardID } from "./card-touch.js";
import { correctCardID } from "./audio.js";
import { wobble } from "./fx.js";
import { scoreFunction } from "../../utilities/scoreFunction-object.js";

function touchCard(e) {
  currentCardID = this.getAttribute("data-id");
  if (currentCardID == correctCardID) {
    correctCard(e);
    updateCount(e);
  } else {
    wobble(e);
    scoreFunction.decreaseScore();
  }
}

export { touchCard };
