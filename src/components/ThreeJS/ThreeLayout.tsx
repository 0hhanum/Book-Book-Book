import React from "react";
import ThreeCanvas from "./ThreeCanvas";

interface IThreeLayout {
  children: any;
}

const ThreeLayout = ({ children }: IThreeLayout) => {
  return <ThreeCanvas>{children}</ThreeCanvas>;
};

export default ThreeLayout;
