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
  updateUserScore: async function (id) {
    try {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/read_and_calculate_total_score.php?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Network resposne was not okay");
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        this.userScore = data;
        console.log(this.userScore);

        return this.userScore;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    return this.userScore;
  },
};

export { score };
