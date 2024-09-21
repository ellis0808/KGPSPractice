import { sessionCheck, sessionData } from "../../login/session-check";
import {
  mainContainer,
  navBar,
  body,
  menuContainer,
  stylesheet,
} from "../../utilities/variables";
import { handwriting } from "../../utilities/handwriting.js";

const appContainer = document.createElement("div");
appContainer.classList.add("container", "writing-app");

const canvas = document.createElement("canvas");
canvas.classList.add("canvas");
const handwritingCanvas = new handwriting.Canvas(
  document.getElementById("canvas")
);

function writingApp(set) {
  // sessionCheck();
  setTimeout(() => {
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(canvas);
  }, 0);
  stylesheet.setAttribute(
    "href",
    "/KGPSEnglishPractice-test/resources/css/writing-lines.css"
  );
}
