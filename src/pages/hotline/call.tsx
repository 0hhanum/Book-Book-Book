import React, { useEffect } from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { Peer } from "peerjs";

const Container = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const HotlineCall = () => {
  useEffect(() => {
    const peer = new Peer();
  }, []);
  return <Container></Container>;
};

export default HotlineCall;
export const Head = () => <Helmet title="Hotline" />;
