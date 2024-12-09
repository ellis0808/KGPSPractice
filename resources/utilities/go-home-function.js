import { app } from "./app-class.js";
import { pauseFunction } from "./pause-functions.js";

const homeBtnFunction = {
  goHomeContainerIsDisplayed: false,
  createStructure() {
    this.homeBtn = document.createElement("button");
    this.goHomeBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
    this.goHomeContainer = document.createElement("div");
    this.goHomeMessage = document.createElement("div");
  },
  initialize() {
    this.createStructure();
    this.addClassesTextAndIcon();
    this.homeBtn.addEventListener(
      "pointerdown",
      this.homeBtnPauseUnpause.bind(this)
    );
    this.initializeEscapeKey();
    this.setBtnLinks();
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
    if (!pauseFunction.isPaused && !this.goHomeContainerIsDisplayed) {
      pauseFunction.pause();
      this.displayContainer();
    } else if (pauseFunction.isPaused && !this.goHomeContainerIsDisplayed) {
      this.displayContainer();
    } else if (pauseFunction.isPaused) {
      pauseFunction.unpause();
      this.returnToApp();
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
        console.log("escape!");
        // this.homeBtnPauseUnpause();
        if (!pauseFunction.isPaused) {
          pauseFunction.pause();
          this.displayContainer();
        } else if (pauseFunction.isPaused) {
          this.returnToApp();
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
      }
    });
  },
  setBtnLinks() {
    this.goHomeBtn.addEventListener("pointerdown", app.endApp);
    this.cancelBtn.addEventListener("pointerdown", this.returnToApp.bind(this));
  },
  displayContainer() {
    this.goHomeContainerIsDisplayed = true;
    this.goHomeContainer.appendChild(this.goHomeMessage);
    this.goHomeContainer.appendChild(this.goHomeBtn);
    this.goHomeContainer.appendChild(this.cancelBtn);
    app.setBtnContainer4(this.goHomeContainer);
  },
  removeContainer() {
    if (document.querySelector(".go-home-container")) {
      document.querySelector(".go-home-container").remove();
      app.btnContainer4.classList.add("hide");
      this.goHomeContainerIsDisplayed = false;
    }
  },
  returnToApp() {
    this.removeContainer();
    pauseFunction.unpause();
  },
};

export { homeBtnFunction };
