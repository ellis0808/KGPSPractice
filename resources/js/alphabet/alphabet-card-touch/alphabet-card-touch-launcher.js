import { endCurrentApp } from "../../general/end-app.js";
import { alphabetCardTouchApp } from "./alphabet-card-touch.js";

function startAlphabetCardTouchApp() {
  alphabetCardTouchApp();
  endCurrentApp();
}

export { startAlphabetCardTouchApp };
