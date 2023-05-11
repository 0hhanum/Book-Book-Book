import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { Peer } from "peerjs";
import { setStream, stopStream } from "../../components/RTCs/RTCutils";
import VideoComponent from "../../components/RTCs/VideoComponent";
import TypingAnimations from "../../components/Common/TypingAnimations";
import { sendMail } from "../../apis/mailApi";

const Container = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const VideoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const TextContainer = styled.div`
  width: 640px;
  height: 480px;
`;
const HotlineCall = () => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const [peerStream, setPeerStream] = useState<MediaStream>();
  const [peer, setPeer] = useState<Peer>();
  const initializePeer = (mediaStream: MediaStream | undefined) => {
    const peer = new Peer();
    setPeer(peer);
    peer.on("open", (id) => {
      if (process.env.ENVIRONMENT === "dev") {
        console.log(id);
        return;
      }
      sendMail({ subject: "new hotline request", message: id })
        .then((response) => {
          if (response.ok) {
            // TODO:: make alert component
          } else {
            throw Error("something went wrong");
          }
        })
        .catch((error) => {
          // TODO:: make alert component
          console.error("Error sending mail:", error);
        });
    });
    peer.on("connection", (connection) => {
      connection.on("data", (data) => {
        console.log(data);
      });
    });
    peer.on("call", (call) => {
      call.on("stream", (stream) => {
        setPeerStream(stream);
      });
      call.answer(mediaStream);
    });
  };

  useEffect(() => {
    if (!myStream) {
      setStream().then((mediaStream) => {
        setMyStream(mediaStream);
        initializePeer(mediaStream);
      });
    }
    return () => {
      if (myStream) {
        stopStream(myStream);
      }
      if (peerStream) {
        stopStream(peerStream);
      }
      peer?.destroy();
    };
  }, [myStream]);
  return (
    <Container>
      <VideoContainer>
        <VideoComponent isOwnVideo={true} stream={myStream} />
        {/* Show Admin Video Component when typing animation is done or admin connected */}
        {peerStream ? (
          <VideoComponent isOwnVideo={false} stream={peerStream} />
        ) : (
          <TextContainer>
            <TypingAnimations
              text={`Thanks for reaching out! I've received your request and I'm checking
          if I'm available right now. Just give me a moment, and I'll get back
          to you ASAP. If I'm not online, please leave your contacts by MAIL tab
          and I'll contact to you. Thanks!`}
            />
          </TextContainer>
        )}
      </VideoContainer>
    </Container>
  );
};

export default HotlineCall;
export const Head = () => <Helmet title="Hotline" />;
