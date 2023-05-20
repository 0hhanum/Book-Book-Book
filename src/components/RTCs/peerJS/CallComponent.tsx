import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setStream, stopStream } from "../RTCUtils";
import VideoComponent from "../VideoComponent";
import TypingAnimations from "../../Common/TypingAnimations";
import { sendMail } from "../../../apis/mailApi";
import { Peer } from "peerjs";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const TextContainer = styled.div`
  width: 640px;
  height: 480px;
`;
const CallComponent = () => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const [peerStream, setPeerStream] = useState<MediaStream>();
  const [isCallEnded, setIsCallEnded] = useState(false);
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
      setTimeout(() => {
        connection.on("close", () => {
          // PeerJS has traditional bugs (eventlistener doesn't work on MediaConnection)
          setPeerStream(undefined);
          setIsCallEnded(true);
        });
      }, 1000);
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
      <VideoComponent isOwnVideo={true} stream={myStream} />
      {/* Show Admin Video Component when typing animation is done or admin connected */}
      {peerStream ? (
        <VideoComponent isOwnVideo={false} stream={peerStream} />
      ) : (
        <TextContainer>
          {isCallEnded ? (
            <TypingAnimations
              text={`It was a truly meaningful time. Thank you for your conversation. Have a fantastic day ahead!`}
            />
          ) : (
            <TypingAnimations
              text={`Thanks for reaching out! I've received your request and I'm checking
          if I'm available right now. Just give me a moment, and I'll get back
          to you ASAP. If I'm not available, please leave your contacts by MAIL tab
          and I'll contact to you. Thanks!`}
            />
          )}
        </TextContainer>
      )}
    </Container>
  );
};

export default CallComponent;
