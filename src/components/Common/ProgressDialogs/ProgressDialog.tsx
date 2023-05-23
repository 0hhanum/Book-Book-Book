import React from "react";
import { useRecoilValue } from "recoil";
import { progressDialogAtom } from "../../../atoms";
import ProgressSquare from "./ProgressSquare";
import ProgressDot from "./ProgressDot";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ProgressDialog = () => {
  const progressDialog = useRecoilValue(progressDialogAtom);
  return (
    <Container>
      {progressDialog === "square" ? (
        <ProgressSquare />
      ) : progressDialog === "dot" ? (
        <ProgressDot />
      ) : null}
    </Container>
  );
};

export default ProgressDialog;
