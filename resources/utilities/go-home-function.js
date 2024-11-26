import { appStructure } from "./app-structure-object.js";

const homeBtn = {
  createBtn() {
    this.homeBtn = document.createElement("button");
  },
  setBtn() {
    appStructure.setBtnContainer4(this.homeBtn);
  },
  initializeBtn() {
    this.createBtn();
    this.setBtn();
    this.addClassesAndIcon();
    this.homeBtn.addEventListener("click", goHomeContainer.display);
    this.initializeEscapeKey();
  },
  addClassesAndIcon() {
    this.homeBtn.classList.add("home-btn");
    this.homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  },
  initializeEscapeKey() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (homeBtnIsGoHome) {
          goHomeContainer.display();
        } else {
          returnToApp();
        }
      }
    });
  },
};

const goHomeContainer = {
  createConatiner() {
    this.goHomeContainer = document.createElement("div");
    this.goHomeMessage = document.createElement("div");
    this.goHomeBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
  },
  initializeContainer(link1) {
    this.createConatiner();
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
  display() {},
  returnToApp() {
    this.goHomeContainer.remove();
  },
};

export { homeBtn, goHomeContainer };
