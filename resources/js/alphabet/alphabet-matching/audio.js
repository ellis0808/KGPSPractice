// Audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let source = null;

function stopAudio() {
  source.stop();
}

function finishedLoading(bufferList) {
  source = audioContext.createBufferSource();
  source.buffer = bufferList[0];
  source.connect(audioContext.destination);
  source.start(0);
}

function speak(event) {
  const synth = window.speechSynthesis;
  let letterToBeSpoken;
  if (event.target) {
    letterToBeSpoken = new SpeechSynthesisUtterance(
      event.target.getAttribute("contentId")
    );
  } else {
    let dot = event;
    letterToBeSpoken = new SpeechSynthesisUtterance(dot);
  }
  synth.speak(letterToBeSpoken);
}

export { audioContext, speak, stopAudio, finishedLoading };
