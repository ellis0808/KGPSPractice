const score = {
  currentScore: 0,
  userScore: 0,
  highScore: 0,
  plusPoints: 5,
  minusPoints: 2,
  increaseScore: function (amount) {
    this.currentScore += amount;
  },
  decreaseScore: function (amount) {
    if (this.currentScore > 0) {
      if (this.currentScore === 0) {
        amount = 0;
        return amount;
      }
      this.currentScore -= amount;
      return;
    }
  },
  resetScore: function () {
    this.currentScore = 0;
  },
  updateUserScore: function () {
    this.userScore += this.currentScore;
  },
};

export { score };
