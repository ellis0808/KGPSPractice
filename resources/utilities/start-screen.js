import { app } from "./app-class.js";
const startScreen = {
  startBtn: null,
  exitBtn: null,
  createStartScreen() {
    this.startBtn = document.createElement("button");
    this.exitBtn = document.createElement("div");
    this.startBtn.setAttribute("id", "start-btn");
    this.startBtn.classList.add("letter-matching-app");
    this.startBtn.textContent = "Start";
    this.exitBtn.setAttribute("id", "exit-btn");
    this.exitBtn.classList.add("hide");
    this.exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  },
  setStartScreen() {
    app.setBtnContainer2(app.btn, this.startBtn, this.exitBtn);
    this.exitBtn.classList.remove("hide");
  },
  setStartEndAppBtnFunctions(startApp, endApp) {
    this.startBtn.addEventListener("pointerdown", startApp);
    this.exitBtn.addEventListener("pointerdown", endApp);
  },
  createAndSetStartScreen(startApp, EndApp) {
    this.createStartScreen();
    this.setStartEndAppBtnFunctions(startApp, EndApp);
    this.setStartScreen();
  },
  displayStartScreen() {
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
