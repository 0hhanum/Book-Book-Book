import React from "react";
import styled from "styled-components";

interface IVideo {
  stream: MediaStream;
  isOwn: boolean;
}
const Container = styled.div``;
const Video = styled.video``;
const VideoComponent = (props: IVideo) => {
  return (
    <Container>
      <Video />
    </Container>
  );
};
export default VideoComponent;
