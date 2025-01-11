import { appContainer } from "./app-container-class.js";
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
    appContainer.setBtnContainer2(this.startBtn, this.exitBtn);
    this.exitBtn.classList.remove("hide");
    appContainer.showBtnContainer2();
  },
  setStartEndAppBtnFunctions() {
    this.startBtn.addEventListener("pointerdown", appContainer.startSession);
    this.exitBtn.addEventListener("pointerdown", appContainer.endApp);
  },
  initializeContainer() {
    this.createStartScreen();
    this.setStartEndAppBtnFunctions();
    this.setStartScreen();
    this.displayStartScreen();
  },
  displayStartScreen() {
    scoreFunction.resetCurrentScore();
  },
  removeStartScreen() {
    this.startBtn.classList.add("no-touch");
    this.startBtn.classList.add("spinfade");
    this.startBtn.classList.remove("intro");
    this.exitBtn.classList.add("no-touch");
    this.exitBtn.classList.add("hide2");
    this.exitBtn.classList.remove("intro");
  },
  displayStartScreen() {
    if (this.startBtn.classList.contains("spinfade")) {
      this.startBtn.classList.remove("hide");
      this.startBtn.classList.remove("spinfade");
      this.startBtn.classList.remove("no-touch");
      this.startBtn.classList.add("intro");
      this.exitBtn.classList.remove("no-touch");
      this.exitBtn.classList.remove("hide2");
      this.exitBtn.classList.add("intro");
    }
  },
};

export { startScreen };
