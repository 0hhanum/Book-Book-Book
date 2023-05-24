import React, { useEffect, useRef, useState } from "react";
import { DataConnection, Peer } from "peerjs";
import styled from "styled-components";
import { setStream } from "../RTCUtil";
import VideoComponent from "../VideoComponent";

// ROUGHLY MADE (Admin)

const Button = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  padding: 5px;
`;
const CloseCallBtn = styled(Button)`
  width: 100%;
  font-size: 40px;
  color: red;
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const VideoContainer = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    .video-container {
      width: 100%;
      height: 300px;
    }
  }
`;
const AdminComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [peer, setPeer] = useState<Peer>();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [peerStream, setPeerStream] = useState<MediaStream>();
  const [dataConnection, setDataConnection] = useState<DataConnection>();
  useEffect(() => {
    setStream().then((mediaStream) => {
      if (mediaStream === undefined) return;
      setMyStream(mediaStream);
      const peer = new Peer();
      setPeer(peer);
    });
  }, []);
  useEffect(() => {
    if (!inputRef.current) return;
    const queryParams = new URLSearchParams(location.search);
    const peerId = queryParams.get("peer");
    inputRef.current.value = peerId || "";
  }, [inputRef]);
  // PeerJS has traditional bugs (eventlistener doesn't work on MediaConnection)
  const endCall = () => {
    dataConnection?.close();
  };
  const connectPeer = () => {
    const peerDestId = inputRef.current?.value;
    if (peerDestId) {
      const connection = peer?.connect(peerDestId);
      connection?.on("open", () => {
        const call = peer?.call(peerDestId, myStream!);
        if (call) {
          call.on("stream", (stream) => {
            setPeerStream(stream);
          });
        }
      });
      if (connection) {
        setDataConnection(connection);
      }
    }
  };
  return (
    <div>
      <Input ref={inputRef} placeholder="peer id" />
      <Button onClick={connectPeer}>Connect</Button>
      <CloseCallBtn onClick={endCall}>
        END CALL - YOU SHOULD USE THIS
      </CloseCallBtn>
      <VideoContainer>
        <VideoComponent isOwnVideo={true} stream={myStream} />
        <VideoComponent isOwnVideo={false} stream={peerStream} />
      </VideoContainer>
    </div>
  );
};

export default AdminComponent;
