import {
  body,
  menuContainer,
  mainContainer,
  topContainer,
} from "../../utilities/variables.js";
import { startSpellingTouchApp } from "./alphabet-card-touch/spelling-touch-index.js";
import { startSpellingWritingApp } from "./alphabet-matching/spelling-writing-index.js";

function displaySpellingMenu() {
  topContainer.innerText = "Spelling";
}

export {};
