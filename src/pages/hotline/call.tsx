import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { Peer } from "peerjs";
import { setStream } from "../../components/RTCs/RTCutils";
import VideoComponent from "../../components/RTCs/VideoComponent";
import TypingAnimations from "../../components/Common/TypingAnimations";

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
        <TypingAnimations
          text={`Thanks for reaching out! I've received your request and I'm checking
          if I'm available right now. Just give me a moment, and I'll get back
          to you ASAP. If I'm not online, please leave your contacts by MAIL tab
          and I'll contact to you. Thanks!`}
        />
      </VideoContainer>
    </Container>
  );
};

export default HotlineCall;
export const Head = () => <Helmet title="Hotline" />;
