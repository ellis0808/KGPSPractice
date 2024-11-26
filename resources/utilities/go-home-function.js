import { appStructure } from "./app-structure-object.js";
import { pauseFunction } from "./pause-functions.js";

const homeBtn = {
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
    this.homeBtn.addEventListener("pointerdown", this.homeBtnPause);
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
  homeBtnPause() {
    console.log(this.homeBtn);

    pauseFunction.pause();
    this.homeBtn.removeEventListener("pointerdown", this.displayContainer);
    setTimeout(() => {
      this.homeBtn.addEventListener("pointerdown", this.returnToApp);
    }, 200);
  },
  homeBtnUnpause() {
    pauseFunction.unpause();
    this.homeBtn.removeEventListener("pointerdown", this.returnToApp);
    setTimeout(() => {
      this.homeBtn.addEventListener("pointerdown", this.displayContainer);
    }, 200);
  },
  initializeEscapeKey() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!pauseFunction.isPaused) {
          this.homeBtnPause();
        } else {
          this.homeBtnUnpause();
        }
      }
    });
  },
  addClassesAndText() {},
  setBtnLink(endAppLink) {
    this.goHomeBtn.addEventListener("pointerdown", endAppLink);
    this.cancelBtn.addEventListener("pointerdown", this.returnToApp);
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

export { homeBtn };
