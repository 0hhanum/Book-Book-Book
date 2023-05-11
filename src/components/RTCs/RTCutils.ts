export const setStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: true,
    });
    return stream;
  } catch (error) {
    return;
  }
};

export const stopStream = (stream: MediaStream) => {
  if (!stream) return;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
};
