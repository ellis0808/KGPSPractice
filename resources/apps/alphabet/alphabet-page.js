import {
  body,
  menuContainer,
  mainContainer,
  topContainer,
} from "../../utilities/variables.js";
import { startAlphabetCardTouchApp } from "./alphabet-card-touch/alphabet-card-touch.js";
import { alphabetMatchingApp } from "./alphabet-matching/alphabet-matching-index.js";

function displayAbcMenu() {
  topContainer.innerText = "Alphabet";
}

export {};
