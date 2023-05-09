import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProgressDot from "../Common/ProgressDialogs/ProgressDot";

interface IVideo {
  stream?: MediaStream;
  isOwnVideo: boolean;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 480px;
  position: relative;
  justify-content: center;
  align-items: center;
`;
const BtnContainer = styled.div`
  display: flex;
  bottom: 0;
  position: absolute;
`;
const Btn = styled.div<{ isActive: boolean }>`
  width: 110px;
  height: 50px;
  border-radius: 50%;
  border: ${(props) => `1px solid ${props.theme.fontColor}`};
  background-color: ${(props) =>
    props.isActive ? props.theme.headerColor : props.theme.backgroundColor};
  color: ${(props) =>
    props.isActive ? props.theme.backgroundColor : props.theme.fontColor};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    margin-right: 20px;
  }
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
`;
const VideoComponent = (props: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const toggleMute = () => {
    setIsMuted((current) => {
      props.stream?.getAudioTracks().forEach((track) => {
        track.enabled = current;
      });
      return !current;
    });
  };
  const toggleCamera = () => {
    setIsCameraOff((current) => {
      props.stream?.getVideoTracks().forEach((track) => {
        track.enabled = current;
      });
      return !current;
    });
  };
  useEffect(() => {
    if (!videoRef.current || !props.stream) return;
    videoRef.current.srcObject = props.stream;
  }, [videoRef, props.stream]);
  return (
    <Container>
      {props.stream ? (
        <>
          <Video ref={videoRef} autoPlay playsInline muted={props.isOwnVideo} />
          {props.isOwnVideo && (
            <BtnContainer>
              <Btn isActive={isMuted} onClick={toggleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </Btn>
              <Btn isActive={isCameraOff} onClick={toggleCamera}>
                {isCameraOff ? "Camera On" : "Camera Off"}
              </Btn>
            </BtnContainer>
          )}
        </>
      ) : (
        <ProgressDot />
      )}
    </Container>
  );
};
export default VideoComponent;
