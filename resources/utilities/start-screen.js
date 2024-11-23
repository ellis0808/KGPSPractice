const startScreen = {
  createStartScreen() {
    this.startBtn = document.createElement("button");
    this.exitBtn = document.createElement("div");
    this.startBtn.setAttribute("id", "start-btn");
    this.startBtn.classList.add("letter-matching-app");
    this.startBtn.textContent = "Start";
    this.exitBtn.setAttribute("id", "exit-btn");
    this.exitBtn.classList.add("letter-matching-app", "hide");
    matchingAppStructure.exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
    this.exitBtn.addEventListener("click", matchingApp.endApp);
  },
  setStartScreen() {
    appStructure.btnContainer2.appendChild(this.startBtn);
    appStructure.btnContainer2.appendChild(this.exitBtn);
  },
  createAndSetStartScreen() {
    this.createStartScreen();
    this.setStartScreen();
  },
  displayStartScreen() {
    if (
      matchingAppStructure.startBtn.classList.contains("no-touch") ||
      matchingAppStructure.startBtn.classList.contains("spinfade")
    ) {
      matchingAppStructure.startBtn.classList.remove("no-touch");
      matchingAppStructure.startBtn.classList.remove("spinfade");
      matchingAppStructure.exitBtn.classList.remove("no-touch");
      matchingAppStructure.exitBtn.classList.remove("hide2");
    }
    matchingAppStructure.exitBtn.classList.remove("hide");
    matchingAppStructure.startBtn.addEventListener(
      "click",
      matchingAppSessions.startSession
    );
    score.resetScore();
  },
  removeStartScreen() {
    matchingAppStructure.startBtn.classList.add("no-touch");
    matchingAppStructure.startBtn.classList.add("spinfade");
    matchingAppStructure.exitBtn.classList.remove("intro");
    matchingAppStructure.exitBtn.classList.add("no-touch");
    matchingAppStructure.exitBtn.classList.add("hide2");
    matchingAppStructure.exitBtn.classList.remove("intro");
  },
};

export { startScreen };
