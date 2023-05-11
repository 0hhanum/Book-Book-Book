export const setStream = async (callback: (stream: MediaStream) => void) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
    },
    audio: true,
  });
  callback(stream);
};

export const stopStream = (stream: MediaStream) => {
  if (!stream) return;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
};
