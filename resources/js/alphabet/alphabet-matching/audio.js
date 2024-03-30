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
  // SpeechSynthesisVoice.name();
  console.log(SpeechSynthesis.getVoices);

  let letterToBeSpoken = new SpeechSynthesisUtterance(
    event.target.getAttribute("txt")
  );
  synth.speak(letterToBeSpoken);
}

export { audioContext, speak, stopAudio, finishedLoading };
