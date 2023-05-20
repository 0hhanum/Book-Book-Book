export const setStream = async () => {
  if (typeof navigator === "undefined") return;
  // This code executed only in the browser environment
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
