import React from "react";
import { useRecoilValue } from "recoil";
import { progressDialogAtom } from "../../../atoms";
import ProgressCircle from "./ProgressCircle";
import ProgressDot from "./ProgressDot";

const ProgressDialog = () => {
  const progressDialog = useRecoilValue(progressDialogAtom);
  return (
    <>
      {progressDialog === "circle" ? (
        <ProgressCircle />
      ) : progressDialog === "dot" ? (
        <ProgressDot />
      ) : null}
    </>
  );
};

export default ProgressDialog;
