import { scoreFunction } from "./score.js";

const scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("scoreFunction-display");
scoreDisplay.setAttribute("id", "scoreFunction-display");
scoreDisplay.textContent = `${scoreFunction.currentScore}`;

function toggleScoreDisplayHide() {
  scoreDisplay.classList.toggle("hide2");
}
const updatePositiveCount = (amount) => {
  const points = amount;
  const increment = 1;
  let initialValue = scoreFunction.currentScore;
  let target = scoreFunction.currentScore + points;

  const increaseCount = setInterval(() => {
    initialValue += increment;
    if (initialValue > target) {
      scoreDisplay.textContent = `${scoreFunction.currentScore + points}`;
      clearInterval(increaseCount);
      return;
    }

    scoreDisplay.textContent = `${initialValue}`;
  }, 80);
  setTimeout(() => {
    scoreFunction.increaseScore(amount);
  }, 600);
};
const updateNegativeCount = (amount) => {
  if (scoreFunction.currentScore === 0) {
    amount = 0;
    return amount;
  }
  const points = amount;
  const increment = 1;
  let initialValue = scoreFunction.currentScore;
  let target = scoreFunction.currentScore - points;

  const decreaseCount = setInterval(() => {
    initialValue -= increment;
    if (initialValue < target) {
      scoreDisplay.textContent = `${scoreFunction.currentScore - points}`;
      clearInterval(decreaseCount);
      return;
    }
    scoreDisplay.textContent = `${initialValue}`;
  }, 80);
  setTimeout(() => {
    scoreFunction.decreaseScore(amount);
  }, 600);
};

export {
  scoreDisplay,
  toggleScoreDisplayHide,
  updateNegativeCount,
  updatePositiveCount,
};
