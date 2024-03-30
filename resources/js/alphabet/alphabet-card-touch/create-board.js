import { mainContainer } from "../../../utilities/variables.js";
import { alphabet, cardArray, cardText } from "./alphabet-card-touch.js";
import { touchCard } from "./touch-card.js";
let appScreen;
let newCardText;
function createBoard() {
  appScreen = `
      <div class="container">
      <div class="btn-container1">
      <button id="repeat-btn">Repeat</button>
      </div>
    
        <div id="grid">
      
        </div>
        
      </div>`;
  mainContainer.innerHTML = appScreen;
  //   getRepeatBtn();
  function letterGenerator() {
    let word = `${alphabet[Math.floor(Math.random() * alphabet.length)]}`;
    return word;
  }

  let i = 0;
  cardArray.forEach(() => {
    const card = document.createElement("word");
    card.setAttribute("txt", letterGenerator());
    newCardText = card.getAttribute("txt");
    card.textContent = newCardText;
    card.setAttribute("data-id", i);
    card.classList.add("card");
    grid.append(card);
    card.addEventListener("click", touchCard);
    cardText.push(newCardText);
    i++;
  });
}

export { createBoard };
