const body = document.body;
const navBar = document.getElementById("navbar");
navBar.classList.add("primary-menu");
const mainContainer = document.getElementById("main-container");
// const parentsInfo = document.getElementById("parents-info");
// parentsInfo.classList.add("primary-menu");
const primaryMenuContainer = document.getElementById("primary-menu-container");
primaryMenuContainer.classList.add("primary-menu");
const topContainer = document.getElementById("top-container");
topContainer.classList.add("primary-menu");
let stylesheet = document.getElementById("stylesheet");

export {
  body,
  navBar,
  // parentsInfo,
  mainContainer,
  primaryMenuContainer,
  stylesheet,
  topContainer,
};
