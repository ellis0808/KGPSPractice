// getRepeatBtn();
function clearBoard(repeatBtn) {
  setTimeout(newRoundCardFlip, 1000);
  const container = document.querySelector(".container");
  // remove all cards including grid, then regenerate grid
  console.log(repeatBtn);
  //   repeatBtn.classList.add("hide2");
  setTimeout(function (e) {
    startBtn.classList.toggle("hide");
    startBtn.preventDefault;
    startBtn.classList.remove("wobble");
    void startBtn.offsetWidth;
    startBtn.classList.add("wobble");
  }, 1500);
  setTimeout(function (e) {
    grid.classList.toggle("hide");
  }, 1500);
  setTimeout(function (e) {
    grid.remove(e);
    grid = document.createElement("div");
    container.append(grid);
    grid.setAttribute("id", "grid");
  }, 2000);

  let cardText = [];
  newCardText;
}

export { clearBoard };
