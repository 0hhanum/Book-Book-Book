import React, { useEffect, useRef, useState } from "react";
import { DataConnection, Peer } from "peerjs";
import styled from "styled-components";
import { setStream } from "../RTCutils";
import VideoComponent from "../VideoComponent";

// ROUGHLY MADE (Admin)

const Button = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  padding: 5px;
`;
const CloseCallBtn = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 40px;
  color: red;
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const AdminComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [peer, setPeer] = useState<Peer>();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [peerStream, setPeerStream] = useState<MediaStream>();
  const [dataConnection, setDataConnection] = useState<DataConnection>();
  /**
   * TODO:: URL 쿼리 이용해서 사용자 요청 통해서 들어왔을때 input에 peer ID 바로 들어가도록
   *        + hotline mailgun request에도 쿼리 추가
   */

  useEffect(() => {
    setStream().then((mediaStream) => {
      if (mediaStream === undefined) return;
      setMyStream(mediaStream);
      const peer = new Peer();
      setPeer(peer);
    });
  }, []);
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
      <div style={{ display: "flex" }}>
        {myStream && <VideoComponent isOwnVideo={true} stream={myStream} />}
        {peerStream && (
          <VideoComponent isOwnVideo={false} stream={peerStream} />
        )}
      </div>
    </div>
  );
};

export default AdminComponent;
