import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { Peer } from "peerjs";
import { setStream } from "../../components/RTCs/RTCutils";
import VideoComponent from "../../components/RTCs/VideoComponent";

const Container = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const VideoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const HotlineCall = () => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const [peerStream, setPeerStream] = useState<MediaStream>();
  const initializePeer = () => {
    const peer = new Peer("test");
    peer.on("connection", (connection) => {
      connection.on("data", (data) => {
        console.log(data);
      });
    });
    peer.on("call", (call) => {
      call.on("stream", (stream) => {
        setPeerStream(stream);
      });
      call.answer(myStream);
    });
  };

  useEffect(() => {
    if (myStream) {
      initializePeer();
    } else {
      setStream(setMyStream);
    }
  }, [myStream]);
  return (
    <Container>
      <VideoContainer>
        <VideoComponent isOwnVideo={true} stream={myStream} />
        <VideoComponent isOwnVideo={false} stream={peerStream} />
      </VideoContainer>
    </Container>
  );
};

export default HotlineCall;
export const Head = () => <Helmet title="Hotline" />;
