import axios from "axios";
import { useEffect, useState } from "react";
import RecorderControls from "../components/RecorderControls";
import useRecorder from "../hooks/useRecorder";
import { UseRecorder } from "../types/recorder";

// Helper function to convert a Web Audio API buffer to a Blob
function bufferToBlob(buffer: AudioBuffer) {
  const interleavedData = new Float32Array(buffer.length);
  buffer.copyFromChannel(interleavedData, 0);
  const data = interleavedData.buffer;
  return new Blob([data], { type: "audio/wav" });
}

// Helper function to send an audio Blob to the server
function sendAudioBlobToServer(audioBlob: Blob) {
  const formData = new FormData();
  formData.append("file", audioBlob);
  axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_IP}/upload`, formData)
    .then((res) => console.log(res.data));
}

export default function Recording() {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio, recordingSeconds, latestBlob } = recorderState;

  useEffect(() => {
    if (audio) {
      console.log(audio);

      // const audioUrl = URL.createObjectURL(audio);
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  }, [audio]);

  useEffect(() => {
    if (recordingSeconds % 5 === 0 && !!latestBlob) {
      sendAudioBlobToServer(latestBlob);
    }
  }, [recordingSeconds, latestBlob]);

  return (
    <div>
      <h1>Recording Page</h1>
      <RecorderControls recorderState={recorderState} handlers={handlers} />
    </div>
  );
}
