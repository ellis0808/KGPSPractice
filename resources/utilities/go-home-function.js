import { app } from "./app-class.js";
import { pauseFunction } from "./pause-functions.js";

class HomeBtnFunction {
  constructor() {
    this.goHomeContainerIsDisplayed = false;
    this.escapeKeyInitialized = false;
    this.homeBtn = document.createElement("button");
    this.goHomeBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
    this.goHomeContainer = document.createElement("div");
    this.goHomeMessage = document.createElement("div");
    this.homeBtnPauseUnpause = this.homeBtnPauseUnpause.bind(this);
  }

  createStructure() {
    this.homeBtn = document.createElement("button");
    this.goHomeBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
    this.goHomeContainer = document.createElement("div");
    this.goHomeMessage = document.createElement("div");
  }
  initialize() {
    // this.createStructure();
    this.addClassesTextAndIcon();
    this.homeBtn.addEventListener("pointerdown", this.homeBtnPauseUnpause);
    this.initializeEscapeKey();
    this.setBtnLinks();
  }
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
  }
  homeBtnPauseUnpause() {
    console.log(this.goHomeContainerIsDisplayed);
    if (!this.goHomeContainerIsDisplayed) {
      if (!pauseFunction.isPaused) {
        pauseFunction.pause();
        console.log("condition 2");
      }
      this.displayContainer();
      console.log("condition 1");
    } else if (this.goHomeContainerIsDisplayed && pauseFunction.isPaused) {
      console.log("condition 3");

      pauseFunction.unpause();
      this.returnToApp();
    }

    this.homeBtn.removeEventListener("pointerdown", this.homeBtnPauseUnpause);
    setTimeout(() => {
      this.homeBtn.addEventListener("pointerdown", this.homeBtnPauseUnpause);
    }, 200);
  }
  initializeEscapeKey() {
    if (this.escapeKeyInitialized) {
      return;
    }
    this.escapeKeyInitialized = true;
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        console.log("escape!");
        homeBtnFunction.homeBtnPauseUnpause();
      }
    });
  }
  setBtnLinks() {
    this.goHomeBtn.addEventListener("pointerdown", app.endApp);
    this.cancelBtn.addEventListener("pointerdown", this.returnToApp.bind(this));
  }
  displayContainer() {
    this.goHomeContainerIsDisplayed = true;
    if (app.btnContainer4.childNodes.length === 0) {
      this.goHomeContainer.appendChild(this.goHomeMessage);
      this.goHomeContainer.appendChild(this.goHomeBtn);
      this.goHomeContainer.appendChild(this.cancelBtn);
      app.setBtnContainer4(this.goHomeContainer);
    }

    if (app.btnContainer4.classList.contains("hide")) {
      app.showBtnContainer4();
    }
  }
  removeContainer() {
    if (this.goHomeContainer) {
      app.hideBtnContainer4();
      this.goHomeContainerIsDisplayed = false;
    }
  }
  returnToApp() {
    this.removeContainer();
    pauseFunction.unpause();
  }
}

const homeBtnFunction = new HomeBtnFunction();

export { homeBtnFunction };
