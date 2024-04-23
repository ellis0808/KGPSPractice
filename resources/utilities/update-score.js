import { score } from "./score-object.js";
import { scoreDisplay } from "../js/alphabet/alphabet-card-touch/alphabet-card-touch.js";
import {
  particles,
  particles2,
} from "../js/alphabet/alphabet-card-touch/FX.js";
import { newRoundCardFlip } from "../js/alphabet/alphabet-matching/fx.js";

const updatePositiveCount = (amount) => {
  const points = amount;
  const increment = 1;
  let initialValue = score.currentScore;
  let target = score.currentScore + points;

  const increaseCount = setInterval(() => {
    initialValue += increment;
    if (initialValue > target) {
      scoreDisplay.textContent = `${score.currentScore + points}`;
      clearInterval(increaseCount);
      return;
    }

    scoreDisplay.textContent = `${initialValue}`;
  }, 80);
  setTimeout(() => {
    score.increaseScore(amount);
  }, 600);
};
const updateNegativeCount = (amount) => {
  if (score.currentScore === 0) {
    amount = 0;
    return amount;
  }
  const points = amount;
  const increment = 1;
  let initialValue = score.currentScore;
  let target = score.currentScore - points;

  const decreaseCount = setInterval(() => {
    initialValue -= increment;
    if (initialValue < target) {
      scoreDisplay.textContent = `${score.currentScore - points}`;
      clearInterval(decreaseCount);
      return;
    }
    scoreDisplay.textContent = `${initialValue}`;
  }, 80);
  setTimeout(() => {
    score.decreaseScore(amount);
  }, 600);
};

export { updateNegativeCount, updatePositiveCount };
