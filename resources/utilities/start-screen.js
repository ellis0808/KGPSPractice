import { app } from "./app-class.js";
const startScreen = {
  startBtn: document.createElement("button"),
  exitBtn: document.createElement("div"),

  createStartScreen() {
    this.startBtn.setAttribute("id", "start-btn");
    this.startBtn.textContent = "Start";
    this.exitBtn.setAttribute("id", "exit-btn");
    this.exitBtn.classList.add("hide");
    this.exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  },
  setStartScreen() {
    console.log(app.btnContainer2);

    app.setBtnContainer2(this.startBtn, this.exitBtn);

    this.exitBtn.classList.remove("hide");
  },
  setStartEndAppBtnFunctions() {
    this.startBtn.addEventListener("pointerdown", app.startSession);
    this.exitBtn.addEventListener("pointerdown", app.endApp);
  },
  createAndSetStartScreen() {
    this.createStartScreen();
    this.setStartEndAppBtnFunctions();
    this.setStartScreen();
    console.log(document.getElementById("start-btn"));
    console.log(this.startBtn);
    console.log("finished creating and setting start screen");
  },
  displayStartScreen() {
    score.resetCurrentScore();
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
