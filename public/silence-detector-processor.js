// silence-detector-processor.js
class SilenceDetectorProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.silenceLength = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const isSilent = input.every(channel => {
      return channel.every(sample => {
        return Math.abs(sample) < 0.01;
      });
    });
    if (isSilent) {
      this.silenceLength++;
      console.log("Silence detected");
    } else {
      this.silenceLength = 0;
      console.log("Audio detected");
    }
    if (this.silenceLength > 1000) {
      // pose all audio data to the main thread
      this.port.postMessage({ type: "audio", currentTime });
      this.silenceLength = 0;
    }
    return true;
  }
}


registerProcessor("silence-detector-processor", SilenceDetectorProcessor);
