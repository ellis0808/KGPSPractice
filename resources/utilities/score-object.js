const score = {
  currentScore: 0,
  highScore: 0,
  plusPoints: 5,
  minusPoints: 2,
  increaseScore: function (amount) {
    this.currentScore += amount;
  },
  decreaseScore: function (amount) {
    this.currentScore -= amount;
  },
  resetScore: function () {
    this.currentScore = 0;
  },
};

export { score };
