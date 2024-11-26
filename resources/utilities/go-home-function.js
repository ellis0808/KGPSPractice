import { appStructure } from "./app-structure-object.js";
import { pauseFunction } from "./pause-functions.js";

const homeBtnFunction = {
  homeBtn: document.createElement("button"),
  createStructure() {
    this.goHomeBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
    this.goHomeContainer = document.createElement("div");
    this.goHomeMessage = document.createElement("div");
  },
  initialize(link1) {
    this.createStructure();
    this.addClassesTextAndIcon();
    this.homeBtn.addEventListener(
      "pointerdown",
      this.homeBtnPauseUnpause.bind(this)
    );
    this.initializeEscapeKey();
    this.setBtnLink(link1);
    console.log(this.homeBtn);
  },
  addClassesTextAndIcon() {
    this.homeBtn.classList.add("home-btn");
    this.homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
    this.goHomeContainer.classList.add("go-home-container");
    this.goHomeMessage.classList.add("go-home-message");
    this.goHomeBtn.classList.add("go-home-btn");
    this.cancelBtn.classList.add("cancel-go-home-btn");
    this.goHomeMessage.textContent = "Go back to Menu?";
    this.goHomeBtn.textContent = "Yes";
    this.cancelBtn.textContent = "Cancel";
  },
  homeBtnPauseUnpause() {
    console.log(this.homeBtn);
    if (!pauseFunction.isPaused) {
      pauseFunction.pause();
      return;
    } else {
      pauseFunction.unpause();
    }
    this.homeBtn.removeEventListener(
      "pointerdown",
      this.homeBtnPauseUnpause.bind(this)
    );
    setTimeout(() => {
      this.homeBtn.addEventListener(
        "pointerdown",
        this.homeBtnPauseUnpause.bind(this)
      );
    }, 200);
  },
  initializeEscapeKey() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.homeBtnPauseUnpause();
      }
    });
  },
  setBtnLink(endAppLink) {
    this.goHomeBtn.addEventListener("pointerdown", endAppLink);
    this.cancelBtn.addEventListener("pointerdown", this.returnToApp.bind(this));
  },
  displayContainer() {
    console.log("test");
    console.log(this.goHomeContainer);

    appStructure.setBtnContainer4(this.goHomeContainer);
  },
  returnToApp() {
    this.goHomeContainer.remove();
  },
};

export { homeBtnFunction };
