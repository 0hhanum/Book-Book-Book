import React, { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import styled from "styled-components";
import { setStream } from "../../components/RTCs/RTCutils";
import VideoComponent from "../../components/RTCs/VideoComponent";

const Button = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  padding: 5px;
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const Admin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [peer, setPeer] = useState<Peer>();
  const [myStream, setMyStream] = useState<MediaStream>();
  useEffect(() => {
    setStream(setMyStream);
    const peer = new Peer();
    setPeer(peer);
  }, []);
  const connect = () => {
    const peerDestId = inputRef.current?.value;
    if (peerDestId) {
      peer?.connect(peerDestId);
    }
  };
  return (
    <div>
      <Input ref={inputRef} placeholder="peer id" />
      <Button onClick={connect}>Connect</Button>
      <div>
        {myStream && <VideoComponent isOwnVideo={true} stream={myStream} />}
      </div>
    </div>
  );
};

export default Admin;
