export const setStream = async (callback: (stream: MediaStream) => void) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
    },
    audio: true,
  });
  callback(stream);
};
