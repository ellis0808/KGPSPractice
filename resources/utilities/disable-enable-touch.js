function disableTouch(element) {
  const allTargets = document.querySelectorAll(`${element}`);
  allTargets.forEach((target) => {
    target.classList.add("no-touch");
  });
}
function enableTouch(element) {
  const allTargets = document.querySelectorAll(`${element}`);
  allTargets.forEach((target) => {
    target.classList.remove("no-touch");
  });
}

export { disableTouch, enableTouch };
