import { appStructure } from "./app-structure-object.js";
import { pauseFunction } from "./pause-functions.js";

const homeBtn = {
  createBtn() {
    this.homeBtn = document.createElement("button");
  },
  initialize() {
    this.createBtn();
    this.addClassesAndIcon();
    this.homeBtn.addEventListener("pointerdown", this.homeBtnPause);
    this.initializeEscapeKey();
  },
  addClassesAndIcon() {
    this.homeBtn.classList.add("home-btn");
    this.homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  },
  homeBtnPause() {
    pauseFunction.pause();
    this.homeBtn.removeEventListener("pointerdown", goHomeContainer.display);
    setTimeout(() => {
      this.homeBtn.addEventListener("pointerdown", goHomeContainer.returnToApp);
    }, 200);
  },
  homeBtnUnpause() {
    pauseFunction.unpause();
    this.homeBtn.removeEventListener(
      "pointerdown",
      goHomeContainer.returnToApp
    );
    setTimeout(() => {
      this.homeBtn.addEventListener("pointerdown", goHomeContainer.display);
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
};

const goHomeContainer = {
  createContainer() {
    this.goHomeContainer = document.createElement("div");
    this.goHomeMessage = document.createElement("div");
    this.goHomeBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
  },
  initializeContainer(link1) {
    this.createContainer();
    this.addClassesAndText();
    this.setBtnLink(link1);
  },
  addClassesAndText() {
    this.goHomeContainer.classList.add("go-home-container");
    this.goHomeMessage.classList.add("go-home-message");
    this.goHomeBtn.classList.add("go-home-btn");
    this.cancelBtn.classList.add("cancel-go-home-btn");
    this.goHomeMessage.textContent = "Go back to Menu?";
    this.goHomeBtn.textContent = "Yes";
    this.cancelBtn.textContent = "Cancel";
  },
  setBtnLink(endAppLink) {
    this.goHomeBtn.addEventListener("pointerdown", endAppLink);
    this.cancelBtn.addEventListener("pointerdown", this.returnToApp);
  },
  display() {
    console.log("test");
    console.log(this.goHomeContainer);

    appStructure.setBtnContainer4(this.goHomeContainer);
  },
  returnToApp() {
    this.goHomeContainer.remove();
  },
};

export { homeBtn, goHomeContainer };
