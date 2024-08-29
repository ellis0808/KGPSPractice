import {
  body,
  menuContainer,
  mainContainer,
} from "../../utilities/variables.js";

const numbersPage = (menuContainer.innerHTML = `<div
  class="div"
  id="counting"
  >
  Counting
  </div>
  <div class="div" id="card-touch">Card Touch</div>
  <div class="div" id="math-time">Math<br>Time</div>
  
  
  </div>`);
function setNumbersPageMenuVariables() {
  const div1 = document.getElementById("counting");
  const div2 = document.getElementById("card-touch");
  const div3 = document.getElementById("math-time");

  div1.addEventListener("click", () => {
    menuContainer.innerText = `Testing`;
  });
  div2.addEventListener("click", () => {
    menuContainer.innerText = `Testing`;
  });
  div3.addEventListener("click", () => {
    menuContainer.innerText = `Testing`;
  });
}

export { numbersPage, setNumbersPageMenuVariables };
