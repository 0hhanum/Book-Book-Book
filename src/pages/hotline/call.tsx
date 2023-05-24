import React, { Suspense, lazy } from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { checkIsSSR } from "../../components/utils";

const Container = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CallComponent = lazy(
  () => import("../../components/RTCs/peerJS/CallComponent")
);
const HotlineCall = () => {
  const isSSR = checkIsSSR();
  return (
    <Container>
      {!isSSR && (
        <Suspense>
          {/* PeerJS only be executed in the browser environment */}
          <CallComponent />
        </Suspense>
      )}
    </Container>
  );
};

export default HotlineCall;
export const Head = () => <Helmet title="Hotline" />;
