import { matchingApp } from "../apps/matching/matching.js";
import { appStructure } from "./app-structure-object.js";
const startScreen = {
  createStartScreen() {
    this.startBtn = document.createElement("button");
    this.exitBtn = document.createElement("div");
    this.startBtn.setAttribute("id", "start-btn");
    this.startBtn.classList.add("letter-matching-app");
    this.startBtn.textContent = "Start";
    this.exitBtn.setAttribute("id", "exit-btn");
    this.exitBtn.classList.add("letter-matching-app", "hide");
    this.exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  },
  setStartScreen() {
    appStructure.setBtnContainer2(this.startBtn, this.exitBtn);
  },
  setStartEndAppBtnFunctions(startApp, endApp) {
    this.startBtn.addEventListener("pointerdown", startApp);
    this.exitBtn.addEventListener("pointerdown", endApp);
  },
  createAndSetStartScreen(startApp, EndApp) {
    console.log("a");

    this.createStartScreen();
    this.setStartEndAppBtnFunctions(startApp, EndApp);
    this.setStartScreen();
  },
  displayStartScreen() {
    console.log("b");
    if (
      this.startBtn.classList.contains("no-touch") ||
      this.startBtn.classList.contains("spinfade")
    ) {
      this.startBtn.classList.remove("no-touch");
      this.startBtn.classList.remove("spinfade");
      this.exitBtn.classList.remove("no-touch");
      this.exitBtn.classList.remove("hide2");
    }
    this.exitBtn.classList.remove("hide");
    score.resetScore();
  },
  removeStartScreen() {
    this.startBtn.classList.add("no-touch");
    this.startBtn.classList.add("spinfade");
    this.exitBtn.classList.remove("intro");
    this.exitBtn.classList.add("no-touch");
    this.exitBtn.classList.add("hide2");
    this.exitBtn.classList.remove("intro");
  },
};

export { startScreen };
