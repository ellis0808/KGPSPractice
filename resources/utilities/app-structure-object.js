import { mainContainer } from "./variables.js";
const appStructure = {
  createMainAppStructure() {
    this.appContainer = document.createElement("div");
    this.grid = document.createElement("div");
    this.btnContainer1 = document.createElement("div");
    this.btnContainer2 = document.createElement("div");
    this.btnContainer4 = document.createElement("div");
    this.btnContainer5 = document.createElement("div");
    this.leftMenuContainer = document.createElement("div");
    this.appControlsContainer = document.createElement("div");
    this.appContainer.classList.add("container");
    this.grid.classList.add("grid");
    this.btnContainer1.classList.add("btn-container1");
    this.btnContainer2.classList.add("btn-container2");
    this.btnContainer4.classList.add("btn-container4");
    this.btnContainer5.classList.add("btn-container5");
    this.appControlsContainer.classList.add("home-btn-container", "hide");
    this.leftMenuContainer.classList.add("left-menu-container");
  },
  setMainAppStructure() {
    mainContainer.appendChild(this.appContainer);
    this.appContainer.appendChild(this.leftMenuContainer);
    this.appContainer.appendChild(this.btnContainer1);
    this.appContainer.appendChild(this.btnContainer2);
    this.appContainer.appendChild(this.btnContainer4);
    this.appContainer.appendChild(this.grid);
    this.appContainer.appendChild(this.appControlsContainer);
  },
  setBtnContainer1(item1, item2) {
    this.btnContainer1.appendChild(item1);
    this.btnContainer1.appendChild(item2);
  },
  setBtnContainer2(item1, item2) {
    this.btnContainer2.appendChild(item1);
    this.btnContainer2.appendChild(item2);
  },
  setBtnContainer3(item) {
    this.btnContainer3.appendChild(item);
  },
  setBtnContainer4(item) {
    this.btnContainer4.appendChild(item);
  },
  setBtnContainer5(item) {
    this.btnContainer5.appendChild(item);
    this.appContainer.appendChild(this.btnContainer5);
  },
  setAppControlsContainer(item1, item2) {
    this.appControlsContainer.appendChild(item1);
    this.appControlsContainer.appendChild(item2);
  },
  createAndSetAppStructureThenHideGrid() {
    this.createMainAppStructure();
    this.setMainAppStructure();
    this.gridHideAdd();
  },
  removeMainAppStructure() {
    delete this.appContainer;
    delete this.grid;
    delete this.btnContainer1;
    delete this.btnContainer2;
    delete this.btnContainer4;
    delete this.homeBtnContainer;
    delete this.leftMenuContainer;
  },
  gridHideAdd() {
    this.grid.classList.add("gridHide");
  },
  gridHideRemove() {
    this.grid.classList.remove("gridHide");
  },
  removeGrid() {
    this.grid.remove();
  },
};

export { appStructure };
