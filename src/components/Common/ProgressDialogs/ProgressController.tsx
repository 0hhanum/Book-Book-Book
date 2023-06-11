import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { progressDialogAtom } from "../../../atoms";
import { TProgress } from "../../../types/common";

interface IProgressController {
  type: TProgress;
}
// for Suspense callback
const ProgressController = ({ type }: IProgressController) => {
  const setProgressDialog = useSetRecoilState(progressDialogAtom);
  useEffect(() => {
    switch (type) {
      case "dot":
        setProgressDialog("dot");
        break;
      case "square":
        setProgressDialog("square");
        break;
    }
    return () => {
      setProgressDialog(null);
    };
  }, []);
  return null;
};

export default ProgressController;
