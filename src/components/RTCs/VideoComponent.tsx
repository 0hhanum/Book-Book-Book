import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface IVideo {
  stream: MediaStream;
  isOwnVideo: boolean;
}
const Container = styled.div``;
const Video = styled.video`
  border: ${(props) => `1px solid ${props.theme.fontColor}`};
`;
const VideoComponent = (props: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = props.stream;
  }, [videoRef]);
  return (
    <Container>
      <Video ref={videoRef} autoPlay playsInline muted={props.isOwnVideo} />
    </Container>
  );
};
export default VideoComponent;
