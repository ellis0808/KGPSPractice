// const timer = {
//   time: 0,
//   timeDisplay: null,
//   countUp: function (limit) {
//     this.countUp = setInterval(() => {
//       if (time < limit) {
//         ++this.fromZero;
//         if (time < 10) {
//           this.timeDisplay = `0:0${time}`;
//         } else if (time < limit) {
//           this.timeDisplay = `0:${time}`;
//         }
//         if (time > 60) {
//           this.timeDisplay = `1:00`;
//         }
//       }
//     });
//   },
// };

const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "1:00";

function toggleTimerHide() {
  timer.classList.toggle("hide2");
}

export { timer, toggleTimerHide };
